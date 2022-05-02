import { Grid, Section } from "../../components";

import { 
  Home as HomeIcon,
  Search as SearchIcon,
  AddBox as AddBoxIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  AccountCircle as AccountCircleIcon
} from '@mui/icons-material';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Popover, Typography } from "@mui/material";
import { useToggle } from "../../hooks";
import { UserAction } from "../../store";

const classes = {
  icon: {
    fontSize: '2rem'
  }
}

const initialSelected = 'home';
const initialAnchorEl = null;

export const MobileNav = () => {
  const router = useRouter();
  const { auth, user } = useSelector(s => {
    return {
      auth: s.auth,
      user: s.user
    }
  });

  const [selected, setSelected] = useState(initialSelected);
  const [unread, setUnread] = useState(0);
  
  const dispatch = useDispatch();

  useEffect(() => {
    setUnread(user.feed.activity.list.filter(it => it.read === false).length)
    
    if(selected !== 'activity') return;
    
    user.feed.activity.list.forEach(item => {
      if(item.read === false) {

        if(item.type === 'recipe_like'){
          dispatch(UserAction.markRecipeLikeAsRead(item.recipe_like_id));
        
        } else if (item.type === 'recipe_comment'){
          dispatch(UserAction.markRecipeCommentAsRead(item.recipe_comment_id));
        }
      }
    });

  }, [dispatch, selected, user.feed])

  return (
  <Section>
    <Grid
      width="100%"
      justify="space-between"
      align="center"
      padding="1rem"
      position="fixed"
      bottom="0"
      bgColor="white"
      boxShadow="0px 0px 1px black"
    >
      <HomeIcon
        sx={{
          ...classes.icon,
          color: selected === 'home' ? '' : '#c9c9c9'
        }}
        onClick={() => {
          router.push('/');
          setSelected('home');
        }}
      />
      
      <SearchIcon
        sx={{
          ...classes.icon,
          color: selected === 'explore' ? '' : '#c9c9c9'
        }}
        onClick={() => {
          router.push('/explore');
          setSelected('explore');
        }}
      />
      
      <AddBoxIcon
        sx={{
          ...classes.icon,
          color: selected === 'new' ? '' : '#c9c9c9'
        }}
        onClick={() => {
          if(!auth.loggedIn) return;
          router.push(`/${auth.user.username}/new/recipe`);
          setSelected('new');
        }}
      />
      
      {selected !== 'activity' ? (
        <Grid
          direction="column wrap"
          align="center"
        >

          {unread > 0 && (
          <Grid
            bgColor="red"
            color="white"
            padding=".1rem .4rem"
            borderRadius="5px"
          >
            <Typography>{unread}</Typography>
          </Grid>
          )}

          <FavoriteBorderIcon
            id="mobile_nav__favorite_border_icon"
            sx={{
              ...classes.icon,
              color: '#c9c9c9'
            }}
            onClick={() => {
              if(!auth.loggedIn) return;
              router.push(`/${auth.user.username}/activity`);
              setSelected('activity');
            }}
          />
        
        </Grid>
      ) : (
        <FavoriteIcon 
          sx={classes.icon}
        />
      )}
      
      <AccountCircleIcon
        sx={{
          ...classes.icon,
          color: selected === 'account' ? '' : '#c9c9c9'
        }}
        onClick={() => {
          if(!auth.loggedIn) return;
          router.push(`/${auth.user.username}`);
          setSelected('account');
        }}
      />
    </Grid>
  </Section>
  )
}