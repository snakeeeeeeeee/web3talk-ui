import Leftbar from "./components/Leftbar";
import Feed from "./components/Feed";
import Rightbar from "./components/Rightbar";
import {Box, createTheme, Stack, ThemeProvider} from "@mui/material";
import Navbar from "./components/Navbar";
import AddPost from "./components/AddPost";
import React, {createContext, useCallback, useMemo, useState} from 'react';
import Toast from "./components/Toast";
import { v4 as uuidv4 } from 'uuid';


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

export const PostListContext = createContext();

function App() {
    const [mode, setMode] = useState("light");

    const [refreshPostListKey, setRefreshPostListKey] = useState("");
    const increasePostListKey = useCallback(() => {
        debugger
        setRefreshPostListKey(uuidv4());
    }, []);
    const contextValue = useMemo(() => ({
        refreshPostListKey,
        increasePostListKey,
    }), [refreshPostListKey, increasePostListKey]);

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
                <PostListContext.Provider value={contextValue}>
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