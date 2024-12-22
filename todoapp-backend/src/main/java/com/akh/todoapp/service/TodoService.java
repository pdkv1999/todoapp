package com.akh.todoapp.service;
import com.akh.todoapp.entity.Todo;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TodoService {

	Todo createTodo(Todo newTodo);

	Todo getTodoById(Long id);

	List<Todo> getAllTodos();

	Todo updateTodo(Long id, Todo updatedTodo);

	void deleteTodo(Long id);

	List<Todo> getTodoWithSearchText(String searchTerm);

	Page<Todo> getTodosWithPagination(int offset, int pagesize);

	Page<Todo> getTodosWithPaginationAndSorting(int offset, int pagesize, String fieldName, String sortDir);
}