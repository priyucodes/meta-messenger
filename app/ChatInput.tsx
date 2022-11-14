'use client';

import { FormEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Message } from '../typings';
import useSwr from 'swr';
import fetcher from '../utils/fetchMessages';
const ChatInput = () => {
  const [input, setInput] = useState('');

  // We fetch the info in cache and the key to access cache is '/api/getMessages' we can name it anything
  const { data: messages, error, mutate } = useSwr('/api/getMessages', fetcher);
  // Optimistic updates, we tell them this is the value you are gonna have then in BG it will make async req
  // quickly updates to client makes fetch req in BG then replaces it after double checking if not it will rollback
  // client will see non blocking UI
  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input) return;

    const messageToSend = input;
    setInput('');

    const id = uuid();

    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: 'John Cena',
      profilePic:
        'https://scontent.fdel11-2.fna.fbcdn.net/v/t1.6435-9/69472937_2964432280448451_9093298325230190592_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=5gWot6mlZSoAX9t-mYo&_nc_ht=scontent.fdel11-2.fna&oh=00_AfCWfFukOlSiSdklYQdYJP4NSuhjV5DUK83hrkDJ2IoQVw&oe=63995313',
      email: 'saroj@gmail.com',
    };

    const uploadMessageToUpstash = async () => {
      const data = await fetch('/api/addMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      }).then(res => res.json());
      // console.log('Message added >', data);

      return [data.message, ...messages!];
    };

    // optimistically render it beforehand, when we know the value structure behore hand.
    // This is did optimistically update, for client they will see no delay, it might replace redux here, cuz no needd for state management.
    // This is really POWERFULL
    await mutate(uploadMessageToUpstash, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    });
  };

  return (
    <form
      onSubmit={addMessage}
      className="fixed bottom-0 w-full z-50 flex px-10 py-5 space-x-2 border-t border-gray-100 bg-white"
    >
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter message here..."
        className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-gray-300"
      />
      <button
        type="submit"
        disabled={!input}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
};
export default ChatInput;
