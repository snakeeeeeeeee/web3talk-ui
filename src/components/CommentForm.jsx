import React, {useState} from 'react';
import {InsertPhotoIcon, MoodIcon} from '@mui/icons-material';
import {DialogActions, IconButton, Button, TextField, Box} from '@mui/material';
//import {Picker} from 'emoji-picker-react';

const CommentForm = () => {
    const [commentText, setCommentText] = useState('');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

    const handleChooseEmoji = (event, emojiObject) => {
        setCommentText(prev => prev + emojiObject.emoji);
    };

    const handleToggleEmojiPicker = () => {
        setOpenEmojiPicker(prev => !prev);
    };

    const handleImageUpload = (event) => {
        // 打开文件选择对话框，让用户能够选择图片
        /* 逻辑待实现 */
    };

    const handleSubmit = () => {
        console.log("发布评论", commentText);
        // 提交评论逻辑（清空输入、关闭表情选择器等）
    };

    return (
        <Box>
            {/* 评论输入和操作 */}
            <DialogActions
                sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 4}}>
                <IconButton onClick={handleImageUpload} component="label">
                    <InsertPhotoIcon/>
                    <input
                        type="file"
                        hidden
                        onChange={(event) => {
                            // 处理图片文件上传
                        }}
                    />
                </IconButton>
                <IconButton onClick={handleToggleEmojiPicker}>
                    <MoodIcon/>
                </IconButton>
                <TextField
                    sx={{flexGrow: 1, margin: '0 8px'}}
                    placeholder="添加评论..."
                    multiline
                    variant="outlined"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    发布
                </Button>
            </DialogActions>

            {/* Emoji Picker */}
            {/*{openEmojiPicker && <Picker onEmojiClick={handleChooseEmoji}/>}*/}
        </Box>
    );
};

export default CommentForm;