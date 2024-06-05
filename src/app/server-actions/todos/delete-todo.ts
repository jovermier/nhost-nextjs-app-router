'use server';

import { revalidatePath } from 'next/cache';

import {
  DeleteTodoDocument,
  type DeleteTodoMutation,
  type DeleteTodoMutationVariables,
} from '~/generated/graphql';
import { getNhost } from '~/utils/nhost';

export const deleteTodo = async (id: string) => {
  const nhost = await getNhost();

  await nhost.graphql.request<DeleteTodoMutation, DeleteTodoMutationVariables>(DeleteTodoDocument, {
    id,
  });

  revalidatePath('/protected/todos');
};
