const tableDiv = document.getElementById('table-div');
import {html, render} from 'https://esm.run/lit-html@1';
import {rowTemplate, tableTemplate} from './templates.js';
 
const sortBooks = async (query) => {
    try {
        const request = `api/books/sort?query=${query}`;
        const response = await axios.get(request);
        const books = response.data.books;
        const allBooks = books.map((book) => {
            const {_id, title, author, genre, borrowed} = book;
            let borrow = borrowed ? 'Yes' : 'No';
            return rowTemplate(_id, title, author, genre, borrow);
        })
        const template = tableTemplate(allBooks, query);
        render(template, tableDiv);
    }
    catch (error) {
        console.log(error);
        const template = html`<div class="col">An error occurred.</div>`;
        render(template, tableDiv);
    }
}

document.getElementById('viewBooks').addEventListener('click', () => sortBooks('title'));
document.body.addEventListener('click', async (e) => {
    if (e.target.classList.contains('dropdown-item')) {
        const sortBy = e.target.id;
        
        switch (sortBy) {
            case 'sort-by-title':
                sortBooks('title');
                break;
            case 'sort-by-author':
                sortBooks('author');
                break;
            case 'sort-by-genre':
                sortBooks('genre');
                break;
            default:
                break;
        }
    }
});