const abiDecoder = require("abi-decoder");
const toDate = require("./toDate");
const abi = require("../erc20/abi");
const Web3 = require("web3");
const web3 = new Web3("http://59.51.127.19:8545");

module.exports = async function(arr) {
  const newRes = arr.map(async element => {
    let from, to, value, time, symbol;
    if (element.input === "0x" && element.value !== "0") {
      //eth
      from = element.from;
      to = element.to;
      value = web3.utils.fromWei(element.value, "ether");
      symbol = "ETH";
      time = toDate(element.timestamp);
      return { time, from, to, value, symbol };
    } else {
      //erc20
      try {
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
          else if (element.to === "0xB31C219959E06f9aFBeB36b388a4BaD13E802725")
            symbol = "ONOT";
          else symbol = await contract.methods.symbol().call();
          time = toDate(element.timestamp);
          return { time, from, to, value, symbol };
        } else {
          console.log(
            `${decodedData.name} method is invoked, but were not handled`
          );
        }
      } catch (err) {
        console.log(err);
        console.log("contract addr:", element.to);
      }
    }
  });
  const finalRes = await Promise.all(newRes);
  return finalRes;
};
