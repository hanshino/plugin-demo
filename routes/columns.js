const tables = [
  {
    name: "Orders",
    refSql: 'select * from "canner-cml".tpch_tiny.orders',
    columns: [
      {
        name: "orderkey",
        expression: "o_orderkey",
        type: "integer",
      },
      {
        name: "custkey",
        expression: "o_custkey",
        type: "integer",
      },
      {
        name: "orderstatus",
        expression: "o_orderstatus",
        type: "OrderStatus",
      },
      {
        name: "totalprice",
        expression: "o_totalprice",
        type: "float",
      },
      {
        name: "customer",
        type: "Customer",
        relationship: "OrdersCustomer",
      },
      {
        name: "orderdate",
        expression: "o_orderdate",
        type: "date",
      },
      {
        name: "lineitem",
        type: "Lineitem",
        relationship: "OrdersLineitem",
      },
    ],
    primaryKey: "orderkey",
  },
  {
    name: "Customer",
    refSql: 'select * from "canner-cml".tpch_tiny.customer',
    columns: [
      {
        name: "custkey",
        expression: "c_custkey",
        type: "integer",
      },
      {
        name: "name",
        expression: "c_name",
        type: "string",
      },
      {
        name: "orders",
        type: "Orders",
        relationship: "OrdersCustomer",
      },
    ],
    primaryKey: "custkey",
  },
  {
    name: "Lineitem",
    refSql: 'select * from "canner-cml".tpch_tiny.lineitem',
    columns: [
      {
        name: "orderkey",
        expression: "l_orderkey",
        type: "integer",
      },
      {
        name: "partkey",
        expression: "l_partkey",
        type: "integer",
      },
      {
        name: "linenumber",
        expression: "l_linenumber",
        type: "integer",
      },
      {
        name: "extendedprice",
        expression: "l_extendedprice",
        type: "double",
      },
      {
        name: "discount",
        expression: "l_discount",
        type: "double",
      },
      {
        name: "shipdate",
        expression: "l_shipdate",
        type: "date",
      },
      {
        name: "orders",
        type: "Orders",
        relationship: "OrdersLineitem",
      },
      {
        name: "part",
        type: "Part",
        relationship: "LineitemPart",
      },
      {
        name: "orderkey_linenumber",
        type: "string",
        expression: "concat(l_orderkey, l_linenumber)",
      },
    ],
    primaryKey: "orderkey_linenumber",
  },
  {
    name: "Part",
    refSql: 'select * from "canner-cml".tpch_tiny.part',
    columns: [
      {
        name: "partkey",
        expression: "p_partkey",
        type: "integer",
      },
      {
        name: "name",
        expression: "p_name",
        type: "string",
      },
    ],
    primaryKey: "partkey",
  },
];

module.exports = function (route) {
  route.get("/tables/:tableName", function (ctx) {
    const { tableName } = ctx.params;
    const table = tables.find((table) => table.name === tableName);

    if (!table) {
      ctx.throw(404, `Table ${tableName} not found`);
      return;
    }

    ctx.body = table;
  });
};
