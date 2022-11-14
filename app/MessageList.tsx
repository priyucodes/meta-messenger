'use client';
import useSwr from 'swr';
import { Message } from '../typings';
import fetcher from '../utils/fetchMessages';
import MessageComponent from './MessageComponent';
const MessageList = () => {
  // this only renders once unlike useEff for every req/dependencies change
  const {
    data: messages,
    error,
    mutate,
  } = useSwr<Message[]>('/api/getMessages', fetcher);
  return (
    <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
      {messages?.map(message => (
        <MessageComponent key={message.id} message={message} />
      ))}
    </div>
  );
};
export default MessageList;
