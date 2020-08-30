import fetch from 'isomorphic-fetch';
import { useCallback, useContext } from 'react';
import { AuthContext } from '../helpers/AuthContext';

export function SubscribeButton({ bookId }) {
  const auth = useContext(AuthContext);
  const isSigned = !!auth.user;

  const subscribe = useCallback(async () => {
    if (!isSigned) return;

    const subscription = await fetch('http://localhost:3000/api/v1/subscription/start', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookId,
        userId: auth.user._id,
      }),
    }).then(res => res.json());

    auth.updateUser({
      ...auth.user,
      subscriptions: [...auth.user.subscriptions, subscription],
    });
  }, [bookId, auth]);

  const unsubscribe = useCallback(async () => {
    if (!isSigned) return;

    const subscription = await fetch('http://localhost:3000/api/v1/subscription/end', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookId,
        userId: auth.user._id,
      }),
    }).then(res => res.json());

    auth.updateUser({
      ...auth.user,
      subscriptions: auth.user.subscriptions.filter(s => s._id !== subscription._id),
    });
  }, [bookId, auth]);

  if (!isSigned) {
    return <button disabled>Subscribe (log in to subscribe)</button>;
  }

  const { subscriptions } = auth.user;
  const isSubscribed = subscriptions.find(s => s.bookId === bookId);

  if (isSubscribed) {
    return <button onClick={unsubscribe}>Unsubscribe</button>;
  }

  return <button onClick={subscribe}>Subscribe</button>;
}
