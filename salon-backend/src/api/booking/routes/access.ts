export default {
  routes: [
    {
      method: 'GET',
      path: '/bookings/access',
      handler: 'booking.access',
      config: {
        auth: {},
      },
    },
  ],
};
