import dynamic from 'next/dynamic';
import Link from 'next/link';

import withAuthAsync from '@utils/auth-guard';
import TodosSSR from './TodosSSR';
import TodosCSRQuery from './TodosCSRQuery';

const TodosCSRSubscription = dynamic(() => import('./TodosCSRSubscription'), {
  ssr: false,
});

const Todos = async (props: { params: { [key: string]: string | string[] | undefined } }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2">
        <Link
          href={`/protected/todos/new-server-action`}
          className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Add Todo (Server Action)
        </Link>

        <Link
          href={`/protected/todos/new-client-side`}
          className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Add Todo (Client Mutation)
        </Link>
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
