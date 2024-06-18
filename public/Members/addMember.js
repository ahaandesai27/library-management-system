$(document).ready(() => {
    $('#submitButton').click(async (e) => {
        e.preventDefault();
        const name = $('#member-name').val();
        const contact = $('#member-contact').val();
        try {
            await axios.post('/api/members', {name, contact});
            $('#member-name').val('');
            $('#member-contact').val('');
            alert('Member added successfully');
        }
        catch (error) {
            console.log(error);
            alert('An error occured');
        }
    })
});