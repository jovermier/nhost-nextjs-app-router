'use client';

import { deletePAT } from '~/app/server-actions/pat';
import { type AuthRefreshTokenTypes_Enum } from '~/generated/graphql';

export interface PAT {
  id: string;
  type: AuthRefreshTokenTypes_Enum;
  metadata?: jsonb | null | undefined;
  expiresAt: string | Date;
}

type Metadata = { name: string; [key: string]: jsonb };

function isMetadata(metadata: jsonb | null | undefined): metadata is Metadata {
  return typeof metadata === 'object' && metadata !== null && 'name' in metadata;
}

export default function PatItem({ pat }: { pat: PAT }) {
  const handleDeleteTodo = async () => {
    await deletePAT(pat.id);
  };

  const metadata = isMetadata(pat.metadata) ? pat.metadata : undefined;
  const name = metadata?.name ?? 'Unnamed';

  return (
    <div className="flex flex-row items-center justify-between bg-slate-100 p-2">
      <div>
        <span className="block w-full justify-center space-x-2 rounded">{name}</span>
        <span className="block w-full justify-center space-x-2 rounded text-sm">{pat.id}</span>
        <span className="block w-full justify-center space-x-2 rounded text-slate-500">
          expires on {new Date(pat.expiresAt).toLocaleDateString()}
        </span>
      </div>

      <button onClick={handleDeleteTodo}>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>
    </div>
  );
}
