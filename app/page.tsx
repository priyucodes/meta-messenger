import { Message } from '../typings';
import ChatInput from './ChatInput';
import MessageList from './MessageList';

const HomePage = async () => {
  // we are in server, cant use relative url pathing
  // automatically update vercel url(system variable by vercel)when deployed

  const data = await fetch(
    `${process.env.VERCEL_URL || 'http://localhost:3000'}/api/getMessages`
  ).then(res => res.json());
  const messages: Message[] = data.messages;

  return (
    <main className="">
      <MessageList initialMessages={messages} />

      <ChatInput />
    </main>
  );
};
export default HomePage;
