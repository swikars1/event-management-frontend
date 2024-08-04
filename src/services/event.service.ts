// login api call using api instance

import { API } from "@/lib/API";

export type BookEventInputs = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  themeId: string;
  cateringId: string;
  entertainmentId: string;
  accommodationId: string;
};

const create = async (payload: BookEventInputs) => {
  const { data } = await API.post("/events", payload);

  return data;
};

const eventService = { create };

export { eventService };
