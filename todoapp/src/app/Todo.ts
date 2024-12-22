export interface Todo {
    id?: number;
    name: string;
    description: string;
    completed: boolean;
    dateCreated?: Date;
    lastUpdated?: Date;
}