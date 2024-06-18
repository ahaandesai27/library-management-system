import {html} from 'https://esm.run/lit-html@1';
import {formatDate} from './formateDate.js';


export const rowTemplate = (_id, name, contact, join_date, renewal_date) => {
    return html `
        <tr> 
            <td class="col md-1" align = "center"><a href="/editmember/${_id}"><i class="far fa-edit"></i></a></td>
            <td class="col md-3">${name}</td>
            <td class="col md-3">${contact}</td>
            <td class="col md-3">${formatDate(join_date)}</td> 
            <td class="col md-3">${formatDate(renewal_date)}</td>
        </tr>`;
}


export const tableTemplate = (allMembers) => {
    return html `
            <div class="d-flex justify-content-around">
                <div>
                    <a type="button" class="btn btn-secondary" href='/addmember'>Add Member</a>
                </div>
                <div>
                    <form action="/search" method="get">
                        <input type="search" id="searchMember" placeholder="Search Member">
                        <button type="button" class="btn btn-secondary searchSubmitMember" id="searchSubmit">Search</button>
                    </form>
                </div>
            </div>
            <div class="pt-5">
                <table class="table table-hover table-bordered table-dark pt-4">
                    <thead>
                        <tr class="table-info"> 
                            <th class="col md-1">Modify</th>
                            <th class="col md-3">Name</th>
                            <th class="col md-3">Contact</th>
                            <th class="col md-3">Join Date</th> 
                            <th class="col md-3">Renewal Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${allMembers}
                    </tbody>
                </table>
            </div>
            `;
}