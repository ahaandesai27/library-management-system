const tableDiv = document.getElementById('table-div');
import {html, render} from 'https://esm.run/lit-html@1';

const sortBooks = async (arg) => {
    try {
        const request = `api/books/sort?query=${arg}`;
        const response = await axios.get(request);
        const books = response.data.books;
        const allBooks = books.map((book) => {
            const {_id, title, author, genre, borrowed} = book;
            let borrow = borrowed ? 'Yes' : 'No';
            return html`
            <tr> 
                <td class="col md-1" align = "center"><a href="/editbook/${_id}"><i class="far fa-edit"></i></a></td>
                <td class="col md-3">${title}</td>
                <td class="col md-3">${author}</td>
                <td class="col md-3">${genre}</td> 
                <td class="col md-3">${borrow}</td>
            </tr>`;
        });
        
        const template = html`
        <div class="centered-btn-group">
            <div class="dropdown">
                <a type="button" class="btn btn-secondary" href='/addbook'>
                    Add Book
                </a>
                <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">
                    Sort By
                </button>
                <ul class="dropdown-menu">
                    <li><button class="dropdown-item" id="sort-by-title">Title</button></li>
                    <li><button class="dropdown-item" id="sort-by-author">Author</button></li>
                    <li><button class="dropdown-item" id="sort-by-genre">Genre</button></li>
                </ul>
            </div>
        </div>
        <div class="pt-5">
            <table class="table table-hover table-bordered table-dark pt-4">
                <thead>
                    <tr class="table-info"> 
                        <th class="col md-1">Modify</th>
                        <th class="col md-3">Title</th>
                        <th class="col md-3">Author</th>
                        <th class="col md-3">Genre</th> 
                        <th class="col md-3">Borrowed</th>
                    </tr>
                </thead>
                <tbody>
                    ${allBooks}
                </tbody>
            </table>
        </div>
        `;
        render(template, tableDiv);
    }
    catch (error) {
        console.log(error);
        const string = html`<div class="col">An error occurred.</div>`;
        render(string, tableDiv);
    }
}

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
