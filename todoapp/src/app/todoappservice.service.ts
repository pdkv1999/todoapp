import { Injectable } from '@angular/core';
import { Todo } from './Todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoResponse } from './TodoResponse';

@Injectable({
  providedIn: 'root'
})
export class TodoappserviceService {

  offset = 0

  constructor(private http: HttpClient) { }
  private baseUri = "http://localhost:8090/v1/todosapp"

  createTodo(todo: Todo): Observable<Todo>{
    return this.http.post<Todo>(this.baseUri + "/createtodo",todo)
  }

  getTodoById(id: any) : Observable<Todo>{
    //this.http.get(this.baseUri + "todo/"+id)
    return this.http.get<Todo>(`${this.baseUri}/todo/${id}`)
  }

  getAllTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>(this.baseUri + "/todos")
  }

  getAllTodosByPagination(offset: number,pagesize: number): Observable<TodoResponse>{
    return this.http.get<TodoResponse>(`${this.baseUri}/todos/${offset}/${pagesize}`)
  }

  getTodosWithPaginationAndSorting(offset: number, pagesize: number, fieldName:string, sortDir: string) {
    return this.http.get<TodoResponse>(`${this.baseUri}/todos/${offset}/${pagesize}/${fieldName}/${sortDir}`)
  }

  getTodosBySearchText(searchValue: string): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.baseUri}/todos/search`,{params:{searchTerm:searchValue}})
  }

  updateTodo(updatedTodo:Todo, id: any):Observable<Todo>{
    return this.http.put<Todo>(`${this.baseUri}/todos/todo/${id}`, updatedTodo)
  }

  deleteTodo(id: number): Observable<any>{
    return this.http.delete(`${this.baseUri}/deletetodo/${id}`);
  }
}