const address = "0x0000000000085d4780B73119b644AE5ecd22b376".toLowerCase();

const abi = [
  {
    constant: true,
    inputs: [],
    name: "proxyOwner",
    outputs: [{ name: "owner", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "pendingProxyOwner",
    outputs: [{ name: "pendingOwner", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "implementation", type: "address" }],
    name: "upgradeTo",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "implementation",
    outputs: [{ name: "impl", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "claimProxyOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "newOwner", type: "address" }],
    name: "transferProxyOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  { payable: true, stateMutability: "payable", type: "fallback" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "previousOwner", type: "address" },
      { indexed: true, name: "newOwner", type: "address" }
    ],
    name: "ProxyOwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "currentOwner", type: "address" },
      { indexed: false, name: "pendingOwner", type: "address" }
    ],
    name: "NewPendingOwner",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, name: "implementation", type: "address" }],
    name: "Upgraded",
    type: "event"
  }
];

module.exports = { address, abi };
