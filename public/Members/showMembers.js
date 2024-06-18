const tableDiv = document.getElementById('table-div');
import {html, render} from 'https://esm.run/lit-html@1';
import {rowTemplate, tableTemplate} from './templates.js';
 
const showMembers = async () => {
    try {
        const request = `api/members/`;
        const response = await axios.get(request);
        console.log(response);
        const members = response.data.Members;
        const allMembers = members.map((member) => {
            const {_id, name, contact, join_date, renewal_date} = member;
            return rowTemplate(_id, name, contact, join_date, renewal_date);
        })
        const template = tableTemplate(allMembers);
        render(template, tableDiv);
    }
    catch (error) {
        console.log(error);
        const template = html`<div class="col">An error occurred.</div>`;
        render(template, tableDiv);
    }
}

document.getElementById('viewMembers').addEventListener('click', () => showMembers());
