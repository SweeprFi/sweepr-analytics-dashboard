# Sweep Analytics

## Requirements

Make sure you have the following components installed before getting started:

- Node.js: [Download Node.js](https://nodejs.org/)
- npm (Node.js package manager): Comes bundled with Node.js

## Installation

-   Clone the repo: `git clone https://github.com/SweeprFi/sweepr-analytics-dashboard.git`
-   Run `cd sweepr-analytics-dashboard`
-   Run `npm i`
-   Run `cp .env.example .env`
-   Run `npm run dev`
-   See `http://localhost:3000/`

## Availables routes

- GET /sweep
> Performs a query to the Sweep protocol for all networks.

- GET /sweep/:network
> Performs a query to the Sweep protocol for the provided network.

- GET /sweep-allowance
> Fetches Sweep allowance data.
* Query parameters:
1. network: (mainnet - arbitrum - optimism - base - polygon)
2. owner: The address of the token owner who previously called the approve() function.
3. spender: The address of the spender.

- GET /sweep-balance
> Fetches Sweep balance data.
* Query parameters:
1. network: (mainnet - arbitrum - optimism)
2. account: The address whose token balances you want to read.

- GET /sweep-minters
> Fetches all Sweep minters.
* Query parameters:
1. network: (mainnet - arbitrum - optimism)

- GET /sweep-minter
> Fetches minter data.
* Query parameters:
1. network: (mainnet - arbitrum - optimism)
2. account: Minter address.

- GET /sweep-prices
> Fetches the prices data (amm price - twa price - target price).
* Query parameters:
1. network: (mainnet - arbitrum - optimism)

- GET /assets
> Fetches all asset data from all networks.

- GET /assets/:network
> Fetches all asset data from the provided network.

- GET /asset
> Fetches all read-only data from the Asset.
* Query parameters:
1. network: (mainnet - arbitrum - optimism)
2. address: Asset address.

- GET /amm
> Performs a query to the AMM Sweep protocol for all networks.

- GET /amm/:network
> Performs a query to the AMM Sweep protocol for the provided network.

- GET /sweeptotal
- GET /sweepsupply
> Fetches the total amount of SWEEP that has been minted.
> Returns a numerical value.

- GET /sweeprtotal
> Fetches the total amount of SWEEPR that has been minted.
> Returns a numerical value.

- GET /sweeprcirculating
> Fetches the total amomunt of SWEEPR that is currently circulating.
> Returns a numerical value represented by the formula: `totalAmount - lockedAmount` at the vesting approver list.

- GET /deal/:address
> Fetches the deal data from the provided address. (this must be in Arbitrum)
> Returns four values for every NFT minted: ClaimedAmount, StakedAmount, Owner (staker), TBA associated to the NFT
