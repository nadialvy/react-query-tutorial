"use client";
import { useQuery, useIsFetching } from "@tanstack/react-query";

type Todo = {
  userId:number;
  id: number;
  title: string;
  completed: boolean;
}

export default function Home() {
  // using alias, so from now on, we can use `todosData` instead of `data`
  const { data: todosData, isLoading, isError } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
        res.json()
      ),
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

  console.log(todosData);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-blue-100">
      <div>
        <h1 className="mb-4 font-bold">Todos</h1>
        {todosData?.map((todo : Todo) => (
          <div key={todo.id}>
            <input type="checkbox" checked={todo.completed} />
            <span className="ml-4">{todo.title}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
