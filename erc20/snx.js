const address = "0xC011A72400E58ecD99Ee497CF89E3775d4bd732F".toLowerCase();

const abi = [
  {
    constant: false,
    inputs: [{ name: "_owner", type: "address" }],
    name: "nominateNewOwner",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "nominatedOwner",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "_target", type: "address" }],
    name: "setTarget",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "callData", type: "bytes" },
      { name: "numTopics", type: "uint256" },
      { name: "topic1", type: "bytes32" },
      { name: "topic2", type: "bytes32" },
      { name: "topic3", type: "bytes32" },
      { name: "topic4", type: "bytes32" }
    ],
    name: "_emit",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "useDELEGATECALL",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "value", type: "bool" }],
    name: "setUseDELEGATECALL",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "target",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "_owner", type: "address" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  { payable: true, stateMutability: "payable", type: "fallback" },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "newTarget", type: "address" }],
    name: "TargetUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "newOwner", type: "address" }],
    name: "OwnerNominated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "oldOwner", type: "address" },
      { indexed: false, name: "newOwner", type: "address" }
    ],
    name: "OwnerChanged",
    type: "event"
  }
];

module.exports = { address, abi };
