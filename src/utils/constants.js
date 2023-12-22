const networks = [
  "mainnet",
  "arbitrum",
  "optimism",
  "base",
  "avalanche",
]

const amms = {
  mainnet: {
    amm: "0xe3E123ED9fec48a6f40A8aC7bE9afEDDAD80F146",
  },
  arbitrum: {
    amm: "0xf0604A1c725F8eeb14FF082F2275AfE0B67A32D5",
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
  // polygon: {
  //   amm: "",
  // }
}

module.exports = { networks, amms }