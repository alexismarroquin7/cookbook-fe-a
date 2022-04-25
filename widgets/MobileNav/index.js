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
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const classes = {
  icon: {
    fontSize: '2rem'
  }
}

const initialSelected = 'home';

export const MobileNav = () => {
  const router = useRouter();
  const auth = useSelector(s => s.auth);
  
  const [selected, setSelected] = useState(initialSelected);

  useEffect(() => {
    const { route } = router;
    
    console.log('route',route)

    if(route.slice(0, 1) === '/'){
      setSelected('home');
    } else if(route.slice(0, 8) === '/explore'){
      setSelected('explore');
    } else if(route.slice(0, 15) === '/[username]/new'){
      setSelected('new');
    } else if(route.slice(0, 20) === '/[username]/activity'){
      setSelected('activity');
    } else if(route.slice(0, 11) === '/[username]'){
      setSelected('account');
    }

  }, [router, router.route]);

  return (
  <Section>
    <Grid
      width="100%"
      justify="space-between"
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
        }}
      />
      
      <SearchIcon
        sx={{
          ...classes.icon,
          color: selected === 'explore' ? '' : '#c9c9c9'
        }}
        onClick={() => {
          router.push('/explore');
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
        }}
      />
      
      {selected !== 'activity' ? (
        <FavoriteBorderIcon 
          sx={{
            ...classes.icon,
            color: '#c9c9c9'
          }}
          onClick={() => {
            if(!auth.loggedIn) return;
            router.push(`/${auth.user.username}/activity`);
          }}
        />
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
        }}
      />
    </Grid>
  </Section>
  )
}