import type { Core } from '@strapi/strapi';

const services = [
  {
    name: 'Classic Haircut',
    description: 'Consultation, precision haircut, and finish.',
    price: 35,
    duration: 45,
  },
  {
    name: 'Hair Color',
    description: 'Custom all-over color with shampoo and styling.',
    price: 85,
    duration: 120,
  },
  {
    name: 'Manicure',
    description: 'Nail shaping, cuticle care, and polish.',
    price: 30,
    duration: 40,
  },
];

const staffMembers = [
  {
    name: 'Maya Ahmed',
    specialty: 'Haircuts & Styling',
    bio: 'Maya creates modern, wearable cuts tailored to each client.',
  },
  {
    name: 'Noah Rahman',
    specialty: 'Color Specialist',
    bio: 'Noah specializes in dimensional color and natural-looking transformations.',
  },
  {
    name: 'Sofia Khan',
    specialty: 'Nail Care',
    bio: 'Sofia focuses on meticulous nail care and clean, lasting finishes.',
  },
];

async function seedByName(
  strapi: Core.Strapi,
  uid: 'api::service.service' | 'api::staff.staff',
  entries: Array<Record<string, unknown> & { name: string }>
) {
  for (const entry of entries) {
    const existing = await strapi.documents(uid).findFirst({
      filters: { name: entry.name },
    });

    if (!existing) {
      await strapi.documents(uid).create({ data: entry });
    }
  }
}

async function configurePublicPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) {
    strapi.log.warn('Public role was not found; API permissions were not configured.');
    return;
  }

  const managedActionPrefixes = [
    'api::service.service.',
    'api::staff.staff.',
    'api::booking.booking.',
  ];
  const allowedActions = new Set([
    'api::service.service.find',
    'api::service.service.findOne',
    'api::staff.staff.find',
    'api::staff.staff.findOne',
  ]);

  const existingPermissions = await strapi.db
    .query('plugin::users-permissions.permission')
    .findMany({ where: { role: publicRole.id } });

  for (const permission of existingPermissions) {
    const isManaged = managedActionPrefixes.some((prefix) =>
      permission.action.startsWith(prefix)
    );

    if (isManaged && !allowedActions.has(permission.action)) {
      await strapi.db
        .query('plugin::users-permissions.permission')
        .delete({ where: { id: permission.id } });
    }
  }

  const currentActions = new Set(
    existingPermissions.map((permission) => permission.action)
  );

  for (const action of allowedActions) {
    if (!currentActions.has(action)) {
      await strapi.db.query('plugin::users-permissions.permission').create({
        data: { action, role: publicRole.id },
      });
    }
  }
}

async function configureAuthenticatedPermissions(strapi: Core.Strapi) {
  const authenticatedRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'authenticated' } });

  if (!authenticatedRole) {
    strapi.log.warn('Authenticated role was not found; booking permissions were not configured.');
    return;
  }

  const allowedActions = [
    'api::booking.booking.find',
    'api::booking.booking.create',
    'api::booking.booking.access',
    'api::service.service.find',
    'api::service.service.findOne',
    'api::staff.staff.find',
    'api::staff.staff.findOne',
    'plugin::users-permissions.user.me',
  ];
  const existingPermissions = await strapi.db
    .query('plugin::users-permissions.permission')
    .findMany({ where: { role: authenticatedRole.id } });
  const currentActions = new Set(
    existingPermissions.map((permission) => permission.action)
  );

  for (const permission of existingPermissions) {
    if (
      permission.action.startsWith('api::booking.booking.') &&
      !allowedActions.includes(permission.action)
    ) {
      await strapi.db
        .query('plugin::users-permissions.permission')
        .delete({ where: { id: permission.id } });
    }
  }

  for (const action of allowedActions) {
    if (!currentActions.has(action)) {
      await strapi.db.query('plugin::users-permissions.permission').create({
        data: { action, role: authenticatedRole.id },
      });
    }
  }
}

async function ensureBookingRoles(strapi: Core.Strapi) {
  const roleDefinitions = [
    { name: 'Staff', description: 'View appointments assigned to this staff member.', type: 'staff' },
    { name: 'Manager', description: 'View all salon bookings.', type: 'manager' },
    { name: 'Admin', description: 'View all salon bookings and administer the application.', type: 'admin' },
  ];

  for (const role of roleDefinitions) {
    const exists = await strapi.db
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: role.type } });
    if (!exists) {
      await strapi.db.query('plugin::users-permissions.role').create({ data: role });
    }
  }
}

async function configureTeamRolePermissions(strapi: Core.Strapi) {
  const actions = [
    'api::booking.booking.find',
    'api::booking.booking.access',
    'api::service.service.find',
    'api::service.service.findOne',
    'api::staff.staff.find',
    'api::staff.staff.findOne',
    'plugin::users-permissions.user.me',
  ];

  for (const type of ['staff', 'manager', 'admin']) {
    const role = await strapi.db
      .query('plugin::users-permissions.role')
      .findOne({ where: { type } });
    if (!role) continue;

    const permissions = await strapi.db
      .query('plugin::users-permissions.permission')
      .findMany({ where: { role: role.id } });
    const currentActions = new Set(permissions.map((permission) => permission.action));

    for (const action of actions) {
      if (!currentActions.has(action)) {
        await strapi.db.query('plugin::users-permissions.permission').create({
          data: { action, role: role.id },
        });
      }
    }
  }
}

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register() {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Keep one concise, server-side trace for booking webhooks. It makes an
    // n8n delivery failure visible in the Strapi terminal instead of silently
    // looking like a successful booking in the frontend.
    const webhookRunner = strapi.get('webhookRunner') as any;
    const runWebhook = webhookRunner.run.bind(webhookRunner);
    webhookRunner.run = async (webhook: any, event: string, info: any) => {
      const result = await runWebhook(webhook, event, info);

      if (event === 'entry.create' && info?.uid === 'api::booking.booking') {
        strapi.log.info(
          `Booking webhook delivery to ${webhook.url}: HTTP ${result.statusCode}`
        );
      }

      return result;
    };

    await seedByName(strapi, 'api::service.service', services);
    await seedByName(strapi, 'api::staff.staff', staffMembers);
    await ensureBookingRoles(strapi);
    await configurePublicPermissions(strapi);
    await configureAuthenticatedPermissions(strapi);
    await configureTeamRolePermissions(strapi);
  },
};
