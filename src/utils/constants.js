const networks = [
  "mainnet",
  "arbitrum",
  "optimism",
  "base",
  "avalanche",
  "polygon",
  "bsc",
]

const amms = {
  mainnet: {
    amm: "0x9cE2837d6d84bb521A5a3002a2132B9E9E9cc4C8",
  },
  arbitrum: {
    amm: "0x72E5b0E088c895ab0d6A86d14943C63aD735B7Cc",
  },
  optimism: {
    amm: "0x33A48e4aA79A66fc4f7061f5D9E274528C213029",
  },
  base: {
    amm: "0xff368E106EA8782FaB6B2D4AD69739a60C66400E",
  },
  avalanche: {
    amm: "0x709d075147a10495e5c3bBF3dfc0c138F34C6E72",
  },
  polygon: {
    amm: "0x71Dc6599cbA8d7087725f23c0681308A13A451bB",
  },
  bsc: {
    amm: "0xb86d3eea67A8bcaF232Ee9643d5ae5C44525c57e",
    market: "0xe3E123ED9fec48a6f40A8aC7bE9afEDDAD80F146",
  },
}

module.exports = { networks, amms }