const viewBooksButton = document.getElementById('viewBooks');
const table = document.getElementById('table'); 
const tableBody = document.querySelector('#table-body');
const showBooks = async () => {
    try {
        const response = await axios.get('api/books');
        const books = response.data.books;
        console.log(books); 
        const allBooks = books.map((book) => {
            const {title, author, genre, borrowed} = book;
            let borrow = book.borrowed ? 'Yes': 'No';
            return `
            <tr> 
                <th scope="col">${title}</div>
                <th scope="col">${author}</div>
                <th scope="col">${genre}</div> 
                <th scope="col">${borrow}</div>
            </div>`
        }).join('');

        tableBody.innerHTML = allBooks;
    }
    catch (error) {
        console.log(error);
        tableBody.innerHTML = `<div class="col">No books found</div>`;
    }
}

viewBooksButton.addEventListener('click', showBooks);