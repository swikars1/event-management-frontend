// login api call using api instance

import { API } from "@/lib/API";

const create = async (payload: { email: string; password: String }) => {
  const { data } = await API.post("/events", payload);

  return data;
};

const eventService = { create };

export { eventService };
