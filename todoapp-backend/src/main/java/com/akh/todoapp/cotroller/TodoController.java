package com.akh.todoapp.cotroller;
import com.akh.todoapp.dto.TodoPageResponseVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import com.akh.todoapp.entity.Todo;
import com.akh.todoapp.service.TodoService;
import java.util.List;

@RestController
@RequestMapping("/v1/todosapp")
@CrossOrigin(origins = "http://localhost:4200")
public class TodoController {
	
	@Autowired
	TodoService todoService;
	
	@PostMapping("/createtodo")
	public Todo createTodo(@RequestBody Todo newTodo) {
		return todoService.createTodo(newTodo);
	}

	@GetMapping("/todos")
	public List<Todo> getAllTodos(Todo newTodo) {
		return todoService.getAllTodos();
	}

	@GetMapping("/todo/{id}")
	public Todo getTodoById(@PathVariable("id") Long id) {
		return todoService.getTodoById(id);
	}

	@GetMapping("/todos/search")
	public List<Todo> getTodoWithSearchText(@RequestParam String searchTerm){
		return todoService.getTodoWithSearchText(searchTerm);
	}

	@GetMapping("/todos/{offset}/{pagesize}")
	public TodoPageResponseVo getTodosWithPagination(@PathVariable("offset") int offset, @PathVariable("pagesize") int pagesize){
		Page<Todo> todoPages = todoService.getTodosWithPagination(offset, pagesize);
		return new TodoPageResponseVo(todoPages.getTotalElements(), offset, pagesize,todoPages.getContent());
	}

	@GetMapping("/todos/{offset}/{pagesize}/{fieldName}/{sortDir}")
	public TodoPageResponseVo getTodosWithPaginationAndSorting(@PathVariable("offset") int offset, @PathVariable("pagesize") int pagesize, @PathVariable String fieldName, @PathVariable String sortDir){
		Page<Todo> todoPages = todoService.getTodosWithPaginationAndSorting(offset, pagesize, fieldName,sortDir);
		return new TodoPageResponseVo(todoPages.getTotalElements(), offset, pagesize,todoPages.getContent());
	}

	@PutMapping("/todos/todo/{id}")
	public Todo updateTodo(@PathVariable("id") Long id, @RequestBody Todo updatedTodo){
		return todoService.updateTodo(id, updatedTodo);
	}

	@DeleteMapping("/deletetodo/{id}")
	public void deleteTodo(@PathVariable("id") Long id){
		todoService.deleteTodo(id);
	}
}