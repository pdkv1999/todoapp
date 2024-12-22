package com.akh.todoapp.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.akh.todoapp.entity.Todo;
import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo,Long> {

    //public List<Todo> findByNameContaining(String searchTerm);

    //practicing JPQL
    @Query("select t from Todo t where t.name like CONCAT('%', :stext, '%')")
    public List<Todo> getTodoWithSearchText(@Param("stext") String searchTerm);

}
