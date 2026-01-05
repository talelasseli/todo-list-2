import useFetch from "./useFetch";
import { useState, useEffect } from "react";
import Todo from "./Todo.jsx";

const All = ({ category }) => {
  const { data, error } = useFetch(`http://localhost:5000/categories`);

  return (
    <div className="All">
      <ul>
        {data &&
          data.map((category) =>
            category.todos.map((todo) => (
              <Todo
                key={todo.id}
                data={todo}
                category={category.name}
                // Use refetch from useFetch
              />
            ))
          )}
      </ul>
    </div>
  );
};

export default All;
