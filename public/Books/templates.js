import {html} from 'https://esm.run/lit-html@1';

export const rowTemplate = (_id, title, author, genre, borrow) => {
    return html `
        <tr> 
            <td class="col md-1" align = "center"><a href="/editbook/${_id}"><i class="far fa-edit"></i></a></td>
            <td class="col md-3">${title}</td>
            <td class="col md-3">${author}</td>
            <td class="col md-3">${genre}</td> 
            <td class="col md-3">${borrow}</td>
        </tr>`;
}


export const tableTemplate = (allBooks) => {
    return html `
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
}