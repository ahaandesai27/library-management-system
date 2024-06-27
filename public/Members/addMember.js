$(document).ready(() => {
    $('#submitButton').click(async (e) => {
        e.preventDefault();
        const name = $('#member-name').val();
        const contact = $('#member-contact').val();
        if (!name || !contact) {
            alert("Please fill all fields");
            return;
        }
        try {
            await axios.post('/api/members', {name, contact});
            alert('Member added successfully');
            $('#member-name').val('');
            $('#member-contact').val('');
        }
        catch (error) {
            alert('An error occured');
        }
    })
});