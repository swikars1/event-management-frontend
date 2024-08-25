// login api call using api instance

import { API } from "@/lib/API";

const login = async (payload: { email: string; password: String }) => {
  const { data } = await API.post("/users/login", payload);

  return data;
};

const register = async (payload: {
  email: string;
  name: string;
  password: String;
}) => {
  const { data } = await API.post("/users/register", payload);

  return data;
};

const userService = { login, register };

export { userService };
