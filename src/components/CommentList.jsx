import React, {useState, useCallback, useEffect, useContext} from 'react';
import axios from 'axios';
import {List, ListItem, Card, CardContent, Typography, Box, CardHeader} from '@mui/material';
import {PostListContext} from "../App";
import http from "../web3talkRpc";

const pageSize = 1000; // 选择每页加载多少条评论

const CommentList = ({targetId, refreshCommentsKey}) => {
    const [comments, setComments] = useState([]);
    const [hasMoreComments, setHasMoreComments] = useState(false);
    const [startId, setStartId] = useState(0);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                let reqBody = {
                    "currentAddress": window.localStorage.getItem("userWalletAddress"),
                    "pageSize": pageSize,
                    "startId": 0,
                    "type": 0,
                    "targetId": targetId
                };
                let config = {
                    headers: {
                        "Content-Type": "application/json"
                    }
                };
                const response = await http.post("/api/v1/comment/list", reqBody, config);
                if (response.data.code === "000000") {
                    let respData = response.data.data;
                    let commentArr = respData.comments
                    if (commentArr) {
                        setComments(commentArr);
                        setHasMoreComments(respData.hasNextPage);
                        setStartId(respData.endId);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            }
        };

        fetchComments();
    }, [refreshCommentsKey]);


    const handleScroll = useCallback(({target}) => {
        if (target.scrollHeight - target.scrollTop <= target.clientHeight && hasMoreComments) {

        }
    }, []);


    return (
        <Box onScroll={handleScroll} sx={{overflowY: 'auto', maxHeight: 300, paddingRight: 4}}>
            <List sx={{overflowY: 'auto', maxHeight: 300, paddingRight: 4}}>
                {comments.map((comment, index) => (
                    <ListItem key={index}>
                        <Card variant="outlined" sx={{width: '100%'}}>
                            <CardHeader title={
                                <Box>
                                    <Typography variant="h6">
                                        {"0x..."}
                                    </Typography>
                                    <Typography>
                                        {comment.commentTime}
                                    </Typography>
                                </Box>
                            }/>
                            <CardContent>
                                <Typography variant="body1">
                                    {comment.content}
                                </Typography>
                            </CardContent>
                        </Card>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default CommentList;