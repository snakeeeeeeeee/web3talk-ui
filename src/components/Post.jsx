import {Favorite, FavoriteBorder, MoreVert, Comment} from "@mui/icons-material";
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Checkbox,
    IconButton,
    Typography,
} from "@mui/material";
import React, {useState} from 'react';
import CommentDialog from "./CommentDialog";


const Post = ({postInfo}) => {
    /*const {
        id = 99999999,
        title = "Default Title",
        content = "Default Content",
        postTime = "2024-01-01 00:00:00",
        author = "",
        isLike = false
    } = postInfo;*/

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
                title={
                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                        {postInfo.title}
                    </Typography>
                }
                subheader={postInfo.postTime}
            />

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {postInfo.content}
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
                    id: postInfo.id,
                    title: postInfo.title,
                    content: postInfo.content
                }}
                onClose={handleCloseDialog}
            />

        </Card>
    );
};


export default Post;
