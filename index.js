const db = require("./startup/mongodb")();
const transformData = require("./utils/transformData");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const Web3 = require("web3");
const web3 = new Web3("http://59.51.127.19:8545");

rl.setPrompt("请输入钱包地址:");
rl.prompt();

rl.on("line", async function(line) {
  let code;
  if (web3.utils.isAddress(line)) code = await web3.eth.getCode(line);
  if (line === "close") rl.close();
  else if (line.substring(0, 2) !== "0x" || line.length !== 42)
    console.log("地址格式不正确");
  else if (code.length > 2) console.log("请勿输入合约地址");
  else {
    const collection = db.collection("transactions");
    const fromResult = await collection
      .find({ from: line })
      .collation({ locale: "en", strength: 2 })
      .toArray();
    const toResult = await collection
      .find({ to: line })
      .collation({ locale: "en", strength: 2 })
      .toArray();
    const transferCode = "0xa9059cbb000000000000000000000000";
    const inputData = transferCode + line.toLowerCase().substr(2);
    const inputResult = await collection
      .find({
        input: eval("/^" + inputData + "/")
      })
      .toArray();
    const result = fromResult.concat(toResult).concat(inputResult);
    const finalRes = await transformData(result);
    const csvWriter = require("./startup/csvWriter")(line);
    const startTime = Math.round(new Date() / 1000);
    csvWriter.writeRecords(finalRes).then(() => {
      console.log("csv file has been exported");
      const finishTime = Math.round(new Date() / 1000);
      console.log(`${finishTime - startTime} seconds was spent`);
    });
  }
  rl.prompt();
});

rl.on("close", function() {
  console.log("bye bye!");
  process.exit(0);
});
