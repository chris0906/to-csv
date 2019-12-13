const db = require("./startup/mongodb")();
const readline = require("readline");
const web3 = require("web3");
const toDate = require("./utils/toDate");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.setPrompt("海星数据> (请输入钱包地址:)");
rl.prompt();

rl.on("line", async function(line) {
  if (line === "close") rl.close();
  else if (line.substring(0, 2) !== "0x" || line.length !== 42)
    console.log("地址格式不正确，请重新输入");
  else {
    const collection = db.collection("transactions");
    const result = await collection
      .find({ $or: [{ from: line }, { to: line }] })
      .toArray();
    const csvWriter = require("./startup/csvWriter")(line);
    csvWriter.writeRecords(transformArray(result)).then(() => {
      console.log("csv文件已经导出");
    });
  }
  rl.prompt();
});

rl.on("close", function() {
  console.log("bye bye!");
  process.exit(0);
});

function transformArray(arr) {
  //   const filteredArr = arr.filter(element => element.value !== "0");
  //   if (filteredArr.length === 0) return filteredArr;
  return arr.map(element => {
    const from = element.from;
    const to = element.to;
    const value = web3.utils.fromWei(element.value, "ether");
    const date = toDate(element.timestamp);
    return { from, to, value, date };
  });
}
