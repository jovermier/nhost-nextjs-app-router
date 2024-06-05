'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useSubscription } from '@apollo/client';

import {
  SubTodosCountDocument,
  type SubTodosCountSubscription,
  type SubTodosCountSubscriptionVariables,
  SubTodosDocument,
  type SubTodosSubscription,
  type SubTodosSubscriptionVariables,
} from '~/generated/graphql';
import TodoItem, { type Todo } from '~/components/todo-item';

const TodosCSRSubscription = () => {
  const pageString = useSearchParams().get('page');
  const page = pageString ? parseInt(pageString) : 0;

  const countRes = useSubscription<SubTodosCountSubscription, SubTodosCountSubscriptionVariables>(
    SubTodosCountDocument,
    {
      fetchPolicy: 'cache-first',
      shouldResubscribe: false,
    },
  );
  const count = countRes.data?.todos_aggregate?.aggregate?.count;

  const subRes = useSubscription<SubTodosSubscription, SubTodosSubscriptionVariables>(
    SubTodosDocument,
    {
      variables: {
        offset: page * 10,
        limit: 10,
      },
      fetchPolicy: 'cache-first',
      shouldResubscribe: false,
    },
  );

  const dataRef = useRef(subRes.data);
  useEffect(() => {
    if (subRes.data !== dataRef.current) {
      dataRef.current = subRes.data;
      console.log('Subscription data change');
    }
  }, [subRes.data]);

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <h2 className="text-xl">CSR Todos Subscription ({count ?? '-'})</h2>
        <button
          className="px-4 py-2 text-white bg-indigo-600 rounded-md disabled:opacity-50"
          disabled
        >
          Auto Refresh
        </button>
      </div>

      <ul className="space-y-1">
        {subRes.data?.todos?.map((todo: Todo) => (
          <li key={todo.id}>
            <TodoItem todo={todo} />
          </li>
        ))}
        {subRes.loading && <li>Subscription Loading...</li>}
      </ul>

      {count && count > 10 && (
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

export default TodosCSRSubscription;
