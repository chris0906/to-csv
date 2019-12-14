const createCsvWriter = require("csv-writer").createObjectCsvWriter;

module.exports = function(path) {
  csvWriter = createCsvWriter({
    path: `${path}.csv`,
    header: [
      { id: "from", title: "FROM" },
      { id: "to", title: "TO" },
      { id: "value", title: "VALUE" },
      { id: "symbol", title: "SYMBOL" },
      { id: "time", title: "TIME" }
    ]
  });
  return csvWriter;
};
