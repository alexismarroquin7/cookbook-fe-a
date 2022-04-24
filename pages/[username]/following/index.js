import { Grid, Section } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { UserAction } from "../../../store";
import { AccountCircle, Search as SearchIcon } from "@mui/icons-material";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import Link from "next/link"
import { useForm } from "../../../hooks";

const initialFormValues = {
  query: ''
}

export default function UserFollowings() {
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

  const UserFollowingItem = ({
    user_following: {
      follow
    }
  }) => {
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
            {follow.display_name}
          </Typography>
        
          <Link
            href={`/${follow.username}`}
            passHref
          >  
            <a>@{follow.username}</a>
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
        fullWidth
        autoComplete="off"
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
        {values.query.length === 0 ? (
          user.item.following.map((item) => {
            return <UserFollowingItem 
              key={item.user_follower_id}
              user_following={item}
            />
          })
        ) : (
          user.item.following
          .filter((item) => {
            const r = new RegExp(values.query, 'i');
            const match = r.test(item.follow.username);
            return match;
          })
          .map((item) => {
            return <UserFollowingItem 
              key={item.user_follower_id}
              user_following={item}
            />
          })
        )}
      </Grid>
    </Section>
  )
}