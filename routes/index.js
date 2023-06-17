const handleTable = require("./tables");
const handleColumns = require("./columns");
const handleRelationship = require("./relationships");
const handleFunction = require('./functions');
const handleMetric = require('./metrics');

module.exports = function (route) {
  handleTable(route);
  handleColumns(route);
  handleRelationship(route);
  handleFunction(route);
  handleMetric(route);
};
