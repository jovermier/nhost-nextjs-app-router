import withAuthAsync from '@utils/auth-guard';

import TodosSubscription from './TodosSubscription';

const Todos = () => {
  return (
    <div className="space-y-4">
      {/* <Head>
        <title>Protected Page</title>
      </Head> */}

      <TodosSubscription />
    </div>
  );
};

export default withAuthAsync(Todos);
