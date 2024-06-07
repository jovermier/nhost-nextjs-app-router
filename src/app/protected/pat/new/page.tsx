import PATForm from '~/components/pat-form';
import withAuthAsync from '~/utils/auth-guard';

const NewPat = async () => {
  return (
    <div className="mx-auto flex max-w-3xl flex-col space-y-4">
      <h2 className="text-xl">New Personal Access Token</h2>
      <PATForm />
    </div>
  );
};

export default withAuthAsync(NewPat);
