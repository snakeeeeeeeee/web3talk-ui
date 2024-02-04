import { Mail, Notifications, Pets } from "@mui/icons-material";
import {
    AppBar,
    Avatar,
    Badge,
    Box,
    InputBase,
    Menu,
    MenuItem,
    styled,
    Toolbar,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import LoginButton from "./Login";


const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
    backgroundColor: "white",
    padding: "0 10px",
    borderRadius: theme.shape.borderRadius,
    width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
    display: "none",
    alignItems: "center",
    gap: "20px",
    [theme.breakpoints.up("sm")]: {
        display: "flex",
    },
}));

const UserBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    [theme.breakpoints.up("sm")]: {
        display: "none",
    },
}));
const Navbar = () => {
    const [open, setOpen] = useState(false);
    return (
        <AppBar position="sticky">
            <StyledToolbar>
                <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
                    Web3Talk
                </Typography>
                <Pets sx={{ display: { xs: "block", sm: "none" } }} />
                <Search>
                    <InputBase placeholder="search..." />
                </Search>

                <Box>
                    <LoginButton/>
                    {/*<LoginWithSignature/>*/}
                </Box>
            </StyledToolbar>
            {/*<Menu*/}
            {/*    id="demo-positioned-menu"*/}
            {/*    aria-labelledby="demo-positioned-button"*/}
            {/*    open={open}*/}
            {/*    onClose={(e) => setOpen(false)}*/}
            {/*    anchorOrigin={{*/}
            {/*        vertical: "top",*/}
            {/*        horizontal: "right",*/}
            {/*    }}*/}
            {/*    transformOrigin={{*/}
            {/*        vertical: "top",*/}
            {/*        horizontal: "right",*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <MenuItem>Profile</MenuItem>*/}
            {/*    <MenuItem>My account</MenuItem>*/}
            {/*    <MenuItem>Logout</MenuItem>*/}
            {/*</Menu>*/}
        </AppBar>
    );
};

export default Navbar;