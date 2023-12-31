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
  polygon: {
    amm: "0x71Dc6599cbA8d7087725f23c0681308A13A451bB",
  },
  bsc: {
    amm: "0xa5Dd492674f8C68C89b403BDFd0e794db42f2b92",
    tokenId: 373654,
    decimals: 18
  },
}

module.exports = { networks, amms }