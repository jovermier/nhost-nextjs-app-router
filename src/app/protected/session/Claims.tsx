import withAuth from '@utils/auth-guard';
import { getNhost } from '@utils/nhost';

const Claims = async () => {
  const nhost = await getNhost();
  const claims = nhost.auth.getHasuraClaims(); // This throws a runtime error

  return (
    <>
      <h1 className="text-xl font-semibold">Hasura Claims</h1>
      <pre className="overflow-auto">{JSON.stringify(claims, null, 2)}</pre>
    </>
  );
};

export default withAuth(Claims);
