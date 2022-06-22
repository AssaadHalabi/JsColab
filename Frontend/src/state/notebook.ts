import { Cell } from "./cell";

export interface Notebook {
  id: string;
  name:string;
  owner_email:string;
  created: Date;
  user_id: number;
  cells: Cell[];
}
