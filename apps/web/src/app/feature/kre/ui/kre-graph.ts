export type KreDataValue = string | number | any | null;
export type KreDataSet = KreDataRow[];
export interface KreDataRow {
  [key: string]: KreDataValue;
}

export interface KreGraph {
  id: string;
  name: string;
  description: string;
  data: KreDataSet;
}
