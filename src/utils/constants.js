const networks = [
  "mainnet",
  "arbitrum",
  "optimism",
  "base",
  // "polygon",
]

const amms = {
  mainnet: {
    amm: "0xe3E123ED9fec48a6f40A8aC7bE9afEDDAD80F146",
    tokenId: 0
  },
  arbitrum: {
    amm: "0xf0604A1c725F8eeb14FF082F2275AfE0B67A32D5",
    tokenId: 0
  },
  optimism: {
    amm: "0x11C8eC8B0DFD355C9931cB47ADd0F635dAE062ad",
    tokenId: 0
  },
  base: {
    amm: "0x709d075147a10495e5c3bBF3dfc0c138F34C6E72",
    tokenId: 0
  },
  polygon: {
    amm: "",
    tokenId: 0
  }
}

module.exports = {
  networks,
  amms
}