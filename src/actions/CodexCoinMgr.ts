
export const depositCodexCoin = async (amount: number) => {

    // for now we are randomly giving codexCoins to the user
    return Math.floor(Math.random() * 1000) + 1; // random number between 1 and 1000


    // logic from smart contract
}

export const withdrawCodexCoin = async (amount: number) => {
    // logic from smart contract
    // fetch from db and return the amount of codex coins in the wallet
}

export const getCodexCoinBalance = async () => {
    // logic from smart contract
    // fetch from db and return the amount of codex coins in the wallet

}

export const stakeCodexCoin = async (amount: number) => {

    //reduce the amount staked from db and reflect 
    // reduce it from smart contract as well 
}