'use client';

import { type ButtonHTMLAttributes, type DetailedHTMLProps } from 'react';
import { useFormStatus } from 'react-dom';
import { twMerge } from 'tailwind-merge';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset' | undefined;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export default function SubmitButton({
  disabled,
  type,
  className,
  children,
  ...rest
}: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type={type}
      disabled={disabled ?? pending}
      className={twMerge(
        pending
          ? 'hover:bg-grey-700 bg-indigo-200'
          : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
        className,
        'inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none',
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
