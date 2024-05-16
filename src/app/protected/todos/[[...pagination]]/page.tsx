import dynamic from 'next/dynamic';

import withAuthAsync from '@utils/auth-guard';
import TodosSSR from './TodosSSR';
import TodosCSR from './TodosCSR';

// const TodosCSR = dynamic(() => import('./TodosCSR'), {
//   ssr: false,
// });

const Todos = async (props: { params: { [key: string]: string | string[] | undefined } }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="p-2 border rounded-md">
        <TodosSSR {...props} />
      </div>

      <div className="p-2 border rounded-md">
        <TodosCSR />
      </div>
    </div>
  );
};

export default withAuthAsync(Todos);
