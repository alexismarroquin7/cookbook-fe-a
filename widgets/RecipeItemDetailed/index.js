// components
import { Grid } from "../../components";
import { Modal, Button, Box, Typography } from "@mui/material";
import Spinner from "react-svg-spinner";
import Link from "next/link";

// icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import CommentIcon from "@mui/icons-material/Comment"

// store
import { RecipeAction } from "../../store";

// hooks
import { useToggle } from "../../hooks";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// utils
import { getDurationText } from "../../utils";
import { Fraction } from "fractional";
import { useRouter } from "next/router";

const initialHidden = {
  ingredients: true,
  steps: true
}

export const RecipeItemDetailed = ({ recipe, status }) => {
  const {
    name,
    description,
    recipe_steps,
    recipe_ingredients,
    recipe_likes,
    servings,
    difficulty,
    prep_duration,
    cook_duration,
    user,
    recipe_tags,
    recipe_comments
  } = recipe;

  const router = useRouter();

  const { auth } = useSelector(({auth}) => {
    return {
      auth
    }
  })
  
  const [hidden, setHidden] = useState(initialHidden);
  
  const {active: open, toggleActive: toggleOpen} = useToggle();
  
  const dispatch = useDispatch();

  const toggleHidden = (key) => setHidden({
    ...hidden,
    [key]: !hidden[key]
  });

  return (
  <Grid
    width="100%"
    direction="column wrap"
  >

    <Grid
      width="100%"
      justify="space-between"
      align="center"
    >
      <h3>{name}</h3>
      {user.user_id === auth.user.user_id && (
        <Grid
          gap="1rem"
        >
          <Button
            variant="outlined"
            onClick={()=> {
              router.push(`/${router.query.username}/recipes/${router.query.recipe_id}/edit`);
            }}
          >Edit</Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              toggleOpen();
            }}
          >Delete</Button>
          <Modal
            open={open}
            onClose={toggleOpen}
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
                justifyContent: 'space-between',
                gap: '1rem'
              }}
            >

              <Typography
                variant="h6"
              >
                Are you sure you want to delete this recipe?
                {status.loading && <Spinner/>}
              </Typography>
            
              <Grid
                width="100%"
                gap="1rem"
              >
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  onClick={() => {
                    dispatch(RecipeAction.deleteByRecipeId(recipe.recipe_id));
                    router.push(`/${router.query.username}`)
                  }}
                >
                  Delete
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  onClick={toggleOpen}
                >
                  Cancel      
                </Button>
                
              </Grid>
            
            </Box>
          </Modal>
        </Grid>
      )}
    </Grid>

    
    <Grid
      gap="1rem"
      align="center"
    >
      <AccountCircleIcon/>
      
      <Grid
        direction="column wrap"
      >
        <Typography
          variant="h6"
        >{user.display_name}</Typography>
        <a
          href={`/${user.username}`}
          style={{
            textDecoration: 'underline'
          }}
        >@{user.username}</a>
      </Grid>

    </Grid>
    
    
    <Grid
      gap=".5rem"
      align="center"
    >
      
      {new Set(recipe_likes.map(rp_like => rp_like.user.user_id)).has(auth.user.user_id) ? (
        <FavoriteIcon 
          style={{
            color: "#fb3958"
          }}
          onClick={() => {
            const [ recipe_like ] = recipe_likes.filter(rp_like => rp_like.user.user_id === auth.user.user_id);
            dispatch(RecipeAction.removeLike(recipe_like.recipe_like_id));
          }}
        />
      
      ) : (
        <FavoriteBorderIcon
          style={{
            color: "#fb3958"
          }}
          
          onClick={() => {
            if(!auth.user.user_id) return;
            dispatch(RecipeAction.like({
              user_id: auth.user.user_id,
              recipe_id: recipe.recipe_id
            }));
          }}
        />
      
      )}
      
      <p>{recipe_likes.length} {`like${recipe_likes.length === 1 ? '' : 's'}`}</p>
    </Grid>

    <Grid
      align="center"
      gap=".5rem"
    >
      <Link
        href={`/${router.query.username}/recipes/${router.query.recipe_id}/comments`}
        passHref
      >
        <CommentIcon />
      </Link>
      <p>{recipe_comments.length} comments</p>
    </Grid>
    
    {description && <p>{description}</p>}
    
    <Grid
      width="100%"
      direction="column wrap"
      gap="1rem"
    >
      
      <Grid
        gap="1rem"
        align="center"  
      >
        <h4>PREP</h4>
        <HistoryToggleOffIcon/>
        <p>{getDurationText(prep_duration)}</p>
      </Grid>
      
      
      <Grid
        gap="1rem"
        align="center"  
      >
        <h4>COOK</h4>
        <AccessTimeIcon/>
        <p>{getDurationText(cook_duration)}</p>
      </Grid>

    </Grid>
    
    <Grid
      width="100%"
      direction="column wrap"
      gap="1rem"
    >
      
      <Grid
        gap="1rem"
        align="center"  
      >
        <h4>{`SERVING${servings === 1 ? '' : 'S'}`}</h4>
        <LocalDiningIcon/>
        <p>{servings}</p> 
      </Grid>



      <Grid
        gap="1rem"
        align="center"
      >
        <h4>DIFFICULTY</h4>
        <p>{difficulty.toUpperCase()}</p>
      </Grid>
    </Grid>

    <Grid
      width="100%"
    >
      
        
      <Grid
        width="100%"
        justify="space-between"
      >
        <Grid
          align="center"
          gap="1rem"
        >
          <button
            style={{
              backgroundColor: "white",
              border: '0',
              fontSize: '1.5rem',
              transform: `rotate(${hidden.ingredients ? '0' : '-45'}deg)`,
              transition: '.2s'
            }}
            onClick={() => {
              toggleHidden('ingredients');
            }}
          >+</button>
          <h4>Ingredients</h4>
        </Grid>

        <h4>{recipe_ingredients.length}</h4>
      </Grid>

      
      {!hidden.ingredients && (
        <ul
          style={{
            display: "flex",
            flexFlow: "column wrap",
            gap: "1rem"
          }}
        >
          {recipe_ingredients.map(rp_ing => {
            return (
            <Grid
              key={rp_ing.recipe_ingredient_id}
            >
              <li>{new Fraction(rp_ing.quantity).toString()} {rp_ing.measurement_unit.name} {rp_ing.ingredient.name}</li>
            </Grid>
            )
          })}
        </ul>
      )}
    </Grid>

    <Grid
      width="100%"
      justify="space-between"
      align="center"
    >
      <Grid
        gap="1rem"
        align="center"
      >
        <button
          style={{
            backgroundColor: 'white',
            border: '0',
            fontSize: '1.5rem',
            transform: `rotate(${hidden.steps ? '0' : '-45'}deg)`,
            transition: '.2s'
          }}
          onClick={() => {
            toggleHidden('steps');
          }}
        >+</button>
        <h4>Steps</h4>
      </Grid>

      <h4>{recipe_steps.length}</h4>
    </Grid>

    {!hidden.steps && (
      <ol
        style={{
          display: "flex",
          flexFlow: "column wrap",
          gap: "1rem"
        }}
      >
        {recipe_steps.map(rp_step => {
          return (
          <Grid
            key={rp_step.recipe_step_id}
          >
            <li>{rp_step.text}</li>
          </Grid>
          )
        })}
      </ol>
    )}

    <Grid
      width="100%"
      gap="1rem"
    >
      {recipe_tags.map(rp_tag => {
        return (
        <Grid
          key={rp_tag.recipe_tag_id}
          bgColor="#1976d2"
          color="white"
          borderRadius="5px"
          padding="0 .5rem"
        >

          <a
            href={`/explore?tag=${rp_tag.tag.text}`}
          >
            <Typography>#{rp_tag.tag.text}</Typography>
          </a>
        </Grid>
      )})}
    </Grid>
  </Grid>
  );
}