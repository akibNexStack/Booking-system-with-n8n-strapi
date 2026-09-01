import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::booking.booking',
  ({ strapi }) => ({
    async create(ctx) {
      const user = ctx.state.user;
      const controller = this as any;
      const input = (await controller.sanitizeInput(
        ctx.request.body?.data ?? {},
        ctx
      )) as Record<string, any>;
      const status = input.status ?? 'pending';

      if (
        typeof status !== 'string' ||
        !['pending', 'confirmed', 'cancelled'].includes(status)
      ) {
        return ctx.badRequest('Status must be pending, confirmed, or cancelled.');
      }

      input.status = status;

      if (user) {
        input.user = user.id;
        input.customerName ||= user.username;
        input.email ||= user.email;
      }

      const booking = await strapi.documents('api::booking.booking').create({
        data: input as any,
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

      const bookings = await strapi.documents('api::booking.booking').findMany({
        filters: { user: { id: { $eq: user.id } } },
        populate: { service: true, staff: true },
        sort: ['date:asc', 'time:asc'],
      });

      return { data: await controller.sanitizeOutput(bookings, ctx), meta: {} };
    },
  })
);
