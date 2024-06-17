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
        $('#book-borrowed').prop('checked', book.data.borrowed);
    }
    catch (error) {
        console.log(error);
        alert('An error occured');
    }

    $('#editButton').click(async (e) => {
        e.preventDefault();
        const title = $('#book-title').val();
        const author = $('#book-author').val();
        const genre = $('#book-genre').val();
        const borrowed = $('#book-borrowed').prop('checked');
        try {
            await axios.patch(reqString, {title, author, genre, borrowed});
            alert('Book edited successfully');
            $('#book-title').val('');
            $('#book-author').val('');
            $('#book-genre').val('');
            $('#book-borrowed').prop('checked', false);
        }
        catch (error) {
            console.log(error);
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
            $('#book-borrowed').prop('checked', false);
        }
        catch (error) {
            console.log(error);
            alert('An error occured');
        }
    })
});