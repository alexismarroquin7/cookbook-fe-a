import axios from "axios";

export const axiosInstance = () => axios.create({
  baseURL: process.env.NODE_ENV === 'production'
  ? `https://cookbook-be-a.herokuapp.com/api` 
  : `http://localhost:4000/api`
});