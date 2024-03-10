"use client";
import { useQuery, useIsFetching } from "@tanstack/react-query";

type Todo = {
  // userId:number;
  id: number;
  title: string;
  completed: boolean;
};

export default function Home() {
  const isFetching = useIsFetching();
  const {
    // using alias, so from now on, we can use `todosData` instead of `data`
    data: todosData,
    isLoading,
    isError,
  } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
        res.json()
      ),
    // select means, we can filter object from backend
    select: (todos) =>
      todos.map((item) => ({
        id: item.id,
        title: item.title,
        completed: item.completed,
      })),
  });

  const { data: usersData } = useQuery<any[]>({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
        res.json()
      ),
    // will fetch users if todosData fetched
    enabled: !!todosData,
  });

  if (isLoading)
    return (
      <main className="mt-4 flex min-h-screen items-center justify-center text-center">
        Loading...
      </main>
    );

  if (isError)
    return (
      <main className="mt-4 flex min-h-screen items-center justify-center text-center">
        Something went wrong
      </main>
    );

  // console.log(todosData);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-blue-100">
      <div>
        <h1 className="mb-4 font-bold">Todos</h1>
        {todosData?.map((todo: Todo) => (
          <div key={todo.id}>
            <input type="checkbox" checked={todo.completed} />
            <span className="ml-4">{todo.title}</span>
          </div>
        ))}
      </div>

      <div>
        <h1 className="my-4 font-bold">Users</h1>
        {usersData?.map((user: any) => (
          <div key={user.id}>
            <p>{user.name}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
