
// components
import { Grid, Section } from "../components";

// widgets
import { RecipeList } from "../widgets";

// hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RecipeAction } from "../store";
import { Button, InputAdornment, TextField } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useForm } from "../hooks";
import { useRouter } from "next/router";

export default function Explore() {
  
  const recipe = useSelector(s => s.recipe);
  const dispatch = useDispatch();
  const router = useRouter();
  
  const [query, setQuery] = useState({
    name: '',
    tag: ''
  })

  useEffect(() => {
    if(router.query.name){
      setQuery(q => {
        return {
          ...q,
          name: router.query.name
        }
      });
    }
    
    if(router.query.tag){
      setQuery(q => {
        return {
          ...q,
          tag: router.query.tag
        }
      });
    }
  
  }, [router.query.name, router.query.tag]);
  
  useEffect(() => {
    dispatch(RecipeAction.findAll(query));
  }, [dispatch, query]);


  const {values, handleChange} = useForm({query: ''});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!values.query) return;
    
    if(values.query[0] === '#'){
      router.push(`/explore?tag=${values.query.slice(1, values.query.length)}`)
    } else {
      router.push(`/explore?name=${values.query}`)
    }

  }

  return (
    <Section>
      <h3>Explore</h3>
      
      <Grid
        width="100%"
      >
        <Grid
          width="80%"        
        >
          <TextField
            placeholder="Search by name or #tag"
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
        </Grid>
        
        <Grid
          width="20%"
        >
          <Button
            type="submit"
            variant="contained"  
            sx={{
              height: '3.5rem'
            }}
            onClick={handleSubmit}
          >
            <SearchIcon />
          </Button>
        </Grid>
      </Grid>
      

      {recipe.list.length > 0 && <RecipeList recipes={recipe.list}/>}
    </Section>
  )
}