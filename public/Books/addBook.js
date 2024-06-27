$(document).ready(() => {
    $('#submitButton').click(async (e) => {
        e.preventDefault();
        const title = $('#book-title').val();
        const author = $('#book-author').val();
        const genre = $('#book-genre').val();
        if (!title || !author || !genre) {
            alert("Please fill all fields!");
            return;
        }
        try {
            await axios.post('/api/books', {title, author, genre});
            $('#book-title').val('');
            $('#book-author').val('');
            $('#book-genre').val('');
            alert('Book added successfully');
        }
        catch (error) {
            console.log(error);
            alert('An error occured');
        }
    })
});