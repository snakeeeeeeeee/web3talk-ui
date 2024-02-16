import React, {useState, useCallback, useEffect} from 'react';
import {Box} from '@mui/material';
import http from "../web3talkRpc";
import Post from "./Post";

const pageSize = 20; // 选择每页加载多少条评论

const PostListBack = ({apiUrl, refreshPosts = 0}) => {
    console.log("init PostList....")
    const [posts, setPosts] = useState([]);
    const [startId, setStartId] = useState(0);
    const [hasMorePosts, setHasMorePosts] = useState(false);

    /*useEffect(() => {
        setPosts([]);
        setStartId(0);
    }, [refreshPosts]);*/

    /*useEffect(() => {
        fetchPosts();
    }, [startId]);*/


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
        const response = http.post("/api/v1/post/list", reqBody, config);
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

    /*const fetchPosts = async () => {
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
*/
    const handleScroll = useCallback(({target}) => {
        if (target.scrollHeight - target.scrollTop <= target.clientHeight && hasMorePosts) {
            //fetchPosts(); // 当滚动到底部且还有更多帖子时，载入更多帖子
        }
    }, [hasMorePosts]);


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
                    }}/>
                ))
            }
        </Box>
        /*<Box onScroll={handleScroll}>
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
        </Box>*/
    )
        ;
};

export default PostListBack;