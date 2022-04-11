import Link from "next/link";
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
  
  const {values, handleChange} = useForm(initialValues);
  const dispatch = useDispatch();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(AuthAction.login({email: values.email, password: values.password}));
  }

  return (
  <Form
    onSubmit={handleSubmit}
  >
    
    <label>Email</label>
    <input 
      type="text"
      name="email"
      value={values.email}
      onChange={handleChange}
    />
    
    <label>Password</label>
    <input 
      type={values.hidePassword ? "password" : "text"}
      name="password"
      value={values.password}
      onChange={handleChange}
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

    <button type="submit">Login</button>

    <Link href={'/sign-up'} passHref>
      <p>Dont have an account?{' '} 
        <a 
          style={{
            textDecoration: "underline",
            color: "blue"
          }}
          href="/sign-up"
        >Sign-up
        </a>
      </p>
    </Link>

  </Form>
  )
}