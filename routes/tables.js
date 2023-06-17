const tables = [
  'Customer',
  'Orders',
  'Lineitem',
  'Part',
];

module.exports = function (route) {
  route.get("/tables", function (ctx) {
    ctx.body = tables;
  });
};
