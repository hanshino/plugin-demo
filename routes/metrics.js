const metrics = [
  {
    name: "Revenue",
    baseModel: "Orders",
    dimension: [
      {
        name: "custkey",
        type: "integer",
      },
    ],
    measure: [
      {
        name: "totalprice",
        type: "integer",
        expression: "sum(totalprice)",
      },
    ],
    timeGrain: [
      {
        name: "orderdate",
        refColumn: "orderdate",
        dateParts: ["YEAR", "MONTH"],
      },
    ],
  },
];

module.exports = function (route) {
  route.get("/metrics", function (ctx) {
    ctx.body = metrics.map((metric) => metric.name);
  });

  route.get("/metrics/:metricName", function (ctx) {
    const { metricName } = ctx.params;
    const metric = metrics.find((m) => m.name === metricName);

    if (!metric) {
      ctx.body = {
        error: `Metric ${metricName} not found`,
      };
      return;
    }

    ctx.body = metric;
  });
};
