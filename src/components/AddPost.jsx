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
import React, {useState} from "react";
import {
    Add as AddIcon,
    DateRange,
    EmojiEmotions,
    Image,
    PersonAdd,
    VideoCameraBack,
} from "@mui/icons-material";
import {Box} from "@mui/system";
import MoodIcon from "@mui/icons-material/Mood";
import EmojiPicker from "emoji-picker-react";

const SytledModal = styled(Modal)({
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


    const [postText, setPostText] = useState("");
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('');
    const [isPublishing, setIsPublishing] = useState(true);
    const onEmojiClick = (emojiObject) => {
        console.log(emojiObject);
        setPostText(postText + emojiObject.emoji);
        setOpenEmojiPicker(false);// 关闭表情
    };

    const handleEmojiPickerHideShow = () => {
        setOpenEmojiPicker(!openEmojiPicker);
    };


    const validatePostContent = (content) => {
        // 检查文本是否为空
        if (!content.trim()) {
            setError(true);
            setHelperText('内容不能为空');
            return false;
        } else {
            setError(false);
            setHelperText('');
            return true
        }
    }

    const onChange = (e) => {
        const value = e.target.value;
        validatePostContent(postText)
        setPostText(value);
        console.log(value)
    }

    const onPublishPost = () => {
        console.log(`开始发布评论内容是：${postText}`)
        let validate = validatePostContent(postText)
        if (!validate) {
            return
        }

        // 开始发布，展示加载动画
        setIsPublishing(false);

        //  调用后端接口

        // 调用后端接口

        // 调用发布接口，完成后将发布状态重置
        setIsPublishing(true)

        console.log(`完成发布评论....${postText}`)
        // 清理内容
        setPostText("");
        setOpen(false);

    }

    return (
        <>
            <Tooltip
                onClick={(e) => setOpen(true)}
                title="Delete"
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
            <SytledModal
                open={open}
                onClose={(e) => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    width={600}
                    height={300}
                    bgcolor={"background.default"}
                    color={"text.primary"}
                    p={3}
                    borderRadius={5}
                >
                    <Typography variant="h6" color="gray" textAlign="center">
                        Create post
                    </Typography>
                    <UserBox>
                        <Avatar
                            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            sx={{width: 30, height: 30}}
                        />
                        <Typography fontWeight={500} variant="span">
                            John Doe
                        </Typography>
                    </UserBox>
                    <TextField
                        sx={{width: "100%"}}
                        id="standard-multiline-static"
                        multiline
                        rows={3}
                        placeholder="What's on your mind?"
                        variant="standard"
                        value={postText}
                        onChange={onChange}
                        error={error}
                        helperText={helperText}
                    />
                    <Stack direction="row" gap={1} mt={2} mb={3}>
                        <IconButton onClick={handleEmojiPickerHideShow}>
                            <MoodIcon/>
                        </IconButton>
                        {openEmojiPicker &&
                            <EmojiPicker
                                onEmojiClick={onEmojiClick}
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
            </SytledModal>
        </>
    );
};

export default AddPost;
