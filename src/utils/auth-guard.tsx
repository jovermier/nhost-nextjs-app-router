import { redirect } from 'next/navigation';

import { getNhost } from '~/utils/nhost';

const withAuthAsync = <P extends object>(Component: React.FunctionComponent<P>) => {
  const WrappedComponent = async (props: P) => {
    const nhost = await getNhost();
    const session = nhost.auth.getSession();

    if (!session) {
      redirect('/auth/sign-in');
    }

    return <Component {...props} />;
  };
  WrappedComponent.displayName = `withAuthAsync(${
    Component.displayName ?? Component.name ?? 'Component'
  })`;

  return WrappedComponent;
};

export default withAuthAsync;
