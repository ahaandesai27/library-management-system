import {formatDate, parseDate} from '../Members/formatDate.js';

const url = window.location.href.split('/');
const id = url[4];
async function getMember() {
    try {
        const response = await axios.get(`http://localhost:5000/api/members/${id}`);
        const member = response.data;
        const {name} = member;
        document.getElementById('header').innerText = `Transactions for ${name}`;
    } catch (error) {
        console.log(error);
    }
}

async function fetchTransactionData(transaction) {
    const {_id, book_id, issue_date, return_date, fine_amount} = transaction;
    try {
        const bookResponse = await axios.get(`http://localhost:5000/api/books/${book_id}`);
        const { title } = bookResponse.data;
        return `<tr>
                    <td align="center"><a href='/transactions/modify/${_id}'><i class="far fa-edit"></i></td>
                    <td>${_id}</td>
                    <td>${title}</td>
                    <td>${formatDate(issue_date)}</td>
                    <td>${formatDate(return_date)}</td>
                    <td>${fine_amount}</td>
                </tr>`;
    } catch (error) {
        console.error(`Error fetching book ${book_id}:`, error);
        return ''; // Return empty string or handle error case
    }
}

async function displayTransactions(transactions) {
    try {
        const promises = transactions.map(fetchTransactionData);
        const transactionRows = await Promise.all(promises);
        console.log(transactionRows)
        if (transactionRows) {
            document.getElementById('table-body').innerHTML = ` <tr class="table-info">
                <th scope="col">Modify</th>
                <th scope="col">Transaction ID</th>
                <th scope="col">Book Title</th>
                <th scope="col">Issue Date</th>
                <th scope="col">Return Date</th>
                <th scope="col">Fine Amount</th>
                </tr>` + transactionRows.join('');
        }
        else {
            document.getElementById('table-body').innerHTML = `<tr><td>No transactions found</td></tr>`;
        }
                    
            
    } catch (error) {
        console.error('Error displaying transactions:', error);
    }
}

$(document).ready( async () => {
    try {
        await getMember();
        const response = await axios.get(`http://localhost:5000/api/members/${id}/transactions`);
        const transactions = response.data;
        console.log(transactions)
        if (transactions.length > 0) {
            await displayTransactions(transactions);
        }
        else {
            document.getElementById('table-wrapper').innerHTML = `<h3 class="ps-5">No transactions found</h3>`
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }
});