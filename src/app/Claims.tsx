import { getNhost } from '@utils/nhost';

const Claims = async () => {
  const nhost = await getNhost();
  const claims = nhost.auth.getHasuraClaims(); // This throws a runtime error

  return (
    <>
      <h1 className="text-xl font-semibold">Hasura Claims (getHasuraClaims)</h1>
      <pre className="overflow-auto">{JSON.stringify(claims, null, 2)}</pre>
    </>
  );
};

export default Claims;
