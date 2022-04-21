import { v4 as uuid } from "uuid";

// components
import { Form, Grid } from "../../components"
import { TextField, Typography, MenuItem, Button } from "@mui/material";

// hooks
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocalStorage } from "../../hooks";

// utils
import { axiosInstance as axios } from "../../utils";
import { RecipeAction } from "../../store/actions/recipe-actions";

const NAME = {
  name: "name",
  description: "description",
  servings: "servings",
  cuisine_type: "cuisine_type",
  difficulty: "difficulty",
  tag: 'tag',
  prep_duration_hours: "prep_duration_hours",
  prep_duration_minutes: "prep_duration_minutes",
  cook_duration_hours: "cook_duration_hours",
  cook_duration_minutes: "cook_duration_minutes",
  steps: "steps",
  ingredients: 'ingredients',
  measurement_unit: "measurement_unit",
  quantity: 'quantity'
}

const initialOptions = {
  cuisine_types: [],
  tags: [],
  measurement_units: [],
  ingredients: [],
  difficulty: [
    {
      id: uuid(),
      value: 'easy'
    },
    {
      id: uuid(),
      value: 'intermediate'
    },
    {
      id: uuid(),
      value: 'hard'
    }
  ]
}

export const RecipeForm = ({ initialValues }) => {
  
  const router = useRouter();
  const dispatch = useDispatch();

  const [values, setValues] = useState(initialValues);
  const [options, setOptions] = useState(initialOptions);

  const [storedUser] = useLocalStorage('user', { user_id: null });

  useEffect(() => {
    const fetchCuisineTypeOptions = async () => {
      try {
        const res = await axios().get('/cuisine_types');
        setOptions(o => {
          return {
            ...o,
            cuisine_types: res.data
          }
        })
      } catch (err) {
        console.log(err);
      }
    }

    const fetchIngredientOptions = async () => {
      try {
        const res = await axios().get('/ingredients');
        setOptions(o => {
          return {
            ...o,
            ingredients: res.data
          }
        })
      } catch (err) {
        console.log(err);
      }
    }

    const fetchMeasurementUnitOptions = async () => {
      try {
        const res = await axios().get('/measurement_units');
        setOptions(o => {
          return {
            ...o,
            measurement_units: res.data
          }
        })
      } catch (err) {
        console.log(err);
      }
    }

    const fetchOptions = async () => {
      await fetchCuisineTypeOptions();
      await fetchIngredientOptions();
      await fetchMeasurementUnitOptions();
    }
    
    fetchOptions();
  }, []);
  
  useEffect(() => console.log('values', values), [values])

  const handleChange = e => {
    const { name, value } = e.target;

    switch(name){
      case NAME.name:
        return setValues({
          ...values,
          [name]: value
        });
      
      case NAME.description:
        return setValues({
          ...values,
          description: value
        });
      
      case NAME.cuisine_type:
        return setValues({
          ...values,
          cuisine_type: value
        });
      
      case NAME.difficulty:
        return setValues({
          ...values,
          difficulty: value
        })

      case NAME.prep_duration_hours:
        return setValues({
          ...values,
          prep_duration: {
            ...values.prep_duration,
            hours: value
          }
        });
      
      case NAME.prep_duration_minutes:
        return setValues({
          ...values,
          prep_duration: {
            ...values.prep_duration,
            minutes: value
          }
        });
      
      case NAME.cook_duration_hours:
        return setValues({
          ...values,
          cook_duration: {
            ...values.cook_duration,
            hours: value
          }
        });
      
      case NAME.cook_duration_minutes:
        return setValues({
          ...values,
          cook_duration: {
            ...values.cook_duration,
            minutes: value
          }
        });
      
      case NAME.servings:
        return setValues({
          ...values,
          servings: value
        });    
      
      case NAME.ingredients:
        return setValues({
          ...values,
          ingredients: values.ingredients.map(ing => {
            if(ing.id === e.target.id){
              ing.name = value;
            }
            return ing;
          })
        })
      
      case NAME.steps:
        return setValues({
          ...values,
          steps: values.steps.map(step => {
            if(step.id === e.target.id){
              step.text = value;
            }
            return step;
          })
        });

      case NAME.measurement_unit:
        return setValues({
          ...values,
          ingredients: values.ingredients.map(ing => {
            if(ing.id === e.target.id){
              ing.measurement_unit = value;
            }
            return ing;
          })
        })

      case NAME.quantity:
        return setValues({
          ...values,
          ingredients: values.ingredients.map(ing => {
            if(ing.id === e.target.id){
              ing.quantity = value;
            }
            return ing;
          })
        })
      
      case NAME.tag:
        return setValues({
          ...values,
          tag: value
        });

      default:
        throw Error(`unknown name: ${name}`);
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    
    const validFormValues = () => {
      let valid = true;

      if(
        values.name.trim().length === 0 ||
        values.description.trim().length === 0 ||
        values.cuisine_type.trim().length === 0 ||
        values.difficulty.trim().length === 0 ||
        Number(values.servings) === 0 ||
        values.ingredients.length === 0 ||
        values.steps.length === 0
      ){
        valid = false;
        
      }
      
      values.ingredients.forEach((ing, i) => {
        if(
          ing.name.trim().length === 0 ||
          ing.measurement_unit.trim().length === 0 ||
          Number(ing.quantity) === 0 ||
          ing.index !== i
        ){
          valid = false;
        }
      });
      
      values.steps.forEach((step, i) => {
        if(
          step.text.trim().length === 0 ||
          step.index !== i
        ){
          valid = false;
        }
      });
      
      values.tags.forEach((tag, i) => {
        if(
          tag.text.trim().length === 0 ||
          tag.index !== i
        ){
          valid = false;
        }
      });
      
      return valid;
    }

    if(!validFormValues()) return;

    const newRecipe = {
      name: values.name.trim(),
      description: values.description.trim(),
      cuisine_type: {
        name: values.cuisine_type
      },
      difficulty: values.difficulty,
      prep_duration: {
        hours: Number(values.prep_duration.hours),
        minutes: Number(values.prep_duration.minutes)
      },
      cook_duration: {
        hours: Number(values.cook_duration.hours),
        minutes: Number(values.cook_duration.minutes)
      },
      servings: Number(values.servings),
      ingredients: values.ingredients.map(ing => {
        return {
          ...ing,
          quantity: Number(ing.quantity)
        }
      }),
      steps: values.steps.map(step => {
        return {
          ...step,
          text: step.text.trim()
        }
      }),
      tags: values.tags,
      user_id: storedUser.user_id
    }

    if(router.query.recipe_id){
      dispatch(RecipeAction.updateByRecipeId(router.query.recipe_id, newRecipe));
      router.push(`/${router.query.username}/recipes/${router.query.recipe_id}`);

    } else {

      dispatch(RecipeAction.create(newRecipe));
    }
  }

  return (
  <Form
    width="100%"
    padding="2rem 0"
    gap="2rem"
    onSubmit={handleSubmit}
  >
    {/* NAME */}
    <Grid
      width="100%"
      gap="1rem"
    >
      <Grid
        align="flex-end"
      >
        <Typography
          variant="h6"
        >Name</Typography>
        <p 
          style={{
            color: "red"
          }}
        >*</p>
      </Grid>
      <TextField
        onChange={handleChange}
        type="text"
        label="Name"
        name={NAME.name}
        value={values.name}
        fullWidth
        required
      />
    </Grid>

    {/* DESCRIPTION */}
    <Grid
      width="100%"
      gap="1rem"
    >
      <Grid
        align="flex-end"
      >
        <Typography
          variant="h6"
        >Description</Typography>
        <p 
          style={{
            color: "red"
          }}
        >*</p>
      </Grid>
      <TextField
        onChange={handleChange}
        type="text"
        label="Description"
        name={NAME.description}
        value={values.description}
        multiline
        fullWidth
        required
      />    
    </Grid>

    {/* CUISINE_TYPE */}
    <Grid
      width="100%"
      gap="1rem"
    >
      <Grid
        width="100%"
      >
        <Grid
          align="flex-end"
        >
          <Typography
            variant="h6"
          >Cuisine Type</Typography>
          <p
            style={{
              color: "red"
            }}
          >*</p>
        </Grid>
      </Grid>
      
      <Grid
        width="50%"
      >
        <TextField
          select
          label="Cuisine Type"
          value={values.cuisine_type}
          onChange={handleChange}
          name={NAME.cuisine_type}
          fullWidth
          required
        >
          {options.cuisine_types.map(cuisine_type => {
            return (
            <MenuItem
              key={cuisine_type.cuisine_type_id}
              value={cuisine_type.name}
            >
              {cuisine_type.name}
            </MenuItem>
            )
          })}

        </TextField>
      </Grid>
    </Grid>

    {/* DIFFICULTY */}
    <Grid
      width="100%"
      gap="1rem"
    >
      <Grid
        width="100%"
      >
        <Grid
          align="flex-end"
        >
          <Typography
            variant="h6"
          >Difficulty</Typography>
          <p
            style={{
              color: "red"
            }}
          >*</p>
        </Grid>
      </Grid>
      
      <Grid
        width="50%"
      >
        <TextField
          select
          label="Difficulty"
          value={values.difficulty}
          onChange={handleChange}
          name={NAME.difficulty}
          fullWidth
          required
        >
          {options.difficulty.map(d => {
            return (
            <MenuItem
              key={d.id}
              value={d.value}
            >
              {d.value}
            </MenuItem>
            )
          })}

        </TextField>
      </Grid>
    </Grid>
    
    {/* PREP DURATION */}
    <Grid
      width="100%"
      gap="1rem"
      direction="column wrap"
    >
      <Grid
        align="flex-end"
      >
        <Typography
          variant="h6"
        >Prep Duration</Typography>
        <p
          style={{
            color: "red"
          }}
        >*</p>
      </Grid>
      <Grid 
        gap="1rem"
      >

        <Grid
          width="20%"
        >
          <TextField
            onChange={handleChange}
            type="number"
            label="Hours"
            name={NAME.prep_duration_hours}
            value={values.prep_duration.hours}
            fullWidth
            required
          />
        </Grid>
        
        <Grid
          width="20%"
        >
          <TextField
            onChange={handleChange}
            type="number"
            label="Minutes"
            name={NAME.prep_duration_minutes}
            value={values.prep_duration.minutes}
            fullWidth
            required
          />
        </Grid>

      </Grid>
    </Grid>
    
    {/* COOK DURATION */}
    <Grid
      width="100%"
      gap="1rem"
      direction="column wrap"
    >
      <Grid
        align="flex-end"
      >
        <Typography
          variant="h6"
        >Cook Duration</Typography>
        <p
          style={{
            color: "red"
          }}
        >*</p>
      </Grid>

      <Grid
        gap="1rem"
      >
        <Grid
          width="20%"
        >
          <TextField
            onChange={handleChange}
            type="number"
            label="Hours"
            name={NAME.cook_duration_hours}
            value={values.cook_duration.hours}
            fullWidth
            required
          />
        </Grid>
        
        <Grid
          width="20%"
        >
          <TextField
            onChange={handleChange}
            type="number"
            label="Minutes"
            name={NAME.cook_duration_minutes}
            value={values.cook_duration.minutes}
            required
          />
        </Grid>
      </Grid>
    </Grid>

    {/* SERVINGS */}
    <Grid
      width="100%"
      gap="1rem"
    >
      <Grid
        width="100%"
      >
        <Grid
          align="flex-end"
        >
          <Typography
            variant="h6"
          >Servings</Typography>
          <p
            style={{
              color: "red"
            }}
          >*</p>
        </Grid>
      </Grid>

      <Grid
        width="5rem"
      >
        <TextField
          onChange={handleChange}
          type="number"
          label="Servings"
          name={NAME.servings}
          value={values.servings}
          fullWidth
          required
        />    
      </Grid>

    </Grid>
    
    {/* INGREDIENTS */}
    <Grid
      width="100%"
      gap="1rem"
    >
      <Typography
        width={"100%"}
        variant="h6"
      >Ingredients</Typography>

      <Grid
        width="100%"
        direction="column wrap"
        gap="1rem"
      >
        {values.ingredients.map((ingredient, i) => {
          return (
          <Grid
            key={ingredient.id}
            width="100%"
            gap="1rem"
          >
            <Grid
              width="5rem"
            >
              <TextField
                label="Quantity"
                type="number"
                name={NAME.quantity}
                value={ingredient.quantity}
                id={ingredient.id}
                onChange={handleChange}
                required
              ></TextField>
            </Grid>

            <Grid
              width="10rem"
            >
              <TextField
                select
                label="Measurement"
                value={ingredient.measurement_unit}
                name={NAME.measurement_unit}
                onChange={(e) => {
                  handleChange({
                    ...e,
                    target: {
                      ...e.target,
                      id: ingredient.id
                    }
                  })
                }}
                fullWidth
                required
              >
                {options.measurement_units.map(m => {
                  return (
                    <MenuItem
                      key={m.measurement_unit_id}
                      value={m.name}
                    >
                      {m.name}
                    </MenuItem>
                  )
                })}

              </TextField>
            </Grid>
            
            <Grid
              width="10%"
            >
              <Button 
                color="error"
                variant="contained"
                onClick={() => {
                  setValues({
                    ...values,
                    ingredients: values.ingredients
                    .filter(ing => ing.id !== ingredient.id)
                    .map((ing, i) => {
                      return {
                        ...ing,
                        index: i
                      }
                    })
                  })
                }}
                fullWidth
              >x</Button>
            </Grid>

            <Grid
              width="100%"
            >

              <TextField
                select
                label={`Ingredient ${i+1}`}
                name={NAME.ingredients}
                value={ingredient.name}
                onChange={(e) => {
                  handleChange({
                    ...e,
                    target: {
                      ...e.target,
                      id: ingredient.id
                    }
                  })}
                }
                fullWidth
                required
              >
                {options.ingredients.map(ing => {

                  return (
                  <MenuItem
                    key={ing.ingredient_id}
                    value={ing.name}
                  >
                    <Grid
                      gap="1rem"
                      align="center"
                    >
                      {ing.name}  
                    
                      <Grid
                        border="1px solid black"
                        borderRadius="5px"
                        padding="0 .5rem"
                      >{ing.ingredient_type.name}</Grid>
                    </Grid>
                  </MenuItem>
                  )
                })}

              </TextField>
            </Grid>

            
          </Grid>
          )
        })}
      </Grid>
      
      <Button
        onClick={() => {
          const len = values.ingredients.length;
          setValues({
            ...values,
            ingredients: [
              ...values.ingredients,
              {
                id: uuid(),
                name: '',
                measurement_unit: '',
                quantity: 0,
                index: len
              } 
            ]
          });
        }}
        variant="contained"
        fullWidth
      >+ INGREDIENT</Button>
    </Grid>

    {/* STEPS */}
    <Grid
      width="100%"
      gap="1rem"
    >
      <Typography
        width={"100%"}
        variant="h6"
      >Steps</Typography>

      <Grid
        width="100%"
        direction="column wrap"
        gap="1rem"
      >
        {values.steps.map((step, i) => {
          return (
          <Grid
            key={step.id}
            width="100%"
            justify="space-between"
          >
            <Grid
              width="32rem"
            >
              <TextField
                name={NAME.steps}
                label={`step ${i+1}`}
                id={step.id}
                value={step.text}
                fullWidth
                multiline
                onChange={handleChange}
                required
              ></TextField>
            </Grid>
            <Grid
              width="10%"
            >
              <Button 
                color="error"
                variant="contained"
                onClick={() => {
                  setValues({
                    ...values,
                    steps: values.steps
                    .filter(s => s.id !== step.id)
                    .map((s, i) => {
                      return {
                        ...s,
                        index: i
                      }
                    })
                  })
                }}
                fullWidth
              >x</Button>
            </Grid>
          </Grid>
          )
        })}
      </Grid>
      
      <Button
        onClick={() => {
          const len = values.steps.length;
          setValues({
            ...values,
            steps: [
              ...values.steps,
              {
                id: uuid(),
                text: '',
                index: len
              }
            ]
          });
        }}
        variant="contained"
        fullWidth
      >+ STEP</Button>
    </Grid>

    {/* TAGS */}
    <Grid
      width="100%"
      gap="1rem"
    >
      <Typography
        variant="h6"
      >Tags:</Typography>
      
      <Grid
        direction="column wrap"
        gap="1rem"
        width="100%"
      >
        <TextField
          size="small"
          label="tags separated by spaces"
          fullWidth
          name={NAME.tag}
          value={values.tag}
          onChange={handleChange}
          onKeyUp={(e) => {
            const textToUse = values.tag.trim()
            
            const formatTagText = (text = '') => {
              let textTrim = text.trim()

              if(textTrim[0] === '#'){
                textTrim = textTrim.slice(1, textTrim.length)
              }

              return textTrim;
            }

            const validText = (text = '') => {
              let valid = true;
              
              text = formatTagText(text);
              
              if(text === '') return false;

              const invalidChars = [
                '#',
                ' '
              ];

              Array.from(text)
              .forEach(char => {
                invalidChars.forEach(invalidChar => {
                  if(char === invalidChar){
                    valid = false;
                  }
                })
              })

              return valid;
            }

            const uniqueTag = (text) => {
              const tagTextSet = new Set(values.tags.map(tag => tag.text));
              return !tagTextSet.has(text);
            }
            
            if(!validText(textToUse)) return;
            if(!uniqueTag(textToUse)) return;

            if(e.key === ' '){

              setValues({
                ...values,
                tags: [
                  ...values.tags,
                  {
                    id: uuid(),
                    text: formatTagText(textToUse),
                    index: values.tags.length
                  }
                ],
                tag: initialValues.tag
              });
            } else if(e.key === 'Enter') {
              e.preventDefault();
            }
          }}
        >
        </TextField>
        
        <Grid
          gap="1rem"
        >
          {values.tags.map(tag => {
            return <Grid
              key={tag.id}
              border=".2rem solid #1976d2"
              bgColor="#1976d2"
              color="white"
              padding="0 .5rem"
              align="center"
              gap=".5rem"
              borderRadius="5px"
            >
              <Typography
                variant="body1"
              >
                {tag.text}
              </Typography>
              <button
                style={{
                  outline: '0',
                  border: '0',
                  padding: '0',
                  backgroundColor: '#1976d2',
                  color: 'white'
                }}
                onClick={() => {
                  setValues({
                    ...values,
                    tags: values.tags
                    .filter(item => item.id !== tag.id)
                    .map((item, i) => {
                      return {
                        ...item,
                        index: i
                      }
                    })
                  });
                }}
              >x</button>
            </Grid>
          })}
        </Grid>
      </Grid>
    </Grid>
    
    {/* ACTION AREA */}
    <Grid
      width="100%"
      align="center"
      justify="center"
      gap="1rem"
    >
      <Button
        variant="outlined"
        onClick={(e) => {
          e.preventDefault();
          router.push(`/${router.query.username}`)
        }}
      >Cancel</Button>
      <Button variant="contained" type="submit">{router.query.recipe_id ? 'Update' : 'Submit'}</Button>
    </Grid>
  </Form>
  );
}