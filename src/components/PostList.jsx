import React, {useState, useEffect, useContext} from 'react';
import {Box} from '@mui/material';
import http from "../web3talkRpc";
import Post from "./Post";
import {PostListContext} from "../App";

const pageSize = 1000; // 选择每页加载多少条评论

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [startId, setStartId] = useState(0);
    const [hasMorePosts, setHasMorePosts] = useState(false);
    const refreshPostListKey = useContext(PostListContext);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let reqBody = {
                    "currentAddress": window.localStorage.getItem("userWalletAddress"),
                    "pageSize": pageSize,
                    "startId": startId
                };
                let config = {
                    headers: {
                        "Content-Type": "application/json"
                    }
                };
                const response = await http.post("/api/v1/post/list", reqBody, config);
                if (response.data.code === "000000") {
                    let respData = response.data.data;
                    let postArr = respData.posts
                    if (postArr) {
                        //setPosts((prev) => [...prev, ...postArr]);
                        setPosts(postArr);
                        setHasMorePosts(respData.hasNextPage);
                        setStartId(respData.endId);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            }
        };

        fetchPosts();
    }, [refreshPostListKey]);

    return (
        <Box>
            {
                posts.map((post, index) => (
                    <Post postInfo={{
                        id: post.id,
                        title: post.title,
                        content: post.content,
                        postTime: post.postTime,
                        author: "",
                        isLike: post.isLike
                    }} key={index}/>
                ))
            }
        </Box>
    );
};
export default PostList;