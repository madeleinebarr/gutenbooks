import React from 'react';

function BookPage(props) {
    let LSpropsObject;
    let bookid = props.match.params.bookid;

    const getBookId = () => {
            console.log('getting object id');
            console.log(bookid);
    }
    getBookId();

    const restoreFromLocalStorage = () => {
        LSpropsObject = JSON.parse(localStorage.getItem(`book${bookid}`));
        console.log(LSpropsObject);
    }

    restoreFromLocalStorage();

    function reverseName(name) {
        return name.split(", ").reverse().join(" ");        
    }

    const author = LSpropsObject.authors.length === 0 ? '' : `Author: ${reverseName(LSpropsObject.authors[0].name)}, ${LSpropsObject.authors[0].birth_year} - ${LSpropsObject.authors[0].death_year}`;

    const readInBrowser =  LSpropsObject.formats["text/html"] || LSpropsObject.formats["text/html; charset=iso-8859-1"] || LSpropsObject.formats["text/html; charset=us-ascii"] || LSpropsObject.formats["text/html; charset=utf-8"];


    const readAppleBooks = LSpropsObject.formats["application/epub+zip"];

    const readKindle = LSpropsObject.formats["application/x-mobipocket-ebook"];

    return (
        <div className="bookpage">
            <h1>{LSpropsObject.title}</h1>
            <p><i>{author}</i></p>
            <p><b>Download count</b> in the last 30 days: {LSpropsObject.download_count.toLocaleString()}</p>
            <p><b>Reading options:</b> (they may take a moment to load!)</p>
            <ul>
            <li><a href={readInBrowser} target="_blank" rel="noreferrer">Read in your browser</a></li>
            <li><a href={readAppleBooks} target="_blank" rel="noreferrer">Read via Apple Books</a> (will start download)</li>
            <li><a href={readKindle} target="_blank" rel="noreferrer">Read via Kindle</a> (will start download, can be transmitted to Kindle via USB or email)</li>
            </ul>
            
            <p><b>Subjects:</b></p>
            <ul>
                {LSpropsObject.subjects.map(subject => (
                    <li key={subject}>{subject}</li>
                ))}
            </ul>
            
            <div>
            {LSpropsObject.bookshelves.length === 0 ?
            '' :
            <p><b>Bookshelves:</b></p>
            }
            
            <ul>
                {LSpropsObject.bookshelves.map(bookshelf => (
                    <li key={bookshelf}>{bookshelf}</li>
                ))}
            </ul>
            </div>

          
            
        </div>
    )
}

export default BookPage;