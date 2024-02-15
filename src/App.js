import Leftbar from "./components/Leftbar";
import Feed from "./components/Feed";
import Rightbar from "./components/Rightbar";
import {Box, createTheme, Stack, ThemeProvider} from "@mui/material";
import Navbar from "./components/Navbar";
import AddPost from "./components/AddPost";
import React, {createContext, useState} from 'react';
import Toast from "./components/Toast";


export const ToastContext = createContext({
    toastOpen: false,
    msg: '',
    setToastOpen: () => {
    },
});

export const LoginContext = createContext({
    isLogin: false,
    addr: ''
});

export const PostListContext = createContext([]);

function App() {
    const [mode, setMode] = useState("light");
    const [postList, setPostList] = useState({
        id: 99999999,
        title: "Default Title",
        content: "Default Content",
        postTime: "2024-01-01 00:00:00",
        author: "",
        isLike: false
    });
    const [toastConfig, setToastConfig] = useState(
        {toastOpen: false, msg: ''}
    );
    const [loginConfig, setLoginConfig] = useState(
        {
            isLogin: false,
            addr: ''
        }
    );

    const darkTheme = createTheme({
        palette: {
            mode: mode,
        },
    });
    return (
        <ThemeProvider theme={darkTheme}>
            <ToastContext.Provider value={{...toastConfig, setToastConfig}}>
                <PostListContext.Provider value={{...postList, setPostList}}>
                    <Box bgcolor={"background.default"} color={"text.primary"}>
                        <Navbar/>
                        <Stack direction="row" spacing={2} justifyContent="space-between">
                            <Leftbar setMode={setMode} mode={mode}/>
                            <Feed/>
                            <Rightbar/>
                        </Stack>
                        <AddPost/>
                        <Toast msg={toastConfig.msg}/>
                    </Box>
                </PostListContext.Provider>
            </ToastContext.Provider>
            <LoginContext.Provider value={{...loginConfig, setLoginConfig}}>
            </LoginContext.Provider>
        </ThemeProvider>
    );
}

export default App;