// tells nextjs that this is a client component and gives access to client apis and stuff
'use client';

import { signOut } from 'next-auth/react';

const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Sign Out
    </button>
  );
};
export default LogoutButton;
