const bookSelect = document.getElementById('book-select');
const bookId = document.getElementById('book-id');

const memberSelect = document.getElementById('member-select');
const memberId = document.getElementById('member-id');

const form = document.getElementById('add-transaction');

async function populateDropdowns() {
    //Send get request to /books and /members
    try {
        let response = await axios.get('/api/books');
        const books= response.data.books;
        books.forEach((book) => {
            const {_id, title} = book;
            const option = document.createElement('option');
            option.text = title;
            option.value = _id;
            bookSelect.appendChild(option);
        }) 

        response = await axios.get('/api/members');
        const members = response.data.members;
        members.forEach((member) => {
            const {_id, name} = member;
            const option = document.createElement('option');
            option.text = name;
            option.value = _id;
            memberSelect.appendChild(option);
        })
    } catch (error) {
        console.log(error);
        alert("An error occured.");
    }
}
document.addEventListener('DOMContentLoaded', populateDropdowns);

bookId.addEventListener('onchange', () => {
    //appropriate val from bookId, set to dropdown
    //have to fix
    //dk if correct
})


memberId.addEventListener('onchange', () => {
    //appropriate val from memberId, set to dropdown
    //have to fix
    //dk if correct
})

bookSelect.addEventListener('onchange' ,() => {
    bookId.value = bookSelect.value;        //need check
})
memberSelect.addEventListener('onchange', () => {
    memberId.value = memberSelect.value;
})


async function addTransaction() {
    try {
        const book = parseInt(bookId.value);
        const member = parseInt(memberId.value);
        
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