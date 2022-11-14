'use client';
import { useEffect } from 'react';
import useSwr from 'swr';
import { clientPusher } from '../pusher';
import { Message } from '../typings';
import fetcher from '../utils/fetchMessages';
import MessageComponent from './MessageComponent';
type Props = {
  initialMessages: Message[];
};
const MessageList = ({ initialMessages }: Props) => {
  // this only renders once unlike useEff for every req/dependencies change
  const {
    data: messages,
    error,
    mutate,
  } = useSwr<Message[]>('/api/getMessages', fetcher);

  useEffect(() => {
    const channel = clientPusher.subscribe('messages');
    channel.bind('new-message', async (data: Message) => {
      // if you sent the message, no need to update your cache.
      if (messages?.find(message => message.id === data.id)) return;
      // normal updates
      if (!messages) {
        mutate(fetcher);
      } else {
        // Optimistic updates
        mutate(fetcher, {
          optimisticData: [data, ...messages!],
          rollbackOnError: true,
        });
      }
    });

    // Cleanup function (runs when component is unmounted and before every new useEff)
    // https://blog.logrocket.com/understanding-react-useeffect-cleanup-function/

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, mutate, clientPusher]);
  return (
    <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
      {(messages || initialMessages).map(message => (
        <MessageComponent key={message.id} message={message} />
      ))}
    </div>
  );
};
export default MessageList;
