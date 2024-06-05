'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { twMerge } from 'tailwind-merge';

import {
  InsertTodoDocument,
  type InsertTodoMutation,
  type InsertTodoMutationVariables,
} from '~/generated/graphql';
import Input from '~/components/input';

export default function TodoForm() {
  const router = useRouter();
  const [addTodo, { loading }] = useMutation<InsertTodoMutation, InsertTodoMutationVariables>(
    InsertTodoDocument,
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      addTodo({
        variables: {
          title: formData.get('title') as string,
        },
        refetchQueries: ['GetTodos'],
      })
        .then((res) => {
          console.log(res);
          if (res.errors) {
            console.log(res.errors);
          } else {
            router.push('/protected/todos');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    [addTodo, router],
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <Input
        id="title"
        name="title"
        required
        placeholder="What needs to be done"
        className="w-full"
      />

      <Input id="file" name="file" type="file" className="w-full" accept="image/*" />

      <button
        type="submit"
        disabled={loading}
        className={twMerge(
          loading
            ? 'bg-indigo-200 hover:bg-grey-700'
            : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
          'inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none',
        )}
      >
        Add
      </button>
    </form>
  );
}
