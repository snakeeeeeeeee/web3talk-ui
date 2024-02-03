import {Favorite, FavoriteBorder, MoreVert, Comment} from "@mui/icons-material";
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Checkbox,
    IconButton,
    Typography,
} from "@mui/material";
import React, {useState} from 'react';
import CommentDialog from "./CommentDialog";


const Post = () => {


    let postContent = "帖子的正文内容asdas ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
    // 使用state来控制评论列表的显示
    const [showComments, setShowComments] = useState(false);

    function openCommentList() {
        setShowComments(prev => !prev);
    }


    const [showCommentDialogs, setCommentDialog] = useState(false);

    function openCommentDialogs() {
        setCommentDialog(prev => {
            console.log('Current state:', prev, 'New state:', !prev);
            return !prev;
        });
    }

    const handleCloseDialog = () => {
        setCommentDialog(false);
    };


    return (
        <Card sx={{margin: 5}}>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: "red"}} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVert/>
                    </IconButton>
                }
                title="John Doe"
                subheader="September 14, 2022"
            />

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {postContent}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <Checkbox
                        icon={<FavoriteBorder/>}
                        checkedIcon={<Favorite sx={{color: "red"}}/>}
                    />
                </IconButton>
                <IconButton aria-label="comment" onClick={openCommentDialogs}>
                    <Comment/>
                </IconButton>
            </CardActions>
            <CommentDialog
                open={showCommentDialogs}
                postInfo={{
                    id: 1,
                    title: '帖子标题',
                    content: postContent
                }}
                onClose={handleCloseDialog}
            />

        </Card>
    );
};


export default Post;
