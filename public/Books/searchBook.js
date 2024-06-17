const tableDiv = document.getElementById('table-div');
import {html, render} from 'https://esm.run/lit-html@1';
import {rowTemplate, tableTemplate} from './templates.js';
 

document.body.addEventListener('click', async (e) => {
    if (e.target.classList.contains('searchSubmit')) {
        try {
            const {name, value} = document.getElementById('searchBook');
            const request = `api/books/search?${name}=${value}`;
            const response = await axios.get(request);
            const books = response.data;
            const allBooks = books.map((book) => {
                const {_id, title, author, genre, borrowed} = book;
                let borrow = borrowed ? 'Yes' : 'No';
                return rowTemplate(_id, title, author, genre, borrow);
            })
            const template = tableTemplate(allBooks, name);
            render(template, tableDiv);
        }
        catch (error) {
            console.log(error);
            const template = html`<div class="col">An error occurred.</div>`;
            render(template, tableDiv);
        }
    }
});

