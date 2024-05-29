import axios from "axios";
import { Notebook } from "../state/notebook";

export const getNotebooks = async (email: string) => {
  if (email) {
    let notebooks: Notebook[] = [];
    let { data } = await axios.get(`${process.env.REACT_APP_API_URL}/notebooks`, {
      params: { user_email: email },
    });
    notebooks = data;

    return notebooks;
  }
};

export const getFeaturedNotebooks = async () => {
  let notebooks: Notebook[] = [];
  let { data } = await axios.get(`${process.env.REACT_APP_API_URL}/getFeaturedNotebooks`);
  notebooks = data;

  return notebooks;
};
