import { TodoappserviceService } from './todoappservice.service';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Todo } from './Todo';
import { CommonModule } from '@angular/common';
import {Sort, MatSortModule} from '@angular/material/sort';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatCardModule,MatFormFieldModule,MatInputModule,MatIconModule,MatSnackBarModule,MatCheckboxModule,MatButtonModule
    ,ReactiveFormsModule, CommonModule,MatPaginatorModule,MatSortModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit{


  allTodos : Todo[] = []
  title = 'todo-fullstack';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  todoFormGroup!: FormGroup;
  todo! : Todo;
  isEditMode: boolean = false;
  searchText = new FormControl('');
  todoPageSize: number = 5;
  totalTodos : number = 0;
  offset: number = 0;

  constructor(private _snackBar:MatSnackBar, private todoappserviceService: TodoappserviceService){}

  ngOnInit(): void {
    this.todoFormGroup = new FormGroup({
        id: new FormControl(null),
        name: new FormControl(null),
        description: new FormControl(null),
        completed: new FormControl(false) 
      })
      //this.getAlltodos();
      this.getTodosByPageSize();
      this.searchText.valueChanges.subscribe(searchTerm => {
      this.todoappserviceService.getTodosBySearchText(searchTerm!).subscribe((todos : Todo[])=>{
        this.allTodos = todos
      }); 
    });

    }

    onPageChange(event: PageEvent) {
      if (this.todoPageSize !== event.pageSize) {
        this.todoPageSize = event.pageSize;
        this.offset = 0;
      } 

      else{
        if (event.previousPageIndex !== undefined && event.pageIndex !== undefined) {
          if (event.previousPageIndex < event.pageIndex) {
            this.offset = ++this.offset;
          } else {
            this.offset = --this.offset;
          }
        }
      }

      this.getTodosByPageSize();
    }

    getTodosByPageSize() {
      this.todoappserviceService.getAllTodosByPagination(this.offset,this.todoPageSize).subscribe((data)=>{
        this.totalTodos = data.totalElements;
        this.allTodos = data.todos;
      });
    }

    sortData(sort: Sort) {
      if (sort.direction === '') {
        sort.direction = 'asc'; 
      }
      this.todoappserviceService.getTodosWithPaginationAndSorting(this.offset,this.todoPageSize,sort.active,sort.direction).subscribe((data)=>{
        this.totalTodos = data.totalElements;
        this.allTodos = data.todos;
      })
    }

    onSubmit() {
      if(this.isEditMode){
        this.handleUpdate()
      }
      else{
        this.handleCreate()
      }
    }
    
    handleCreate() {
      this.todo = this.todoFormGroup.value
      this.todoappserviceService.createTodo(this.todo).subscribe((newTodo) => {
        this.openSnackBar(this.todo.name);
        //this.getAlltodos();
        this.getTodosByPageSize();
        this.resetForm();
      });
    }
    
    handleUpdate() {
      this.todo = this.todoFormGroup.value
      this.todoappserviceService.updateTodo(this.todo, this.todo.id).subscribe(() => {
        this.openSnackBar(`Updated: ${this.todo.name}`);
        this.getTodosByPageSize();
        //this.getAlltodos();
        this.resetForm();
      });
    }
    
    resetForm() {
      this.todoFormGroup.reset({
        id: null,
        name: '',
        description: '',
        completed: false
      });
      this.isEditMode = false;
    }

  getAlltodos(){
    this.todoappserviceService.getAllTodos().subscribe((data)=>{
      this.allTodos = data
    })
  }
  
  updateTodo(todoData: Todo) {
    this.todoappserviceService.getTodoById(todoData.id).subscribe((data)=>{
      delete data.dateCreated;
      delete data.lastUpdated;
      this.todoFormGroup.setValue(data)
    })
    this.isEditMode = true;
  }

  deleteTodo(id: any) {
    this.todoappserviceService.deleteTodo(id).subscribe(()=>{
      console.log("deleted succesfully")
      //this.getAlltodos()
      this.getTodosByPageSize();
    })
  }

  openSnackBar(todoName : string) {
    this._snackBar.open(todoName, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000,
    });
  }

}