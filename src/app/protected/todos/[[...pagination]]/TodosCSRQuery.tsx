'use client';

import { useQuery } from '@apollo/client';
import Link from 'next/link';
import TodoItem, { type Todo } from '@components/todo-item';
import { useSearchParams } from 'next/navigation';
import { TodosQueryDocument } from './documentNodes';

const TodosCSR = () => {
  const pageString = useSearchParams().get('page');
  const page = pageString ? parseInt(pageString) : 0;

  const queryRes = useQuery(TodosQueryDocument, {
    variables: {
      offset: page * 10,
      limit: 10,
    },
  });

  const count = queryRes.data?.todos_aggregate?.aggregate?.count;

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <h2 className="text-xl">CSR Todos Query ({count ?? '-'})</h2>
        <button
          onClick={() => queryRes.refetch()}
          className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Query Refresh
        </button>
      </div>

      <ul className="space-y-1">
        {queryRes.data?.todos?.map((todo: Todo) => (
          <li key={todo.id}>
            <TodoItem todo={todo} />
          </li>
        ))}
        {queryRes.loading && <li>Query Loading...</li>}
      </ul>

      {count > 10 && (
        <div className="flex justify-center space-x-2">
          {page > 0 && (
            <Link
              prefetch={false}
              href={`/protected/todos/${page - 1}`}
              className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Previous
            </Link>
          )}

          {page + 1 < Math.ceil(count / 10) && (
            <Link
              prefetch={false}
              href={`/protected/todos/${page + 1}`}
              className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default TodosCSR;
