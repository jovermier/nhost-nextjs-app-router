'use server';

import { revalidatePath } from 'next/cache';

import { getNhost } from '~/utils/nhost';

import {
  DeletePersonalAccessTokenDocument,
  type DeletePersonalAccessTokenMutation,
  type DeletePersonalAccessTokenMutationVariables,
} from '~/generated/graphql';

export const deletePAT = async (id: string) => {
  const nhost = await getNhost();

  await nhost.graphql.request<
    DeletePersonalAccessTokenMutation,
    DeletePersonalAccessTokenMutationVariables
  >(DeletePersonalAccessTokenDocument, {
    id,
  });

  revalidatePath('/protected/pat');
};
