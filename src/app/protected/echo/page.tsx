import withAuth from '~/utils/auth-guard';
import { getNhost } from '~/utils/nhost';

type EchoResponse = {
  headers: Record<string, string>;
};

const Echo = async () => {
  const nhost = await getNhost();
  const { res } = await nhost.functions.call<EchoResponse>('echo');

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-auto border">
        <h1 className="text-xl font-semibold">Nhost echo function</h1>
        <pre>{JSON.stringify(res?.data.headers, null, 2)}</pre>
      </div>
    </div>
  );
};

export default withAuth(Echo);
