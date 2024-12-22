package com.akh.todoapp.service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.akh.todoapp.entity.Todo;
import com.akh.todoapp.repository.TodoRepository;
import java.util.List;

@Service
public class TodoServiceImpl implements TodoService {
	private final TodoRepository todorepository;
	TodoServiceImpl(TodoRepository todorepository){
		this.todorepository =  todorepository;
	}
	
	@Override
	public Todo createTodo(Todo newTodo) {
		return this.todorepository.save(newTodo);
	}

	@Override
	public Todo getTodoById(Long id) {
		System.out.println(id);
		if(todorepository.findById(id).isPresent()){
			return todorepository.findById(id).get();
		}
		return null;
	}

	@Override
	public List<Todo> getAllTodos() {
		return todorepository.findAll();
	}

	@Override
	public Todo updateTodo(Long id, Todo updatedTodo) {
		return todorepository.save(updatedTodo);
	}

	@Override
	public void deleteTodo(Long id) {
		System.out.println(id);
		todorepository.deleteById(id);
	}

	@Override
	public List<Todo> getTodoWithSearchText(String searchTerm) {
		return todorepository.getTodoWithSearchText(searchTerm);
	}

	@Override
	public Page<Todo> getTodosWithPagination(int offset, int pagesize) {
		 return todorepository.findAll(PageRequest.of(offset,pagesize));
	}

	@Override
	public Page<Todo> getTodosWithPaginationAndSorting(int offset, int pagesize, String fieldName, String sortDir) {
		boolean sortASC = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name());
		Sort sort;
		if(sortASC){
			sort = Sort.by(fieldName).ascending();
		}
		else{
			 sort = Sort.by(fieldName).descending();
		}
		return todorepository.findAll(PageRequest.of(offset,pagesize,sort));
	}

//	@Override
//	public List<Todo> getTodoWithSearchText(String searchTerm) {
//		return todorepository.findByNameContaining(searchTerm);
//	}
}