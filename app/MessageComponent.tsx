import { unstable_getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Message } from '../typings';
import TimeAgo from 'react-timeago';
type Props = {
  message: Message;
  // session: any;
};
const MessageComponent = ({ message }: Props) => {
  // This will happen in client (it is a client component because its parent(where it is being rendered from) is a client component) so it inherits the client behavior.
  const { data: session } = useSession();
  const isUser = session?.user?.email === message.email;
  return (
    <div className={`flex w-fit ${isUser && 'ml-auto'}`}>
      <div className={`flex-shrink-0 ${isUser && 'order-2'}`}>
        <Image
          className="rounded-full mx-2"
          height={10}
          width={50}
          src={message.profilePic}
          alt={`${message.username} picture` || 'Profile Pic'}
        />
      </div>

      <div>
        <p
          className={`text-[0.65rem] px-[2px] pb-[2px] ${
            isUser ? 'text-blue-400 text-right' : ' text-red-400 text-left'
          }`}
        >
          {message.username}
        </p>

        <div className="flex items-end">
          <div
            className={`px-3 py-2 rounded-lg w-fit text-white ${
              isUser ? 'bg-blue-400 ml-auto order-2' : 'bg-red-400'
            }`}
          >
            <p>{message.message}</p>
          </div>
          <p
            className={`text-[.65rem] italic px-2 text-gray-300 ${
              isUser && 'text-right'
            }`}
          >
            {/* Caused some hydration error where server client text mismatch */}
            {/* {new Date(message.created_at).toLocaleString()} */}
            <TimeAgo date={new Date(message.created_at)} />
          </p>
        </div>
      </div>
    </div>
  );
};
export default MessageComponent;
