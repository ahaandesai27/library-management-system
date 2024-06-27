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
        books.forEach((book) => {
            const {_id, title} = book;
            const option = document.createElement('option');
            option.text = title;
            option.value = _id;
            bookSelect.appendChild(option);
        }) 

        response = await axios.get('/api/members');
        const members = response.data.Members;
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
    
    if (!bookId.value || !memberId.value) {
        alert("Please select a book and a member");
        return;
    }
    
    try {
        const book = bookId.value;
        const member = memberId.value;
        console.log(book, member);
        
        const response = await axios.post(`/api/transactions/add?book_id=${book}&member_id=${member}`);
        
        alert("Transaction successful.");
    } catch (error) {
        if (error.response) {
            if (error.response.status === 400) {
                console.log(error.response.data);
                alert(error.response.data.err);
            } else {
                alert("An error occurred: " + error.response.data.err);
            }
        } else {
            console.error("Error in addTransaction:", error);
            alert("An error occurred");
        }
    }
    
    location.reload();
}

form.addEventListener('submit', addTransaction);
