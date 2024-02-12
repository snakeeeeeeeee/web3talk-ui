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

function App() {
    const [mode, setMode] = useState("light");
    const [toastConfig, setToastConfig] = useState(
        {toastOpen: false, msg: ''}
    );

    const darkTheme = createTheme({
        palette: {
            mode: mode,
        },
    });
    return (
        <ThemeProvider theme={darkTheme}>
            <ToastContext.Provider value={{...toastConfig, setToastConfig}}>
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
            </ToastContext.Provider>
        </ThemeProvider>
    );
}

export default App;