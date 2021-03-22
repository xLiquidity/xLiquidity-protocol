import { erc20Abi } from "./abi";

// contracts
export const vaultContractAddress = "";

// erc20 addresses
export const daiContractAddress = "0x6b175474e89094c44da98b954eedeac495271d0f";
export const usdcContractAddress = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
export const wbtcContractAddress = "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599";

export const assets = [
    { symbol: "dai", address: daiContractAddress, abi: erc20Abi },
    { symbol: "usdc", address: usdcContractAddress, abi: erc20Abi },
    { symbol: "wbtc", address: wbtcContractAddress, abi: erc20Abi },
];
