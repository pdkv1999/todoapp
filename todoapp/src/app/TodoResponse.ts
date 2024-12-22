import { Todo } from './Todo';
export interface TodoResponse {
    pageNumber: number;
    totalElements: number;
    totalPages: number;
    todos:Todo[]

}