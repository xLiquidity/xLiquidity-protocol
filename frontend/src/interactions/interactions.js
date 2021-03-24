import { ethers } from "ethers";
import { assets } from "../config/config";
import {
    accountLoaded,
    accountUpdated,
    providerLoaded,
    signerLoaded,
    balanceLoaded,
    tokenBalancesLoaded,
} from "../actions/user";

export const getAccount = async (dispatch, window) => {
    const { ethereum } = window;
    if (ethereum) {
        const accounts = await ethereum.request({ method: "eth_accounts" });
        dispatch(accountLoaded(accounts[0]));
    }
};

export const updateAccount = (dispatch, window) => {
    const { ethereum } = window;
    if (ethereum) {
        ethereum.on("accountsChanged", (accounts) => {
            dispatch(accountUpdated(accounts[0]));
        });
    }
};

export const loadProvider = (dispatch) => {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        dispatch(providerLoaded(provider));
        return provider;
    } catch (e) {
        console.log(e);
    }
};

export const loadSigner = (dispatch) => {
    try {
        const provider = loadProvider(dispatch);
        const signer = provider.getSigner();
        dispatch(signerLoaded(signer));
        return signer;
    } catch (e) {
        console.log(e);
    }
};

export const loadBalance = async (dispatch, provider, account) => {
    try {
        const balance = await provider.getBalance(account);
        const formattedEther = ethers.utils.formatEther(balance);
        dispatch(balanceLoaded(formattedEther));
        return formattedEther;
    } catch (e) {
        console.log(e);
    }
};

export const loadTokenBalance = async (provider, account, tokenAddress, tokenAbi) => {
    try {
        const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);
        const balance = await tokenContract.balanceOf(account);
        return balance;
    } catch (e) {
        console.log(e);
    }
};

export const loadTokenBalances = async (dispatch, provider, account) => {
    let balances = [];

    try {
        for (const asset of assets) {
            const balance = await loadTokenBalance(
                provider,
                account,
                asset.address,
                asset.abi
            );
            const formattedBalance = ethers.utils.formatUnits(balance, 18);
            balances.push({ asset: asset.symbol, balance: formattedBalance });
        }
    } catch (err) {
        console.log(err);
    }

    dispatch(tokenBalancesLoaded(balances));
    return balances;
};
