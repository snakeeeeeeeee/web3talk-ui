const initialState = {
    userWalletAddress: null,
};

export const userWalletAddressReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_WALLET_ADDRESS':
            return { ...state, userWalletAddress: action.walletAddress };
        default:
            return state;
    }
};