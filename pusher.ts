// Singleton pattern
//  the singleton pattern is a software design pattern that restricts the instantiation of a class to a singular instance.

import Pusher from 'pusher';
import ClientPusher from 'pusher-js';
console.log(typeof process.env.NEXT_PUBLIC_PUSHER_SECRET);
export const serverPusher = new Pusher({
  appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  // Should be handled on server side
  secret: process.env.NEXT_PUBLIC_PUSHER_SECRET!,
  cluster: 'ap2',
  useTLS: true,
});

export const clientPusher = new ClientPusher(
  process.env.NEXT_PUBLIC_PUSHER_KEY!,
  {
    cluster: 'ap2',
    forceTLS: true,
  }
);
