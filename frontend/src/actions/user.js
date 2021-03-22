import {
    DEPOSIT_INITIATED,
    WITHDRAW_INITIATED,
    ACCOUNT_UPDATED,
    PROVIDER_LOADED,
    SIGNER_LOADED,
    ACCOUNT_LOADED,
    BALANCE_LOADED,
    TOKEN_BALANCES_LOADED,
    ACCOUNT_DISCONNECTED,
} from "./types";

export function depositInitiatedInState(asset, amount) {
    return async function (dispatch) {
        console.log("depositing: " + asset, amount);
        return dispatch(depositInitiated(asset, amount));
    };
}

function depositInitiated(asset, amount) {
    return {
        type: DEPOSIT_INITIATED,
        deposit: { asset, amount },
    };
}

export function withdrawInitiatedInState(asset, amount) {
    return async function (dispatch) {
        console.log("withdrawing: " + asset, amount);
        return dispatch(withdrawInitiated());
    };
}

function withdrawInitiated(asset, amount) {
    return {
        type: WITHDRAW_INITIATED,
        withdraw: { asset, amount },
    };
}

export function accountLoaded(account) {
    return {
        type: ACCOUNT_LOADED,
        account,
    };
}

export function accountUpdated(account) {
    return {
        type: ACCOUNT_UPDATED,
        account,
    };
}

export function providerLoaded(provider) {
    return {
        type: PROVIDER_LOADED,
        provider,
    };
}

export function signerLoaded(signer) {
    return {
        type: SIGNER_LOADED,
        signer,
    };
}

export function balanceLoaded(balance) {
    return {
        type: BALANCE_LOADED,
        balance,
    };
}

export function tokenBalancesLoaded(balances) {
    return {
        type: TOKEN_BALANCES_LOADED,
        balances,
    };
}

export function disconnectAccount() {
    return {
        type: ACCOUNT_DISCONNECTED,
    };
}
