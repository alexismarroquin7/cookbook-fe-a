import { Box, Button, Modal, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "../../components";
import { UserAction } from "../../store";

export const UnfollowUserModal = ({open, onClose}) => {
  const dispatch = useDispatch();
  const {user, auth} = useSelector(({user, auth}) => {
    return {user, auth}
  });
  
  return <Modal
    open={open}
    onClose={onClose}
  >
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        bgcolor: 'background.paper',
        borderRadius: '5px',
        boxShadow: 24,
        p: '1rem',
        display: 'flex',
        flexFlow: 'column wrap',
        gap: '1rem'
      }}
    >
      <Grid
        direction="row wrap"
        align="center"
        gap=".1rem"
      >
        <Typography>Are you sure you want to unfollow</Typography>
        <Typography color="error">@{user.item.username}</Typography>
        <Typography>?</Typography>
      </Grid>

      <Button
        variant="contained"
        color="error"
        onClick={() => {
          const [ user_follower ] = user.item.followers.filter(item => item.follower.user_id === auth.user.user_id);
          dispatch(UserAction.deleteFollowByUserFollowerId(user_follower.user_follower_id));
          onClose();
        }}
      >Unfollow</Button>
      
      <Button
        variant="outlined"
        onClick={onClose}
      >Cancel</Button>
    
    </Box>
  
  </Modal>
}