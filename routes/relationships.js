const relationships = [
  {
    name: "OrdersCustomer",
    models: ["Orders", "Customer"],
    joinType: "MANY_TO_ONE",
    condition: "Orders.custkey = Customer.custkey",
  },
  {
    name: "OrdersLineitem",
    models: ["Orders", "Lineitem"],
    joinType: "ONE_TO_MANY",
    condition: "Orders.orderkey = Lineitem.orderkey",
  },
  {
    name: "LineitemPart",
    models: ["Lineitem", "Part"],
    joinType: "MANY_TO_ONE",
    condition: "Lineitem.partkey = Part.partkey",
  },
];

module.exports = function (route) {
  route.get('/relationships/:relationshipName', function (ctx) {
    const { relationshipName } = ctx.params;
    const relation = relationships.find(r => r.name === relationshipName);

    if (!relation) {
      ctx.body = {
        error: `Relationship ${relationshipName} not found`
      };
      return;
    }

    ctx.body = relation;
  });
}