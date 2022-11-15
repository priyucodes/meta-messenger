import { unstable_getServerSession } from 'next-auth';
import Image from 'next/image'; // next 13
import Link from 'next/link';
import LogoutButton from './LogoutButton';
// import Image from 'next/legacy/image'; // next 12 will be removed soon

const Header = async () => {
  const session = await unstable_getServerSession();

  // Can easily refactor it by conditionally rendering it inside the main jsx
  if (session)
    return (
      //  max-w-screen-2xl mx-auto
      <header className="sticky top-0 z-50 bg-white flex justify-between items-center p-10 shadow-sm">
        <div className="flex space-x-2">
          <Image
            // session?.user?.image
            src={session.user?.image!}
            height={10}
            width={50}
            className="rounded-full mx-2 object-contain"
            alt="Profile Picture"
          />
          <div className="">
            <p className="text-blue-500">Logged in as:</p>
            <p className="font-bold text-lg">{session.user?.name}</p>
          </div>
        </div>

        {/* When u have any interactive activity/element like logout button it has to be a client coomponent*/}
        <LogoutButton />
      </header>
    );
  return (
    <header className="sticky top-0 z-50 bg-white flex justify-center items-center p-10 shadow-sm">
      <div className="flex flex-col items-center space-y-5">
        <div className="flex space-x-2 items-center">
          <Image
            src="https://links.papareact.com/jne"
            height={10}
            width={50}
            alt="meta-logo"
          />
          <p className="text-blue-400">Welcome to Meta Messenger</p>
        </div>

        <Link
          href="/auth/signin"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
};
export default Header;
