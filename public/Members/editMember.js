const url = window.location.href;
const id = url.substring(url.lastIndexOf('/') + 1);
const reqString = `../api/members/${id}`;
import { formatDate, parseDate } from "./formateDate.js";

$(document).ready(async () => {
    try {
        console.log(reqString);
        const member = await axios.get(reqString);
        $('#member-contact').val(member.data.contact);
        $('#member-name').val(member.data.name);
        $('#member-join_date').val(formatDate(member.data.join_date));
        $('#member-renew_date').val(formatDate(member.data.renewal_date));
        $('#member-renew').prop('checked', member.data.renewal);
    }
    catch (error) {
        console.log(error);
        alert('An error occured');
    }

    $('#editButton').click(async (e) => {
        e.preventDefault();
        const name = $('#member-name').val();
        const contact = $('#member-contact').val();
        const join_date = parseDate($('#member-join_date').val());
        const renewal_date = parseDate($('#member-renew_date').val());
        const renewal = $('#member-renew').prop('checked');
        if (!name || !contact || !join_date || !renewal_date) {
            alert('Please fill all fields');
            return;
        }
        try {
            await axios.patch(reqString, {name, contact, join_date, renewal_date, renewal});
            alert('Member edited successfully');
            $('#member-name').val('');
            $('#member-contact').val('');
            $('#member-join_date').val('');
            $('#member-renew_date').val('');
            $('#member-renew').prop('checked', false);
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
            alert('Member deleted successfully');
            $('#member-name').val('');
            $('#member-contact').val('');
            $('#member-join_date').val('');
            $('#member-renew_date').val('');
            $('#member-renew').prop('checked', false);
        }
        catch (error) {
            console.log(error);
            alert('An error occured');
        }
    })
});