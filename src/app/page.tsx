import { getNhost } from '~/utils/nhost';
import AuthPage from './auth-page';
import UnAuthPage from './unauth-page';
import { SessionInfo } from './SessionInfo';

export default async function Home() {
  const nhost = await getNhost();
  const session = nhost.auth.getSession();

  if (!session?.user) {
    return (
      <>
        <UnAuthPage />
        <SessionInfo />
      </>
    );
  }

  const user = nhost.auth.getUser();

  if (user?.id) {
    return (
      <>
        <AuthPage />
        <SessionInfo />
      </>
    );
  }

  return null;
}
