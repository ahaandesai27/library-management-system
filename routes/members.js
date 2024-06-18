const express = require('express');
const Router = express.Router();    
const {getMembers, addMember, getMember, updateMember, deleteMember, searchMember} = require('../controllers/members.js');
const {getMemberTransaction} = require('../controllers/transactions.js');

Router.route('/').get(getMembers).post(addMember);
Router.route('/search').get(searchMember); 
Router.route('/:id').get(getMember).patch(updateMember).delete(deleteMember);
Router.route('/:id/transactions').get(getMemberTransaction);

module.exports = Router;