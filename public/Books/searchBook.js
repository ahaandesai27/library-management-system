const tableDiv = document.getElementById('table-div');
import {html, render} from 'https://esm.run/lit-html@1';
import {rowTemplate, tableTemplate} from './templates.js';
 

document.body.addEventListener('click', async (e) => {
    if (e.target.classList.contains('searchSubmit')) {
        e.preventDefault();
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
            const template = html`
                <div class="d-flex justify-content-around">
                
                    <div>
                        <a type="button" class="btn btn-secondary" href='/addbook'>Add Book</a>
                    </div>

                    <div>
                        <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">
                            Sort By
                        </button>
                        <ul class="dropdown-menu">
                            <li><button class="dropdown-item" id="sort-by-title">Title</button></li>
                            <li><button class="dropdown-item" id="sort-by-author">Author</button></li>
                            <li><button class="dropdown-item" id="sort-by-genre">Genre</button></li>
                        </ul>
                    </div>

                    <div>
                        <form method="get">
                            <input type="search" id="searchBook" name="${name}" placeholder="Search by ${name}">
                            <button type="submit" class="btn btn-secondary searchSubmit" id="searchSubmit">Search</button>
                        </form>
                    </div>
                </div>
                    
                <div class="pt-5">
                    <h1>No books found!</h1>
                </div>
        
            `
            render(template, tableDiv);
        }
    }
});

