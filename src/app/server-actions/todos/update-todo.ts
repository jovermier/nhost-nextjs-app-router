'use server';

import { revalidatePath } from 'next/cache';

import {
  UpdateTodoDocument,
  type UpdateTodoMutation,
  type UpdateTodoMutationVariables,
} from '~/generated/graphql';
import { getNhost } from '~/utils/nhost';

export const updateTodo = async (id: string, done: boolean) => {
  const nhost = await getNhost();

  await nhost.graphql.request<UpdateTodoMutation, UpdateTodoMutationVariables>(UpdateTodoDocument, {
    id,
    done,
  });

  revalidatePath('/protected/todos');
};
