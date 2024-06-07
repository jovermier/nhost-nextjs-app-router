import Link from 'next/link';

import TodoItem from '~/components/todo-item';
import withAuthAsync from '~/utils/auth-guard';
import { getNhost } from '~/utils/nhost';
import { RouteRefreshButton } from './RouteRefreshButton';
import {
  GetTodosDocument,
  type GetTodosQuery,
  type GetTodosQueryVariables,
} from '~/generated/graphql';

const TodosSSR = async ({ params }: { params: Record<string, string | string[] | undefined> }) => {
  const page = parseInt(params.pagination?.at(0) ?? '0');

  const nhost = await getNhost();

  const { data } = await nhost.graphql.request<GetTodosQuery, GetTodosQueryVariables>(
    GetTodosDocument,
    {
      offset: page * 10,
      limit: 10,
    },
  );

  const todos = data?.todos;

  const count = data?.todos_aggregate.aggregate?.count;

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h2 className="text-xl">SSR Todos ({count ?? '-'})</h2>
        <RouteRefreshButton>Router Refresh</RouteRefreshButton>
      </div>

      <ul className="pt-2">
        {todos?.map((todo) => (
          <li key={todo.id}>
            <TodoItem todo={todo} />
          </li>
        ))}
      </ul>

      {count && count > 10 && (
        <div className="flex justify-center space-x-2">
          {page > 0 && (
            <Link
              prefetch={false}
              href={`/protected/todos/${page - 1}`}
              className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              Previous
            </Link>
          )}

          {page + 1 < Math.ceil(count / 10) && (
            <Link
              prefetch={false}
              href={`/protected/todos/${page + 1}`}
              className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default withAuthAsync(TodosSSR);
