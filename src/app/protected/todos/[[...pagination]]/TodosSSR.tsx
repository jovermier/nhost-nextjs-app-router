import { gql } from '@apollo/client';
import TodoItem, { type Todo } from '@components/todo-item';
import withAuthAsync from '@utils/auth-guard';
import { getNhost } from '@utils/nhost';

import Link from 'next/link';

const TodosSSR = async ({
  params,
}: {
  params: { [key: string]: string | string[] | undefined };
}) => {
  const page = parseInt(params.pagination?.at(0) || '0');

  const nhost = await getNhost();

  const {
    data: {
      todos,
      todos_aggregate: {
        aggregate: { count },
      },
    },
  } = await nhost.graphql.request(
    gql`
      query getTodos($limit: Int, $offset: Int) {
        todos(limit: $limit, offset: $offset, order_by: { createdAt: desc }) {
          id
          title
          done
          attachment {
            id
          }
        }

        todos_aggregate {
          aggregate {
            count
          }
        }
      }
    `,
    {
      offset: page * 10,
      limit: 10,
    },
  );

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <h2 className="text-xl">SSR Todos ({count})</h2>
        <Link
          href={`/protected/todos/new-server-action`}
          className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Add Todo (Server Action)
        </Link>
      </div>

      <ul className="pt-2">
        {todos.map((todo: Todo) => (
          <li key={todo.id}>
            <TodoItem todo={todo} />
          </li>
        ))}
      </ul>

      {count > 10 && (
        <div className="flex justify-center space-x-2">
          {page > 0 && (
            <Link
              href={`/protected/todos/${page - 1}`}
              className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Previous
            </Link>
          )}

          {page + 1 < Math.ceil(count / 10) && (
            <Link
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

export default withAuthAsync(TodosSSR);
