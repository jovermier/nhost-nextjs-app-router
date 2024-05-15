'use client';

import { gql, useQuery, useSubscription } from '@apollo/client';
import Link from 'next/link';
import TodoItem, { Todo } from '@components/todo-item';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

const TodosQueryDocument = gql`
  query getTodos($limit: Int, $offset: Int) {
    todos(limit: $limit, offset: $offset, order_by: { createdAt: desc }) {
      id
      title
      done
      attachment {
        id
      }
    }
  }
`;

const TodosSubscriptionDocument = gql`
  subscription subTodos($limit: Int, $offset: Int) {
    todos(limit: $limit, offset: $offset, order_by: { createdAt: desc }) {
      id
      title
      done
      attachment {
        id
      }
    }
  }
`;

const TodosCountSubscriptionDocument = gql`
  subscription subTodos {
    todos_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const TodosSubscription = () => {
  const pageString = useSearchParams().get('page');
  const page = pageString ? parseInt(pageString) : 0;

  const countRes = useSubscription(TodosCountSubscriptionDocument, {
    fetchPolicy: 'cache-first',
    shouldResubscribe: false,
  });
  const count = countRes.data?.todos_aggregate?.aggregate?.count;

  const queryRes = useQuery(TodosQueryDocument, {
    variables: {
      offset: page * 10,
      limit: 10,
    },
  });
  const subRes = useSubscription(TodosSubscriptionDocument, {
    variables: {
      offset: page * 10,
      limit: 10,
    },
    fetchPolicy: 'cache-first',
    shouldResubscribe: false,
  });

  const dataRef = useRef(() => subRes.data);
  useEffect(() => {
    if (subRes.data !== dataRef.current) {
      dataRef.current = subRes.data;
      console.log('Subscription data change');
    }
  }, [subRes.data]);

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <h2 className="text-xl">Todos ({count ?? '-'})</h2>

        <Link
          href={`/protected/todos2/new`}
          className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Add Todo
        </Link>
      </div>

      <h3 className="text-lg font-semibold pt-8">Subscription</h3>
      <ul className="space-y-1">
        {subRes.data?.todos?.map((todo: Todo) => (
          <li key={todo.id}>
            <TodoItem todo={todo} />
          </li>
        ))}
        {subRes.loading && <li>Subscription Loading...</li>}
      </ul>

      <div className="flex flex-row justify-between pt-8">
        <h3 className="text-lg font-semibold">Query</h3>
        <button
          onClick={() => queryRes.refetch()}
          className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Refresh
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

export default TodosSubscription;
