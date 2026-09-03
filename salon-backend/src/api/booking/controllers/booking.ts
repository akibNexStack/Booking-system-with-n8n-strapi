import { factories } from '@strapi/strapi';

const BOOKING_STATUSES = ['pending', 'confirmed', 'cancelled'] as const;
type BookingStatus = (typeof BOOKING_STATUSES)[number];

function getRoleType(user: any): string {
  return String(user?.role?.type ?? user?.role?.name ?? 'authenticated').toLowerCase();
}

export default factories.createCoreController(
  'api::booking.booking',
  ({ strapi }) => ({
    async create(ctx) {
      const user = ctx.state.user;
      const controller = this as any;

      // Bookings always belong to an authenticated customer. The public role
      // can browse services/staff, but cannot create an appointment.
      if (!user) {
        return ctx.unauthorized('You must be signed in to create a booking.');
      }

      if (['staff', 'manager', 'admin'].includes(getRoleType(user))) {
        return ctx.forbidden('This account cannot create customer bookings.');
      }

      const input = (await controller.sanitizeInput(
        ctx.request.body?.data ?? {},
        ctx
      )) as Record<string, any>;

      if (!input.phone || !input.date || !input.time || !input.service || !input.staff) {
        return ctx.badRequest('Phone, date, time, service, and staff are required.');
      }

      // Never trust ownership, email/name, or status from the browser.
      // This prevents a customer from creating a confirmed booking directly.
      const existingBooking = await strapi.documents('api::booking.booking').findFirst({
        filters: {
          staff: { documentId: { $eq: input.staff } },
          date: { $eq: input.date },
          time: { $eq: input.time },
          status: { $in: ['pending', 'confirmed'] },
        },
      });

      if (existingBooking) {
        return ctx.conflict('That stylist is no longer available at the selected time.');
      }

      const booking = await strapi.documents('api::booking.booking').create({
        data: {
          customerName: user.username ?? user.email,
          email: user.email,
          phone: input.phone,
          date: input.date,
          time: input.time,
          service: input.service,
          staff: input.staff,
          user: user.id,
          status: 'pending',
        } as any,
        populate: { service: true, staff: true },
      });

      ctx.status = 201;
      return { data: await controller.sanitizeOutput(booking, ctx), meta: {} };
    },

    async find(ctx) {
      const user = ctx.state.user;
      const controller = this as any;

      if (!user) {
        return ctx.unauthorized('You must be signed in to view bookings.');
      }

      const role = getRoleType(user);
      let filters: Record<string, any> = { user: { id: { $eq: user.id } } };

      if (['admin', 'manager'].includes(role)) {
        filters = {};
      } else if (role === 'staff') {
        const staffProfile = await strapi.documents('api::staff.staff').findFirst({
          filters: { user: { id: { $eq: user.id } } },
        });
        if (!staffProfile) return { data: [], meta: {} };
        filters = { staff: { documentId: { $eq: staffProfile.documentId } } };
      }

      const bookings = await strapi.documents('api::booking.booking').findMany({
        filters,
        populate: { service: true, staff: true },
        sort: ['date:asc', 'time:asc'],
      });

      return { data: await controller.sanitizeOutput(bookings, ctx), meta: {} };
    },

    async access(ctx) {
      const user = ctx.state.user;
      if (!user) return ctx.unauthorized('You must be signed in.');

      const account = await strapi.db
        .query('plugin::users-permissions.user')
        .findOne({ where: { id: user.id }, populate: { role: true } });

      if (!account) return ctx.unauthorized('Your account could not be found.');

      return {
        data: {
          id: account.id,
          username: account.username,
          email: account.email,
          role: account.role
            ? { type: account.role.type, name: account.role.name }
            : undefined,
        },
      };
    },

    async update(ctx) {
      const user = ctx.state.user;
      const controller = this as any;
      const documentId = ctx.params.id;

      // Browser users authenticate as a Strapi user. Status changes are only
      // made by the existing n8n API-token request after a Slack decision.
      if (user) {
        return ctx.forbidden('Booking status is updated by the salon approval workflow.');
      }

      const input = ctx.request.body?.data ?? {};
      const status = input.status as BookingStatus | undefined;
      if (!status || !['confirmed', 'cancelled'].includes(status) || Object.keys(input).some((key) => key !== 'status')) {
        return ctx.forbidden('Only a confirmed or cancelled booking status can be updated by this endpoint.');
      }

      const booking = await strapi.documents('api::booking.booking').findOne({
        documentId,
      });

      if (!booking) return ctx.notFound('Booking not found.');
      if (booking.status !== 'pending') {
        return ctx.conflict('This booking has already received an approval decision.');
      }

      const updatedBooking = await strapi.documents('api::booking.booking').update({
        documentId,
        data: { status } as any,
        populate: { service: true, staff: true },
      });

      return { data: await controller.sanitizeOutput(updatedBooking, ctx), meta: {} };
    },
  })
);
