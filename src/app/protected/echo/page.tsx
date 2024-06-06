import { type EchoData } from 'lib/echoType';
import withAuth from '~/utils/auth-guard';
import { getNhost } from '~/utils/nhost';

const Echo = async () => {
  const nhost = await getNhost();
  const response = await nhost.functions.call<EchoData>('echo');

  const data = response.res?.data;

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-auto border">
        <h1 className="text-xl font-semibold">Nhost echo function</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default withAuth(Echo);
