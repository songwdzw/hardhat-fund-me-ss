require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("hardhat-gas-reporter")
require("@nomiclabs/hardhat-etherscan")

require("dotenv").config()
require("solidity-coverage")

/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY
module.exports = {
    // solidity: "0.8.17",
    solidity: {
        compilers: [{ version: "0.8.17" }, { version: "0.6.6" }],
    },

    networks: {
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
        },
    },

    gasReporter: {
        enabled: false, //暂时还不想用，想用改回true即可
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        coinmarketcap: COINMARKETCAP_API_KEY,
    },

    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
        apiKey: {
            goerli: GOERLI_RPC_URL,
        },
        customChains: [
            {
                network: "goerli",
                chainId: 5,
                urls: {
                    apiURL: "http://api-goerli.etherscan.io/api",
                    browserURL: "https://goerli.etherscan.io",
                },
            },
        ],
    },
    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
            // 1: 0,  similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
        },
    },
}
