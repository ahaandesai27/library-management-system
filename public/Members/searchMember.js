const tableDiv = document.getElementById('table-div');
import {html, render} from 'https://esm.run/lit-html@1';
import {rowTemplate, tableTemplate} from './templates.js';
 

document.body.addEventListener('click', async (e) => {
    if (e.target.classList.contains('searchSubmitMember')) {
        try {
            const value = document.getElementById('searchMember').value;
            const request = `api/members/search?name=${value}`;
            console.log(request);
            const response = await axios.get(request);
            const members = response.data;
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
});

