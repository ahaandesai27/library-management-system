const url = window.location.href;
const id = url.substring(url.lastIndexOf('/') + 1);
const reqString = `../api/books/${id}`;

$(document).ready(async () => {
    try {
        console.log(reqString);
        const book = await axios.get(reqString);
        console.log(book);
        $('#book-title').val(book.data.title);
        $('#book-author').val(book.data.author);
        $('#book-genre').val(book.data.genre);
    }
    catch (error) {
        alert('An error occured');
    }

    $('#editButton').click(async (e) => {
        e.preventDefault();
        const title = $('#book-title').val();
        const author = $('#book-author').val();
        const genre = $('#book-genre').val();
        if (!title || !author || !genre) {
            alert("Please fill all fields");
            return;
        }
        try {
            await axios.patch(reqString, {title, author, genre});
            alert('Book edited successfully');
            $('#book-title').val('');
            $('#book-author').val('');
            $('#book-genre').val('');
        }
        catch (error) {
            alert('An error occured');
        }
    })

    $('#deleteButton').click(async (e) => {
        e.preventDefault();
        try {
            await axios.delete(reqString);
            alert('Book deleted successfully');
            $('#book-title').val('');
            $('#book-author').val('');
            $('#book-genre').val('');
        }
        catch (error) {
            alert('An error occured');
        }
    })
});