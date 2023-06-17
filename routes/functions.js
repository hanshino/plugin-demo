const functions = [
  {
    name: "array_avg",
    parameters: [
      {
        name: "array",
        type: "array",
      },
    ],
    example: [
      "select Customer.name, array_avg(transform(Customer.orders, o -> o.totalprice)) from Customer;",
    ],
    description:
      "Returns the average (arithmetic mean) of all non-NULL values in the array.",
  },
  {
    name: "array_sum",
    parameters: [
      {
        name: "array",
        type: "array",
      },
    ],
    example: [
      "select Customer.name, array_sum(transform(Customer.orders, o -> o.totalprice)) from Customer;",
    ],
    description: "Returns the sum of all non-NULL values in the array.",
  },
  {
    name: "array_max",
    parameters: [
      {
        name: "array",
        type: "array",
      },
    ],
    example: [
      "select Customer.name, array_max(transform(Customer.orders, o -> o.totalprice)) from Customer;",
    ],
    description: "Returns the maximum value in the array.",
  },
  {
    name: "array_min",
    parameters: [
      {
        name: "array",
        type: "array",
      },
    ],
    example: [
      "select Customer.name, array_min(transform(Customer.orders, o -> o.totalprice)) from Customer;",
    ],
    description: "Returns the minimum value in the array.",
  },
  {
    name: "array_sort",
    parameters: [
      {
        name: "array",
        type: "array",
      },
      {
        name: "order",
        type: "string",
      },
    ],
    example: [
      "select Customer.name, array_sort(transform(Customer.orders, o -> o.totalprice), 'asc') from Customer;",
      "select Customer.name, array_sort(Customer.orders, 'desc') from Customer;",
    ],
    description:
      'Sorts the elements in the array in the specified order ("asc" for ascending, "desc" for descending).',
  },
  {
    name: "array_count",
    parameters: [
      {
        name: "array",
        type: "array",
      },
    ],
    example: [
      "select Customer.name, array_count(Customer.orders) from Customer;",
    ],
    description: "Returns the number of elements in the array.",
  },
  {
    name: "array_every",
    parameters: [
      {
        name: "array",
        type: "array",
      },
      {
        name: "condition",
        type: "boolean",
      },
    ],
    example: [
      'select Customer.name, array_every(Customer.orders, order -> order.status = "f") from Customer;',
    ],
    description:
      "Checks if every element in the array satisfies the specified condition.",
  },
  {
    name: "array_bool_or",
    parameters: [
      {
        name: "array",
        type: "array",
      },
      {
        name: "condition",
        type: "boolean",
      },
    ],
    example: [
      'select Customer.name, array_bool_or(Customer.orders, order -> order.status = "f") from Customer;',
    ],
    description:
      "Checks if at least one element in the array satisfies the specified condition.",
  },
  {
    name: "array_distinct",
    parameters: [
      {
        name: "array",
        type: "array",
      },
    ],
    example: [
      "select Customer.name, array_distinct(Customer.orders) from Customer;",
    ],
    description: "Returns an array of distinct elements from the input array.",
  },
  {
    name: "transform",
    parameters: [
      {
        name: "array",
        type: "array",
      },
      {
        name: "function",
        type: "function",
      },
    ],
    example: [
      "transform(orders, o -> o.totalprice)",
      "select Customer.name, transform(Customer.orders, o -> o.totalprice) from Customer;",
    ],
    description:
      "Transforms the input array by applying the specified function to each element.",
  },
  {
    name: "filter",
    parameters: [
      {
        name: "array",
        type: "array",
      },
      {
        name: "condition",
        type: "boolean",
      },
    ],
    example: [
      "filter(orders, o -> o.totalprice > 1000)",
      "select Customer.name, filter(Customer.orders, o -> o.totalprice > 1000) from Customer;",
    ],
    description:
      "Filters the input array by applying the specified condition to each element.",
  },
  {
    name: "first",
    parameters: [
      {
        name: "array",
        type: "array",
      },
      {
        name: "order_column",
        type: "string",
      },
      {
        name: "order",
        type: "string",
      },
    ],
    example: [
      "select Customer.name, first(Customer.orders, 'totalprice', 'asc') from Customer;",
      "select Customer.name, first(Customer.orders, 'totalprice', 'desc') from Customer;",
      "select Customer.name, first(Customer.orders).totalprice from Customer;",
    ],
    description: "Returns the first element in the array.",
  },
  {
    name: "any",
    parameters: [
      {
        name: "array",
        type: "array",
      },
      {
        name: "condition",
        type: "boolean",
      },
    ],
    example: [
      'select Customer.name, any(Customer.orders, order -> order.status = "f") from Customer;',
    ],
    description:
      "Checks if at least one element in the array satisfies the specified condition.",
  },
];

module.exports = function (route) {
  route.get("/functions", function (ctx) {
    ctx.body = functions.map((method) => method.name);
  });

  route.get("/functions/:functionName", function (ctx) {
    const { functionName } = ctx.params;
    const f = functions.find((method) => method.name === functionName);

    if (!f) {
      ctx.throw(404, `Method ${functionName} not found`);
      return;
    }

    ctx.body = f;
  });
};
