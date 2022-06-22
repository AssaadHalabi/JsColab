import axios from "axios";
import { Notebook } from "../state/notebook";

export const getNotebooks = async (email: string) => {
  if (email) {
    let notebooks: Notebook[] = [];
    let { data } = await axios.get(`/api/notebooks`, {
      params: { user_email: email },
    });
    notebooks = data;

    return notebooks;
  }
};

export const getFeaturedNotebooks = async () => {
  let notebooks: Notebook[] = [];
  let { data } = await axios.get(`/api/getFeaturedNotebooks`);
  notebooks = data;

  return notebooks;
};
