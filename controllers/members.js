const Members = require('../schema/members.js');
const wrap = require('express-async-wrapper');


const addMember = wrap(async (req, res) => {
    const exists = Members.isThisContact(req.body.contact);
    if (exists) {
        res.status(500).send("Contact number already exists");
    }
    const member = await Members.create(req.body);
    await member.save();
    res.status(201).json(member);
});

const getMembers = wrap(async (req, res) => {
    const members = await Members.find({});
    const length = members.length;
    res.status(200).json(
        {"Members": members, "Number": length});
});

const getMember = wrap(async (req, res) => {
    const member = await Members.findById(req.params.id);   
    res.status(200).json(member);
});

const deleteMember = wrap(async (req, res) => {
    const member = await Members.findOneAndDelete({_id: req.params.id});   
    res.status(200).json(member);
});

const updateMember = wrap(async (req, res) => {   
    const book  = await Members.findOneAndUpdate({_id: req.params.id}, req.body , {new: true, runValidators: true});
    res.status(200).json(book);
});

module.exports = {
    getMembers,
    addMember,
    getMember,
    updateMember,
    deleteMember,
}