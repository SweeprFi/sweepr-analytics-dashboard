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
    poolId: "0xa468570db143321bc034bbd74a6cc2694d15b252000000000000000000000629",
    stableCoin: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  },
  arbitrum: {
    amm: "0xf0604A1c725F8eeb14FF082F2275AfE0B67A32D5",
    poolId: "0xef093ccfdd4d5a590b028463e0528049939889c90000000000000000000004cf",
    stableCoin: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  },
  optimism: {
    amm: "0x11C8eC8B0DFD355C9931cB47ADd0F635dAE062ad",
    poolId: "0xc4ee406970047a70aed14621d97b3b460a7dea0b00000000000000000000010b",
    stableCoin: "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
  },
  base: {
    amm: "0x709d075147a10495e5c3bBF3dfc0c138F34C6E72",
    poolId: "0x15d9d108437b17d1fa70392f9ed086306229ec910000000000000000000000bf",
    stableCoin: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
  },
  // polygon: {
  //   amm: "",
  //   poolId: "",
  //   stableCoin: "",
  // }
}

module.exports = {
  networks,
  amms
}