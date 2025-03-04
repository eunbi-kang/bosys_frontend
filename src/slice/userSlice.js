import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

 /*
  * API 만드는 부분
  */
const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});


export const fetchUserCreateThunk = createAsyncThunk("UserInfo/fetchUserInfoThunk", async(body) => {
  const response = await api.post(`/api/users`,body);
    console.log("response.data", response.data);
  return response.data;
});

