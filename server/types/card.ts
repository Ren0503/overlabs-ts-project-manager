export type CardDetail = {
    _id: string;
    title: string;
    description: string;
    columnId?: string;
    assignedTo?: string;
    boardId?: string;
    sequence?: number;
    label?: Label;
};
  
export type Label = {
    bg: string;
    type: string;
};

export type Column = {
    _id: string;
    sequence?: number;
}
  