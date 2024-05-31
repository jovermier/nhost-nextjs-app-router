/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import PatItem from '@components/pat-item';
import withAuthAsync from '@utils/auth-guard';
import { getNhost } from '@utils/nhost';
import Link from 'next/link';
import {
  GetPersonalAccessTokensDocument,
  type GetPersonalAccessTokensQuery,
  type GetPersonalAccessTokensQueryVariables,
} from '~/generated/graphql';

const PATs = async ({ params }: { params: Record<string, string | string[] | undefined> }) => {
  const page = parseInt(params.pagination?.at(0) ?? '0');
  const nhost = await getNhost();

  const result = await nhost.graphql.request<
    GetPersonalAccessTokensQuery,
    GetPersonalAccessTokensQueryVariables
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  >(GetPersonalAccessTokensDocument, {
    offset: page * 10,
    limit: 10,
  });

  const authRefreshTokens = result.data?.authRefreshTokens;
  const count = result.data?.authRefreshTokensAggregate.aggregate?.count;

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-xl">Personal Access Tokens ({count})</h2>

        <Link
          prefetch={false}
          href={`/protected/pat/new`}
          className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Add a PAT
        </Link>
      </div>

      <ul className="space-y-1">
        {authRefreshTokens?.map((token) => (
          <li key={token.id}>
            <PatItem pat={token} />
          </li>
        ))}
      </ul>

      {count && count > 10 && (
        <div className="flex justify-center space-x-2">
          {page > 0 && (
            <Link
              prefetch={false}
              href={`/protected/pat/${page - 1}`}
              className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Previous
            </Link>
          )}

          {page + 1 < Math.ceil(count / 10) && (
            <Link
              prefetch={false}
              href={`/protected/pat/${page + 1}`}
              className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default withAuthAsync(PATs);
