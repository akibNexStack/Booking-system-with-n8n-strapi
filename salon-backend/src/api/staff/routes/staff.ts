export default {
  routes: [
    {
      method: 'GET',
      path: '/staff',
      handler: 'staff.find',
    },
    {
      method: 'GET',
      path: '/staff/:id',
      handler: 'staff.findOne',
    },
  ],
};
