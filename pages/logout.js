import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, []);

  return <p>Logging out...</p>;
}

Logout.getInitialProps = function getInitialProps(ctx) {
  destroyCookie(ctx, 'authorization');
};
