import React, {useState, useCallback, useEffect} from 'react';
import axios from 'axios';
import {List, ListItem, Card, CardContent, Typography, Box} from '@mui/material';

const pageSize = 10; // 选择每页加载多少条评论

const CommentList = ({apiUrl, refreshComments}) => {
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMoreComments, setHasMoreComments] = useState(true);

    useEffect(() => {
        setComments([]); // 清空当前评论列表
        setPage(1); // 重置页码到第一页
    }, [refreshComments]); // 当 refreshComments 变化时，重置状态并重新加载评论

    useEffect(() => {
        fetchComments();
    }, [page]);

    const fetchComments = async () => {
        try {
            //const response = await axios.get(`${apiUrl}?page=${page}&pageSize=${pageSize}`);
            const response = await axios.get('/mock/comments.json');
            setComments((prev) => [...prev, ...response.data.comments]);
            setHasMoreComments(response.data.hasNext);
        } catch (error) {
            // 处理错误情况
            console.error('Failed to fetch comments:', error);
        }
    };

    const handleScroll = useCallback(({target}) => {
        if (target.scrollHeight - target.scrollTop <= target.clientHeight && hasMoreComments) {
            setPage(prevPage => prevPage + 1);
        }
    }, [hasMoreComments]);


    return (
        <Box onScroll={handleScroll} sx={{overflowY: 'auto', maxHeight: 300, paddingRight: 4}}>
            <List>
                {comments.map((comment, index) => (
                    <ListItem key={index}>
                        <Card variant="outlined" sx={{width: '100%'}}>
                            <CardContent>
                                <Typography gutterBottom variant="h6">
                                    {comment.author}
                                </Typography>
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