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
interface UserBooking {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  catering: {
    name: string;
  } | null;
  accommodation: {
    name: string;
  } | null;
  theme: {
    name: string;
  } | null;
  entertainment: {
    name: string;
  } | null;
  decor: {
    name: string;
  } | null;
  status: string;
}
const create = async (payload: BookEventInputs) => {
  const { data } = await API.post("/events", payload);

  return data;
};

const getAllBookings = async () => {
  const { data } = await API.get("/events/bookings");

  return data as { responseObject: UserBooking[] };
};

const deleteBooking = async (id: string) => {
  const { data } = await API.delete(`/events/bookings/${id}`);

  return data;
};

const eventService = { create, getAllBookings, deleteBooking };

export { eventService };
