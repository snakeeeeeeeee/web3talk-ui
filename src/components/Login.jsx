import React, {useEffect, useState} from 'react';
import Web3 from 'web3';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {ethers} from "ethers";

const LoginButton = () => {
    const [account, setAccount] = useState('');
    const [message, setMessage] = useState('');
    const [signature, setSignature] = useState('');


    const logout = () => {
        console.log('Logging out...');
        // 清除账户地址信息
        setAccount('');
        localStorage.removeItem('account');
        window.userWalletAddress = null;
        window.localStorage.removeItem("userWalletAddress");
    };


    const switchNetwork = async (networkId) => {
        try {
            if (window.ethereum) {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{chainId: Web3.utils.toHex(networkId)}],
                });
            } else {
                console.error('wallet is not installed!');
            }
        } catch (switchError) {
            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: Web3.utils.toHex(networkId),
                            },
                        ],
                    });
                } catch (addError) {
                    console.error('Failed to add the network:', addError);
                }
            } else {
                console.error('Failed to switch the network:', switchError);
            }
        }
    };


    const login = async () => {

        if (!window.ethereum) {
            alert('wallet not found');
            return;
        }

        try {
            await window.ethereum.request({method: 'eth_requestAccounts'});
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const account = await signer.getAddress();
            setAccount(account);

            const message = `Welcome to web3talk, an open communication platform.`;
            const signature = await signer.signMessage(message);
            setSignature(signature)
            console.log(signature)


            // 将账户地址信息存储到localStorage中
            window.userWalletAddress = account;
            window.localStorage.setItem("userWalletAddress", account);

            // 这里您可以把签名发送到后端进行验证

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box>
            {!account ? (
                <Button variant="contained" onClick={login}>
                    登录
                </Button>
            ) : (
                <>
                    {/*<div>Account: {account}</div>*/}
                    <Button variant="contained" color="secondary" onClick={logout}>
                        {account.substring(0, 2) + "..."}
                    </Button>
                </>
            )}
        </Box>
    );
};

export default LoginButton;