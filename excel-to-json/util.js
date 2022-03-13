const x_to_j = require("xls-to-json");
x_to_j({
  input: "./excel/03172103第一学期期末考试.xls",
  output: "./json/03172103第一学期期末考试.json"
}, (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log(res);
  }
});