const db = require("./startup/mongodb")();
const abiDecoder = require("abi-decoder");
const readline = require("readline");
const Web3 = require("web3");
const web3 = new Web3("http://59.51.127.19:8545");
const toDate = require("./utils/toDate");
const abi = require("./erc20/abi");
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
    const fromResult = await collection
      .find({ from: line })
      .collation({ locale: "en", strength: 2 })
      .toArray();
    const toResult = await collection
      .find({ to: line })
      .collation({ locale: "en", strength: 2 })
      .toArray();
    const result = fromResult.concat(toResult);
    const newRes = result.map(async element => {
      let from, to, value, time, symbol;
      if (element.input === "0x" && element.value !== "0") {
        //eth
        from = element.from;
        to = element.to;
        value = web3.utils.fromWei(element.value, "ether");
        symbol = "ETH";
        time = toDate(element.timestamp);
        return { from, to, value, symbol, time };
      } else {
        //erc20
        const contract = new web3.eth.Contract(abi, element.to);
        abiDecoder.addABI(abi);
        const decodedData = abiDecoder.decodeMethod(element.input);
        if (decodedData.name === "transfer") {
          const decimals = await contract.methods.decimals().call();
          from = element.from;
          to = decodedData.params[0].value;
          value = decodedData.params[1].value / 10 ** decimals;
          if (element.to === "0xdcD85914b8aE28c1E62f1C488E1D968D5aaFfE2b")
            symbol = "TOP";
          else symbol = await contract.methods.symbol().call();
          time = toDate(element.timestamp);
          return { from, to, value, symbol, time };
        } else {
          console.log(
            `${decodedData.name} method is invoked, but were not handled`
          );
        }
      }
    });
    const finalRel = await Promise.all(newRes);
    const csvWriter = require("./startup/csvWriter")(line);
    const startTime = Math.round(new Date() / 1000);
    csvWriter.writeRecords(finalRel).then(() => {
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
