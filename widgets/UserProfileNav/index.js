import { Typography } from "@mui/material"
import { Grid } from "../../components"
import {
  Settings as SettingsIcon
} from '@mui/icons-material';

export const UserProfileNav = ({user}) => {
  
  return (
  <Grid
    boxShadow="0px 0px 1px black"
    width="100%"
    position="absolute"
    justify="center"
  >
    <Grid
      width="90%"
      >
      <Grid
        width="40%"
      >
        <SettingsIcon />
      </Grid>
      
      <Typography>{user.username}</Typography>

    </Grid>
  </Grid>
  )
}