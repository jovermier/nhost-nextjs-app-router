'use server';

import { redirect } from 'next/navigation';

import {
  InsertTodoDocument,
  type InsertTodoMutation,
  type InsertTodoMutationVariables,
} from '~/generated/graphql';
import { getNhost } from '~/utils/nhost';

export const createTodo = async (formData: FormData) => {
  const nhost = await getNhost();

  const title = formData.get('title') as string;
  const file = formData.get('file') as File;

  const payload: {
    title: string;
    file_id?: string;
  } = {
    title,
  };

  if (file) {
    const { fileMetadata } = await nhost.storage.upload({
      formData,
    });

    payload.file_id = fileMetadata?.processedFiles[0]?.id;
  }

  await nhost.graphql.request<InsertTodoMutation, InsertTodoMutationVariables>(
    InsertTodoDocument,
    payload,
  );

  redirect('/protected/todos');
};
