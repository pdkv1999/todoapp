package com.akh.todoapp.dto;

import com.akh.todoapp.entity.Todo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TodoPageResponseVo {
    private long totalElements;
    private int pageNumber;
    private int totalPages;
    private List<Todo> todos;
}