import React, {useContext, useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    IconButton,
    List,
    useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MoodIcon from '@mui/icons-material/Mood';
import CircularProgress from '@mui/material/CircularProgress';
import EmojiPicker from 'emoji-picker-react';
import CommentList from "./CommentList";
import {ToastContext} from "../App";

const CommentDialog = ({open = false, onClose, postInfo}) => {
    const theme = useTheme();
    const {
        id = 1,
        title = '默认标题',
        content = '默认内容'
    } = postInfo;

    const handleClose = () => {
        onClose && onClose();
        // 清空输入框
        setCommentText("");
        setIsPublishing(false); // 隐藏加载动画
    };

    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [refreshCommentsTrigger, setRefreshCommentsTrigger] = useState(0);
    const [isPublishing, setIsPublishing] = useState(false);

    // toast
    const {toastConfig, msg, setToastConfig} = useContext(ToastContext);

    const onEmojiClick = (emojiObject) => {
        console.log(emojiObject);
        setIsPublishing(true); // 开始发布，展示加载动画
        setCommentText(commentText + emojiObject.emoji);
        setOpenEmojiPicker(false);// 关闭表情
    };

    const handleEmojiPickerHideShow = () => {
        setOpenEmojiPicker(!openEmojiPicker);
    };


    const publishComment = () => {
        console.log(`发布的评论内容是：${commentText}`)
        // 清除文本内容
        setCommentText("");
        // 添加评论接口,模拟延时
        //setIsPublishing(true); //  开始发布，展示加载动画
        //setIsPublishing(false); // 隐藏加载动画
        console.log("发成功....");
        setToastConfig({toastOpen: true, msg: "回复成功!"})
        // 重新加载评论列表
        setRefreshCommentsTrigger(refreshCommentsTrigger + 1);

        // 关闭对话框
        onClose && onClose();


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
                <List sx={{overflowY: 'auto', maxHeight: 300, paddingRight: 4}}>
                    <CommentList apiUrl="/api/comments" refreshComments={refreshCommentsTrigger}/>
                </List>
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
                    placeholder="添加评论..."
                    multiline
                    variant="outlined"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={publishComment} disabled={isPublishing}>
                    {isPublishing ? <CircularProgress size={24}/> : '发布'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CommentDialog;