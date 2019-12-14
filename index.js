const db = require("./startup/mongodb")();
const transformData = require("./utils/transformData");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.setPrompt("请输入钱包地址:");
rl.prompt();

rl.on("line", async function(line) {
  if (line === "close") rl.close();
  else if (line.substring(0, 2) !== "0x" || line.length !== 42)
    console.log("地址格式不正确");
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
    const result = fromResult.concat(toResult);
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
