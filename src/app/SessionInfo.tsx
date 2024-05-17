import { getNhost } from '@utils/nhost';
import Claims from './Claims';
import { ApolloState } from './ApolloState';
import { UserState } from './UserState';

export const SessionInfo = async () => {
  const nhost = await getNhost();
  const session = nhost.auth.getSession();

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-auto border">
        <h1 className="text-xl font-semibold">Session (getSession)</h1>
        <pre className="overflow-auto">{JSON.stringify(session, null, 2)}</pre>
      </div>

      <div className="border">
        <Claims />
      </div>

      <div className="border">
        <ApolloState />
      </div>

      <div className="border">
        <UserState />
      </div>
    </div>
  );
};
