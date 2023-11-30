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
    amm: "0x11C8eC8B0DFD355C9931cB47ADd0F635dAE062ad",
  },
  base: {
    amm: "0x709d075147a10495e5c3bBF3dfc0c138F34C6E72",
  },
  avalanche: {
    amm: "0x9693AEea2B32452e0834C860E01C33295d2164a5",
  },
  // polygon: {
  //   amm: "",
  // }
}

module.exports = {
  networks,
  amms
}