import fetch from 'isomorphic-fetch';
import { useContext } from 'react';
import { AuthContext } from '../helpers/AuthContext';
import { SubscribeButton } from '../components/SubscribeButton';

export default function Home(props) {
  if (!props.books) return <p>Loading books...</p>;
  const auth = useContext(AuthContext);

  return (
    <>
      {props.books.map(book => (
        <div key={book._id} style={{ border: '1px solid black', borderRadius: '4px', margin: '4px', padding: '4px' }}>
          <h4>Title: {book.name}</h4>
          <b>Price: ${book.price}</b>
          <p>Text: {book.text}</p>
          <SubscribeButton bookId={book._id} />
        </div>
      ))}
    </>
  );
}

Home.getInitialProps = async ctx => {
  const res = await fetch('http://localhost:3000/api/v1/book/all');

  if (res.status === 200) {
    const books = await res.json();
    return { books };
  }

  return { books: [] };
};
