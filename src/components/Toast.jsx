import React, {useContext} from 'react';
import {ToastContext} from '../App';
import Snackbar from '@mui/material/Snackbar';

export default function Toast() {
    const {toastOpen, msg, setToastConfig} = useContext(ToastContext);

    const handleClose = () => {
        setToastConfig({toastOpen: false});
    };

    return (
        <div>
            <Snackbar
                open={toastOpen}
                autoHideDuration={3000}
                onClose={handleClose}
                message={msg}
                anchorOrigin={{vertical: "top", horizontal: "center"}}
            />
        </div>
    );
}