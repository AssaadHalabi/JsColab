export type CellTypes = 'code' | 'text';
export interface Cell {
  id?: number;
  type: CellTypes;
  notebook_id: string;
  uuid: string;
  content: string;
}
