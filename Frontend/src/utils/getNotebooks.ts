import axios from "axios";
import { Notebook } from "../state/notebook";

export const getNotebooks = async (email: string) => {
  if (email) {
    
    let notebooks: Notebook[] = [];
    try {
    
      let {
        data,
      } = await axios.get(`${process.env.REACT_APP_API_URL}/notebooks`, {params:{user_email: email}})
      notebooks = data;
    } catch (error: any) {
      console.log(error.message);
    }
    return notebooks;
  }
};
