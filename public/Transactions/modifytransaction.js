import {formatDate, parseDate} from '../Members/formateDate.js'

let id;
$(document).ready(() => {
    //Get Transaction Data
    const transaction_id = window.location.href.split('/').at(-1);
    console.log(transaction_id)
    if (transaction_id && transaction_id != "modify"){
        $('#transaction-id').val(transaction_id);
    }

    $('#get-transaction').click(async (e) => {
        try {
            id = $('#transaction-id').val();
            let response;
            try {
                response = await axios.get(`/api/transactions/${id}`);
                console.log(response);
            } 
            catch (error) {
                if (error.response.status == 404) {
                    alert("Transaction not found!");
                    return;
                }
            }
            
            const { book_id, member_id, issue_date, return_date, fine_amount } = response.data;
    
            $('#book-id').val(book_id);
            $('#member-id').val(member_id);
            $('#issue-date').val(formatDate(issue_date).split('-').reverse().join('-'));
            $('#return-date').val(formatDate(return_date).split('-').reverse().join('-'));
            $('#fine-amount').val(fine_amount);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                alert("Transaction not found!");
            } else {
                alert("An error occurred");
            }
        }
    });

    $('#editButton').click(async (e) => {
        e.preventDefault();
        const issue_date = $('#issue-date').val();
        const return_date = $('#return-date').val();
        const fine_amount = $('#fine-amount').val();

        console.log(issue_date, return_date);

        try {
            await axios.patch(`/api/transactions/${id}`, {issue_date, return_date, fine_amount});
            alert("Edited successfully!");
            $('#book-id').val('');
            $('#book-id').val(''); 
            $('#issue-date').val('');           //check
            $('#return-date').val('');
            $('#fine-amount').val('');

        } catch (error) {
            alert("An error occured");
        }
    })

    $('#deleteButton').click(async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`/api/transactions/${transaction_id}`);
            alert("Deleted successfully!");
            $('#book-id').val('');
            $('#member-id').val(''); 
            $('#issue-date').val('');           //check
            $('#return-date').val('');
            $('#fine-amount').val('');
        } catch (error) {
            console.log(error);
            alert("An error occured");
            //TODO: The deletion works but the server sends another response after that.
        }
    })
});