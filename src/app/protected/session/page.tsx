import withAuth from "@utils/auth-guard";
import { getNhost } from "@utils/nhost";

const Claims = async () => {
  const nhost = await getNhost();
  const session = nhost.auth.getSession(); // This works

  return (
    <div>
      <h1>Session</h1>
      <pre className="overflow-auto">{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};

export default withAuth(Claims);
