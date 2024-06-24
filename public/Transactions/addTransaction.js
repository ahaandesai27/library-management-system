const bookSelect = document.getElementById('book-select');
const bookId = document.getElementById('book-id');

const memberSelect = document.getElementById('member-select');
const memberId = document.getElementById('member-id');

const form = document.getElementById('add-transaction');

async function populateDropdowns() {
    //Send get request to /books and /members
    try {
        let response = await axios.get('/api/books/inlibrary');
        const books= response.data.books;
        console.log(books);
        books.forEach((book) => {
            const {_id, title} = book;
            const option = document.createElement('option');
            option.text = title;
            option.value = _id;
            bookSelect.appendChild(option);
        }) 

        response = await axios.get('/api/members');
        const members = response.data.Members;
        console.log(members);
        members.forEach((member) => {
            const {_id, name} = member;
            const option = document.createElement('option');
            option.text = name;
            option.value = _id;
            memberSelect.appendChild(option);
        })
    } catch (error) {
        console.log(error);
    }
}
document.addEventListener('DOMContentLoaded', populateDropdowns);

bookSelect.addEventListener('change', () => {
    bookId.value = bookSelect.value;
});

memberSelect.addEventListener('change', () => {
    memberId.value = memberSelect.value;
});

bookId.addEventListener('change', () => {
    bookSelect.value = bookId.value;
});

memberId.addEventListener('change', () => {
    memberSelect.value = memberId.value;
});


async function addTransaction(e) {
    e.preventDefault();
    try {
        const book = bookId.value;
        const member = memberId.value;
        console.log(book, member);
        
        const {err} = await axios.post(`/api/transactions/add?book_id=${book}&member_id=${member}`)

        if (err) {
            alert(err);
        }

        alert("Transaction successful.");
    } catch(error) {
        console.log(error);
        alert("An error occured");
    }
}

form.addEventListener('submit', addTransaction);