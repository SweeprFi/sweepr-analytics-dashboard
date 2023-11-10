const networks = [
  "mainnet",
  "arbitrum",
  "optimism"
]

const addresses = {
  mainnet: {
    liquidityHelper: "0xC5f0DE0D8f48E12CcDE9f1902dE15A975b59768d",
    uniswapAsset: "0x676524646377A6e66Ca797edF7CCB1B5162a8cE0",
    uniswapPool: "0xfCAF342A7CbE3ea38622337F8d0Df029dc68bFF5"
  },
  arbitrum: {
    liquidityHelper: "0x7560d15774499386B04A64177E090B33e803493F",
    uniswapAsset: "0xe55D44783D8DB0684fe992e87d4703632f66cBB3",
    uniswapPool: "0xa7F4BC4689ed386F2cCa716207A1EbBb1172aaCB"
  },
  optimism: {
    liquidityHelper: "0xaD490d3899A47482E31AF50DdCc5Db31C0eE9eB0",
    uniswapAsset: "0xC5f0DE0D8f48E12CcDE9f1902dE15A975b59768d",
    uniswapPool: "0x8A0F60a4544c712Becdf9d6c4A920F4b756186ec"
  }
}

module.exports = {
  networks,
  addresses
}