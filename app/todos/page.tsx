"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

function Todos() {
  const queryClient = useQueryClient();

  const mutation: any = useMutation({
    mutationFn: (newTodo) => {
      return fetch("http://localhost:8000/todos", {
        method: "POST",
        body: JSON.stringify(newTodo),
      });

      // OR USING AXIOS
      // return axios.post("http://localhost:8000/todos", newTodo);
    },
    onMutate: (newTodo) => {
      console.log(newTodo);
    },
    onError: (error, newTodo, context) => {
      console.log(error.message);
    },
    onSuccess: (data, newTodo, context) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    // no matter success or error, this will be called
    onSettled: (data, error, newTodo, context) => {
      console.log(data);
    },
  });

  const {
    data: todosData,
    isLoading,
    isError,
  } = useQuery<any[]>({
    queryKey: ["todos"],
    queryFn: () =>
      fetch("http://localhost:8000/todos").then((res) => res.json()),
  });

  return (
    <main className="mt-4 min-h-screen">
      {mutation.isPending ? (
        "Adding todo..."
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div>Todo added!</div> : null}

          <button
            onClick={() => {
              mutation.mutate({ id: new Date(), title: "Do Laundry" });
            }}
          >
            Create Todo
          </button>
        </>
      )}

      {todosData?.map((todo: any) => (
        <div key={todo.id}>
          <h4 className="ml-4">{todo.title}</h4>
        </div>
      ))}
    </main>
  );
}

export default Todos;
