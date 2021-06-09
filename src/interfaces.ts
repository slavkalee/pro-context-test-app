export interface List {
  id: number;
  title: string;
}

export interface Item {
  id: number;
  listId: number;
  title: string;
  completed: boolean;
  color: string;
  count: number;
}

export interface Color {
  listId: number;
  color: string;
}

export interface Checkbox {
  notAllSelected: Boolean;
  hasSelected: Boolean;
}
