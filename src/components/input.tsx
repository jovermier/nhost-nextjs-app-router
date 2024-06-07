'use client';

import { type DetailedHTMLProps, type HTMLProps } from 'react';
import { useFormStatus } from 'react-dom';

export default function Input({
  id,
  type,
  name,
  label,
  required,
  className,
  ...rest
}: DetailedHTMLProps<HTMLProps<HTMLInputElement>, HTMLInputElement>) {
  const { pending } = useFormStatus();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, ...restOfInputProps } = rest;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        name={name}
        required={required}
        disabled={pending}
        className="block w-full rounded-md border border-slate-300 p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        {...restOfInputProps}
      />
    </div>
  );
}
