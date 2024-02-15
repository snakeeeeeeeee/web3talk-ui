import React, {useState, useContext} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {ethers} from "ethers";
import http from "../web3talkRpc";
import {ToastContext} from "../App";

const LoginButton = () => {
    const [account, setAccount] = useState('');
    const [message, setMessage] = useState('');
    const [signature, setSignature] = useState('');

    // toast
    const {toastConfig, msg, setToastConfig} = useContext(ToastContext);

    // 需要做成配置
    // const chainId = '0x5';
    // const chainInfo = {
    //     chainId: chainId,
    //     rpcUrls: ["https://eth-goerli.api.onfinality.io/public"],
    //     chainName: 'Goerli',
    //     nativeCurrency: {
    //         name: 'ETH',
    //         symbol: 'ETH',
    //         decimals: 18,
    //     },
    //     blockExplorerUrls: ['https://goerli.etherscan.io/'],
    // }

    const chainId = '0x5d50';
    const chainInfo = {
        chainId: chainId,
        rpcUrls: ["https://sepolia.blast.io"],
        chainName: 'Blast Sepolia Testnet',
        nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18,
        },
        blockExplorerUrls: ['https://goerli.etherscan.io/'],
    }

    const logout = () => {
        console.log('Logging out...');
        // 清除账户地址信息
        setAccount('');
        localStorage.removeItem('account');
        window.userWalletAddress = null;
        window.localStorage.removeItem("userWalletAddress");
        //setUserWalletAddress(null)
    };


    const addAndSwitchNetwork = async (provider) => {
        try {
            // 检查用户是否已经在你设定的网络上
            await provider.send('wallet_switchEthereumChain', [{chainId: chainId}]);
        } catch (switchError) {
            // 如果用户不在你设定的网络上，尝试向用户的MetaMask钱包添加该网络
            if (switchError.code === 4902) {
                try {
                    await provider.send('wallet_addEthereumChain', [chainInfo]);
                } catch (addError) {
                    console.error(addError);
                }
            } else {
                console.error(switchError);
            }
        }
    }


    const login = async () => {

        if (!window.ethereum) {
            setToastConfig({toastOpen: true, msg: "Wallet not found, Please install Wallet"})
            return;
        }

        try {
            await window.ethereum.request({method: 'eth_requestAccounts'});
            const provider = new ethers.BrowserProvider(window.ethereum);
            await addAndSwitchNetwork(provider);
            const signer = await provider.getSigner();
            const account = await signer.getAddress();

            const message = `Welcome to web3talk, an open communication platform.`;
            const signature = await signer.signMessage(message);
            setSignature(signature)
            console.log(`签名是：${signature}`)


            // 将账户地址信息存储到localStorage中
            window.userWalletAddress = account;
            window.localStorage.setItem("userWalletAddress", account);

            // 发送到后端验证
            let reqBody = {
                "address": window.localStorage.getItem("userWalletAddress")
            }
            let config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            http.post("/api/v1/user/login", reqBody, config).then(response => {
                if (response.data.code === "000000") {
                    setToastConfig({toastOpen: true, msg: "Login Success"})
                    // 空值按钮变化
                    setAccount(account);
                }
            }).catch(error => {
                console.log(error);
            }).finally(() => {

            });


        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box>
            {!account ? (
                <Button variant="contained" onClick={login}>
                    Login
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