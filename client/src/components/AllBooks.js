import React, { Fragment, useEffect, useState } from 'react';
import Book from './Book';

// class AllBooks extends React.Component {
//     render() {
//         return (
//             <Fragment>
//             <p>Explore by subject -- Explore by time period -- explore by author</p>
//             <h3>Top books:</h3>
//             <div className="booklist">
//                 <ol>
//                     <li>Frankstein by Marry Wollstonecraft Shelley</li>
//                     <li>The Great Gatsby by F. Scott Fitzgerald</li>
//                     <li>A Tale of Two Cities by Charles Dickens</li>
//                 </ol>
//             </div>
//             </Fragment>
//         )
//     }
// }

const AllBooks = (props) => {
    const [books, setBooks] = useState([]);

    const booksendpoint = "https://4rrplj.deta.dev/orderedbooks";

    const getBooks = async () => {
        try {
            let response = await fetch(booksendpoint);
            const jsonData = await response.json();
            setBooks(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <Fragment>
            <ol className="booklist">
                {books.map(book => (
                    <Book
                    key={book.id}
                    title={book.title}
                    authors={book.authors}
                    id={book.id}
                    download_count={book.download_count}
                    formats={book.formats}
                    subjects={book.subjects}
                    bookshelves={book.bookshelves}
                    />
                    
                ))}
            </ol>
        </Fragment>
    )
}

export default AllBooks;