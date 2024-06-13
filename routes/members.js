const express = require('express');
const Router = express.Router();    
const {getMembers, addMember, getMember, updateMember, deleteMember} = require('../controllers/members.js');

Router.route('/').get(getMembers).post(addMember);
Router.route('/:id').get(getMember).patch(updateMember).delete(deleteMember);

module.exports = Router;