
// components
import { Section, Grid } from "../../../components";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Typography, InputAdornment } from "@material-ui/core";
import { TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Link from "next/link"

// store
import { UserAction } from "../../../store";

// hooks
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../../hooks";

const initialFormValues = {
  query: ''
}

export default function UserFollowers() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector(s => {
    return {
      user: s.user
    }
  });

  useEffect(() => {
    if(!router.query.username) return;
    dispatch(UserAction.findByUsername(router.query.username));
  }, [dispatch, router.query.username]);

  const { values, handleChange } = useForm(initialFormValues);

  const UserFollowerItem = ({user_follower: {follower}}) => {
    return (
    <Grid
      align="center"
      gap="1rem"
      border="1px solid black"
      borderRadius="5px"
      padding="1rem"
      width="100%"
      justify="space-between"
    >
      <Grid
        align="center"
        gap="1rem"
      >
        <AccountCircle/>
      
        <Grid
          direction="column wrap"
        >
          <Typography
            variant="h6"
          >
            {follower.display_name}
          </Typography>
        
          <Link
            href={`/${follower.username}`}
            passHref
          >  
            <a>@{follower.username}</a>
          </Link>
        </Grid>
      </Grid>

    </Grid>
    )
  }
  
  return (
    <Section
      gap="1rem"
      margin="2rem 0"
    >

      <TextField
        placeholder="Search"
        name="query"
        value={values.query}
        onChange={handleChange}
        autoComplete="off"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      >
      </TextField>
      
      <Grid
        width="100%"
        direction="column wrap"
        gap="1rem"
      >
        {values.query.length === 0 ?
        user.item.followers.map((item) => {
          return <UserFollowerItem key={item.user_follower_id} user_follower={item}/>
        }) : (
          user.item.followers
          .filter((item) => {
            const r = new RegExp(values.query, 'i');
            const match = r.test(item.follower.username);
            return match;
          })
          .map((item) => {
            return <UserFollowerItem key={item.user_follower_id} user_follower={item}/>
          })
        )}
      </Grid>

    </Section>
  )

}