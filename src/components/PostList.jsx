import React, {useState, useCallback, useEffect} from 'react';
import {Box} from '@mui/material';
import http from "../web3talkRpc";
import Post from "./Post";

const pageSize = 20; // 选择每页加载多少条评论

const PostList = ({apiUrl, refreshPosts = 0}) => {
    const [posts, setPosts] = useState([]);
    const [startId, setStartId] = useState(0);
    const [hasMorePosts, setHasMorePosts] = useState(true);

    useEffect(() => {
        setPosts([]); // 清空当前评论列表
        setStartId(0); // 重置页码到第一页
    }, [refreshPosts]); // 当 refreshComments 变化时，重置状态并重新加载评论

    useEffect(() => {
        fetchPosts();
    }, [startId]);

    const fetchPosts = async () => {
        try {
            let reqBody = {
                "currentAddress": window.localStorage.getItem("userWalletAddress"),
                "pageSize": pageSize,
                "startId": startId
            }
            let config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const response = await http.post("/api/v1/post/list", reqBody, config);
            if (response.data.code === "000000") {
                let respData = response.data.data;
                let postArr = respData.posts
                if (postArr) {
                    console.log(`posts 是: ${postArr}`);
                    setPosts((prev) => [...prev, ...postArr]);
                    setHasMorePosts(respData.hasNextPage);
                    setStartId(respData.endId);
                }
            }
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    };

    const handleScroll = useCallback(({target}) => {
        if (target.scrollHeight - target.scrollTop <= target.clientHeight && hasMorePosts) {
            fetchPosts(); // 当滚动到底部且还有更多帖子时，载入更多帖子
        }
    }, [hasMorePosts]);


    return (
        <Box onScroll={handleScroll}>
            {
                posts.map((post, index) => (
                    <Post postInfo={{
                        id: post.id,
                        title: post.title,
                        content: post.content,
                        postTime: post.postTime,
                        author: "",
                        isLike: post.isLike
                    }}/>
                ))
            }
        </Box>
    );
};

export default PostList;