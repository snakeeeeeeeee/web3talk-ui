import React, { useState } from 'react';
import {ethers} from "ethers";


const LoginWithSignature = () => {
    const [userAddress, setUserAddress] = useState('');
    const [signedMessage, setSignedMessage] = useState('');

    const handleLogin = async () => {
        if (!window.ethereum) {
            alert('请先安装MetaMask!');
            return;
        }

        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            setUserAddress(address);

            const message = `请签名来登录: ${new Date().toISOString()}`;
            const signature = await signer.signMessage(message);
            console.log(signature)
            setSignedMessage(signature);

            // 这里您可以把签名发送到后端进行验证

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <button onClick={handleLogin}>使用MetaMask登录</button>
            {userAddress && <p>地址: {userAddress}</p>}
            {signedMessage && <p>签名: {signedMessage}</p>}
        </div>
    );
}

export default LoginWithSignature;