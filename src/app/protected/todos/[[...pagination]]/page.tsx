import dynamicImport from 'next/dynamic';
import Link from 'next/link';

import withAuthAsync from '~/utils/auth-guard';
import TodoFormServer from '~/components/todo-form';
import TodosSSR from './TodosSSR';
import TodosCSRQuery from './TodosCSRQuery';
import TodoFormClient from '../new-client-side/TodoForm';

const TodosCSRSubscription = dynamicImport(() => import('./TodosCSRSubscription'), {
  ssr: false,
});

const Todos = async (props: { params: Record<string, string | string[] | undefined> }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2">
        <Link
          prefetch={false}
          href={`/protected/todos/new-server-action`}
          className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Add Todo Page (Server Action)
        </Link>

        <Link
          prefetch={false}
          href={`/protected/todos/new-client-side`}
          className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Add Todo Page (Client Mutation)
        </Link>
      </div>

      <div className="p-2 border rounded-md">
        <div className="flex flex-col max-w-3xl mx-auto space-y-4">
          <h2 className="text-xl">New Todo Client Mutation</h2>
          <TodoFormClient />
        </div>
      </div>

      <div className="p-2 border rounded-md">
        <div className="flex flex-col max-w-3xl mx-auto space-y-4">
          <h2 className="text-xl">New Todo Server Action</h2>
          <TodoFormServer />
        </div>
      </div>

      <div className="p-2 border rounded-md">
        <TodosSSR {...props} />
      </div>

      <div className="p-2 border rounded-md">
        <TodosCSRQuery />
      </div>

      <div className="p-2 border rounded-md">
        <TodosCSRSubscription />
      </div>
    </div>
  );
};

export default withAuthAsync(Todos);
