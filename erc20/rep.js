const address = "0x1985365e9f78359a9B6AD760e32412f4a445E862".toLowerCase();

const abi = [
  {
    constant: true,
    inputs: [],
    name: "getController",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "_controller", type: "address" }],
    name: "setController",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "controllerLookupName",
    outputs: [{ name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { name: "_controller", type: "address" },
      { name: "_controllerLookupName", type: "bytes32" }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  { payable: true, stateMutability: "payable", type: "fallback" }
];

module.exports = { address, abi };
