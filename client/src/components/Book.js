import React from 'react';
import { Link } from 'react-router-dom';

function Book(props) {

    const mirrorToLocalStorage = () => {
        localStorage.setItem(`book${props.id}`, JSON.stringify(props));
    }

    const goToBook = (event) => {
        mirrorToLocalStorage();
    }

    function reverseName(name) {
        return name.split(", ").reverse().join(" ");        
    }

    const author = props.authors.length === 0 ? '' : ` by ${reverseName(props.authors[0].name)}`;

    return (
        <li key={props.id}>
            <Link to={{
                        pathname: `book/${props.id}`,
                        }} 
                        target="_blank" 
                        rel='noopener noreferrer'
                        onClick={goToBook}>
            {props.title}</Link> {author}</li>

    )
}

export default Book;