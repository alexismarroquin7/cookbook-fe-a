import { Button, Paper, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Grid } from "../../components"
import { useForm } from "../../hooks";
import { AuthAction } from "../../store/actions";

const initialValues = {
  email: '',
  password: '',
  hidePassword: true
}

export const LoginForm = () => {
  
  const { values, handleChange } = useForm(initialValues);
  const dispatch = useDispatch();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(AuthAction.login({email: values.email, password: values.password}));
  }

  return (
  <Form
    onSubmit={handleSubmit}
    gap="1rem"
    border="1px solid black"
    padding="1rem"
    borderRadius="10px"
  >
    
  
    <Typography
      variant="h6"
    >Login</Typography>

    <TextField 
      type="text"
      label="Email"
      name="email"
      value={values.email}
      onChange={handleChange}
      fullWidth
    />
  
    <TextField 
      type={values.hidePassword ? "password" : "text"}
      label="Password"
      name="password"
      value={values.password}
      onChange={handleChange}
      fullWidth
    />
    
    <Grid>
      <input 
        type="checkbox"
        name="hidePassword"
        checked={values.hidePassword}
        onChange={handleChange}
      />
      <label>Hide password</label>
    </Grid>

    <Button 
      type="submit"
      variant="contained"
      fullWidth
    >Login</Button>

    <p>Dont have an account?{' '} 
      <Link 
        href={'/sign-up'}
        passHref
      >
        <a
          style={{
            textDecoration: 'underline',
            color: 'blue'
          }}
        >Sign-Up</a>
      </Link>
    </p>

  </Form>
  )
}