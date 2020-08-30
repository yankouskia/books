import { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../helpers/AuthContext';

export function Header() {
  const auth = useContext(AuthContext);

  return (
    <header>
      <ul style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>

        {!auth.user && (
          <li>
            <a href="/api/v1/auth">Click here to login</a>
          </li>
        )}
        {auth.user && (
          <li>
            <p>Hello, {auth.user.fullname}!</p>
            <a href="/logout">Click here to log out</a>
          </li>
        )}
      </ul>
    </header>
  );
}
