import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Section } from "../../../../components"
import { RecipeAction } from "../../../../store";

import {
  AccountCircle as AccountCircleIcon,
  ArrowBack as ArrowBackIcon,
  MoreVert as MoreVertIcon
} from "@mui/icons-material";

import { Button, Menu, TextField } from "@mui/material";
import { useForm, useToggle } from "../../../../hooks";

const initialFormValues = {
  comment: ''
}

export default function RecipeComments() {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const { recipe, auth } = useSelector(s => {
    return {
      recipe: s.recipe,
      auth: s.auth
    }
  });

  useEffect(() => {
    if(!router.query.recipe_id) return;
    dispatch(RecipeAction.findByRecipeId(router.query.recipe_id))
  }, [dispatch, router.query.recipe_id]);

  const {values, handleChange, setValues} = useForm(initialFormValues);

  const { active: showCommentOptions, setActive: setShowCommentOptions } = useToggle();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRecipeCommentId, setSelectedRecipeCommentId] = useState(null);

  return (
  <Section
    padding="2rem 1rem 0 1rem"
  >
    <Grid
      width="100%"
    >
      <ArrowBackIcon
        onClick={() => {
          const { username, recipe_id } = router.query;
          router.push(`/${username}/recipes/${recipe_id}`);
        }}
      />
    </Grid>

    <Grid
      width="100%"
      padding="1rem 0"
    >
      <TextField
        placeholder="Type a comment"
        multiline
        fullWidth
        name="comment"
        value={values.comment}
        onChange={handleChange}
      ></TextField>
      <Button
        onClick={() => {
          if(values.comment.trim().length === 0) return;

          dispatch(
            RecipeAction.comment({
              recipe_id: Number(router.query.recipe_id),
              user_id: auth.user.user_id,
              text: values.comment.trim(),
            })
          )

          setValues(initialFormValues);

        }}
      >Comment</Button>
    </Grid>

    {Array.isArray(recipe.item.recipe_comments) &&
    recipe.item.recipe_comments.length > 0 &&
    recipe.item.recipe_comments.map((rp_com, i) => {
      const { comment, user } = rp_com;
      return (
      <Grid
        key={rp_com.recipe_comment_id}
        direction="column wrap"
        width="100%"
      >
        {i !== 0 && <Grid border="1px solid black" width="100%"></Grid>}

        <Grid
          width="100%"
          align="center"
          justify="space-between"
        >
          <Grid
            align="center"
            gap=".5rem"
          >
            <AccountCircleIcon/>
            <p>@{user.username}</p>
          </Grid>

          {
            recipe.item.user.user_id === auth.user.user_id || // recipe owned by user
            user.user_id === auth.user.user_id && // comment onwed by user
            <MoreVertIcon
              onClick={(e) => {
                setShowCommentOptions(true)
                setAnchorEl(e.currentTarget)
                setSelectedRecipeCommentId(rp_com.recipe_comment_id);
              }}
            />
          }

          <Menu
            open={showCommentOptions}
            onClose={() => {
              setShowCommentOptions(false)
              setAnchorEl(null);
              setSelectedRecipeCommentId(null);
            }}
            anchorEl={anchorEl}
          >
            
            <Button
              color="error"
              onClick={() => {
                dispatch(RecipeAction.deleteComment(selectedRecipeCommentId))
                setShowCommentOptions(false)
                setAnchorEl(null);
                setSelectedRecipeCommentId(null);
              }}
            >Delete</Button>
            
          </Menu>

        </Grid>

        <p>{comment.text}</p>
        
      </Grid>
      )
    })}
  </Section>
  )
}