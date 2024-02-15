import {
    Avatar,
    Button,
    ButtonGroup,
    Fab, IconButton,
    Modal,
    Stack,
    styled,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import React, {useContext, useState, useEffect} from "react";
import {
    Add as AddIcon
} from "@mui/icons-material";
import {Box} from "@mui/system";
import MoodIcon from "@mui/icons-material/Mood";
import EmojiPicker from "emoji-picker-react";
import {ToastContext, LoginContext} from '../App';
import CloseIcon from "@mui/icons-material/Close";
import http from '../web3talkRpc';


const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

const UserBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
});

const AddPost = () => {
    const [open, setOpen] = useState(false);
    const [postContentText, setPostContentText] = useState("");
    const [postTitleText, setPostTitleText] = useState("");
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [contentError, setContentError] = useState(false);
    const [titleError, setTitleError] = useState(false);
    const [contentHelperText, setContentHelperText] = useState('');
    const [titleHelperText, setTitleHelperText] = useState('');
    const [isPublishing, setIsPublishing] = useState(true);

    // is Login
    const {loginConfig, setLoginConfig} = useContext(LoginContext);
    // toast
    const {toastConfig, msg, setToastConfig} = useContext(ToastContext);

    const handleCloseToast = () => {
        setToastConfig({toastOpen: false});
    };

    const onContentEmojiClick = (emojiObject) => {
        setPostContentText(postContentText + emojiObject.emoji);
        setOpenEmojiPicker(false);// 关闭表情
    };

    const handleEmojiPickerHideShow = () => {
        setOpenEmojiPicker(!openEmojiPicker);
    };

    const validatePostTitle = (content) => {
        // 检查文本是否为空
        if (!content.trim()) {
            setTitleError(true);
            setTitleHelperText('The title cannot be empty～');
            return false;
        } else {
            setTitleError(false);
            setTitleHelperText('');
            return true
        }
    }

    const validatePostContent = (content) => {
        // 检查文本是否为空
        if (!content.trim()) {
            setContentError(true);
            setContentHelperText('The content cannot be empty～');
            return false;
        } else {
            setContentError(false);
            setContentHelperText('');
            return true
        }
    }

    const onChangeTitle = (e) => {
        const value = e.target.value;
        validatePostTitle(postTitleText)
        setPostTitleText(value);
    }

    const onChangeContent = (e) => {
        const value = e.target.value;
        validatePostContent(postContentText)
        setPostContentText(value);
    }


    const onPublishPost = () => {
        let validateContent = validatePostContent(postContentText)
        let validateTitle = validatePostTitle(postTitleText)
        if (!validateTitle && !validateContent) {
            return
        }

        // 开始发布，展示加载动画
        setIsPublishing(false);
        let reqBody = {
            "address": window.localStorage.getItem("userWalletAddress"),
            "title": postTitleText,
            "content": postContentText
        }
        let config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        http.post("/api/v1/post/add", reqBody, config).then(response => {
            if (response.data.code === "000000") {
                // 清理内容
                setPostContentText("");
                setPostTitleText("");
                setOpen(false);
                // 发布成功，弹出toast
                setToastConfig({toastOpen: true, msg: "Publish Success!"})
            }
        }).catch(error => {
            setToastConfig({toastOpen: true, msg: "Publish Fail!"})
            console.log(error);
        }).finally(() => {
            // 调用发布接口，完成后将发布状态重置
            setIsPublishing(true)
            // 刷新整个window，临时方法
            window.location.reload();
        });

    }

    return (
        <>
            <Tooltip
                onClick={(e) => setOpen(true)}
                title="Post"
                sx={{
                    position: "fixed",
                    bottom: 20,
                    left: {xs: "calc(50% - 25px)", md: 30},
                }}
            >

                <Fab color="primary" aria-label="add">
                    <AddIcon/>
                </Fab>
            </Tooltip>
            <StyledModal
                open={open}
                onClose={(e) => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    width={600}
                    height={500}
                    bgcolor={"background.default"}
                    color={"text.primary"}
                    p={3}
                    borderRadius={5}
                    style={{position: 'relative'}}
                >
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={(e) => setOpen(false)}
                        aria-label="close"
                        style={{position: 'absolute', top: -5, right: 10}}
                    >
                        <CloseIcon/>
                    </IconButton>

                    <Typography variant="h6" color="gray" textAlign="center">
                        Create post
                    </Typography>
                    <UserBox>
                        <Avatar
                            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            sx={{width: 30, height: 30}}
                        />
                        <Typography fontWeight={500} variant="span">
                            {/*John Doe*/}
                            0x...
                        </Typography>
                    </UserBox>
                    <TextField
                        sx={{width: "100%"}}
                        id="standard-multiline-static"
                        multiline
                        rows={1}
                        placeholder="Take a title?"
                        variant="standard"
                        value={postTitleText}
                        onChange={onChangeTitle}
                        error={titleError}
                        helperText={titleHelperText}
                    />
                    <TextField
                        sx={{width: "100%"}}
                        id="standard-multiline-static"
                        multiline
                        rows={9}
                        placeholder="What's on your mind?"
                        variant="standard"
                        value={postContentText}
                        onChange={onChangeContent}
                        error={contentError}
                        helperText={contentHelperText}
                    />
                    <Stack direction="row" gap={1} mt={2} mb={3}>
                        <IconButton onClick={handleEmojiPickerHideShow}>
                            <MoodIcon/>
                        </IconButton>
                        {openEmojiPicker &&
                            <EmojiPicker
                                onEmojiClick={onContentEmojiClick}
                            />
                        }
                    </Stack>
                    <ButtonGroup
                        fullWidth
                        variant="contained"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={onPublishPost}>Post</Button>
                    </ButtonGroup>
                </Box>
            </StyledModal>
        </>
    );
};

export default AddPost;
