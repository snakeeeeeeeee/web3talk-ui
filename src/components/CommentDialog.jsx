import React, {useContext, useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    IconButton,
    useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MoodIcon from '@mui/icons-material/Mood';
import CircularProgress from '@mui/material/CircularProgress';
import EmojiPicker from 'emoji-picker-react';
import CommentList from "./CommentList";
import {ToastContext} from "../App";
import http from "../web3talkRpc";
import { v4 as uuidv4 } from 'uuid';


const CommentDialog = ({open = false, onClose, postInfo}) => {
    const theme = useTheme();
    const handleClose = () => {
        onClose && onClose();
        // 清空输入框
        setCommentText("");
        setIsPublishing(false); // 隐藏加载动画
    };

    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [refreshCommentsKey, setRefreshCommentsKey] = useState("");
    const [isPublishing, setIsPublishing] = useState(false);

    // toast
    const {toastConfig, msg, setToastConfig} = useContext(ToastContext);

    const onEmojiClick = (emojiObject) => {
        console.log(emojiObject);
        //setIsPublishing(true); // 开始发布，展示加载动画
        setCommentText(commentText + emojiObject.emoji);
        setOpenEmojiPicker(false);// 关闭表情
    };

    const handleEmojiPickerHideShow = () => {
        setOpenEmojiPicker(!openEmojiPicker);
    };


    const publishComment = () => {
        console.log(`发布的评论内容是：${commentText}`)

        // 添加评论接口,模拟延时

        let reqBody = {
            "currentAddress": window.localStorage.getItem("userWalletAddress"),
            "content": commentText,
            "targetId": postInfo.id,
            "type": 0
        }
        let config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        // 开始发布
        setIsPublishing(true)
        http.post("/api/v1/comment/add", reqBody, config).then(response => {
            if (response.data.code === "000000") {
                // 清理内容
                setCommentText("");
                // 发布成功，弹出toast
                setToastConfig({toastOpen: true, msg: "Comment Success!"})
                // 重新加载评论列表
                setRefreshCommentsKey(uuidv4());
                // 关闭对话框
                //onClose && onClose();
            }
        }).catch(error => {
            setToastConfig({toastOpen: true, msg: "Comment Fail!"})
            console.log(error);
        }).finally(() => {
            // 调用发布接口，完成后将发布状态重置
            setIsPublishing(false)
        });


    };

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="custom-dialog-title"
            open={open}
            fullWidth
            maxWidth="md"
            sx={{
                '& .MuiDialog-paper': {
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative'
                }
            }}
        >
            {/* 顶部：帖子的正文内容 */}
            <DialogTitle id="custom-dialog-title" sx={{wordWrap: 'break-word'}}>
                {postInfo.content}
            </DialogTitle>

            {/* 右边部分：关闭按钮 */}
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                    zIndex: 1,
                }}
            >
                <CloseIcon/>
            </IconButton>

            {/* 中间部分：评论的内容信息，以卡片形式展示 */}
            <DialogContent dividers>
                <CommentList targetId={postInfo.id} refreshCommentsKey={refreshCommentsKey}/>
            </DialogContent>

            {/* 底部：发布评论的对话框 */}
            <DialogActions
                sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 4}}>
                <IconButton onClick={handleEmojiPickerHideShow}>
                    <MoodIcon/>
                </IconButton>
                {openEmojiPicker &&
                    <EmojiPicker
                        onEmojiClick={onEmojiClick}
                    />
                }
                <TextField
                    sx={{flexGrow: 1}}
                    placeholder="Add Comment..."
                    multiline
                    variant="outlined"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={publishComment} disabled={isPublishing}>
                    {isPublishing ? <CircularProgress size={24}/> : 'Publish'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CommentDialog;