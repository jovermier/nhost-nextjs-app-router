import withAuth from "@utils/auth-guard";
import { getNhost } from "@utils/nhost";

const Claims = async () => {
  const nhost = await getNhost();
  const claims = nhost.auth.getHasuraClaims(); // This throws a runtime error

  return (
    <div>
      <h1>Claims</h1>
      <pre className="overflow-auto">{JSON.stringify(claims, null, 2)}</pre>
    </div>
  );
};

export default withAuth(Claims);
