import { useState } from "react"

export const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    const {name, value, type, checked} = e.target;
    const valueToUse = type === 'checkbox' ? checked : value;
    setValues({
      ...values,
      [name]: valueToUse
    });
  }

  return {
    values: values,
    setValues,
    handleChange
  }
}