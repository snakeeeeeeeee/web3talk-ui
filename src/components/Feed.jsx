import {Box, Stack, Skeleton, Tabs, Tab} from "@mui/material";
import React, {useState} from "react";
import {TabContext, TabList, TabPanel} from "@material-ui/lab";
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Post from "./Post";


function CustomTabPanel(props) {
    const {children, value, index, ...other} = props;


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const Feed = () => {
    const [loading, setLoading] = useState(true);
    const [tableIndex, setTableIndex] = React.useState("1");

    const handleChange = (event, newValue) => {
        setTableIndex(newValue);
    };

    setTimeout(() => {
        setLoading(false);
    }, [3000]);

    return (
        <Box flex={4} p={{xs: 0, md: 2}}>
            <TabContext value={tableIndex} >
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" indicatorColor="secondary" centered>
                        <Tab label="推荐" value="1"/>
                        {/*<Tab label="热点" value="2"/>*/}
                    </TabList>
                </Box>
                <TabPanel value="1">
                    {loading ? (
                        <Stack spacing={1}>
                            <Skeleton variant="text" height={100}/>
                            <Skeleton variant="text" height={20}/>
                            <Skeleton variant="text" height={20}/>
                            <Skeleton variant="rectangular" height={300}/>
                        </Stack>
                    ) : (
                        <>
                            <Post/>
                            <Post/>
                        </>
                    )}
                </TabPanel>
                {/*<TabPanel value="2">热点内容哦</TabPanel>*/}
            </TabContext>
        </Box>
    );
};

export default Feed;
