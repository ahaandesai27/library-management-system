const Members = require('../schema/members.js');
const wrap = require('express-async-wrapper');


const addMember = wrap(async (req, res) => {
    const exists = await Members.findOne({contact: req.body.contact});
    if (exists) {
        return res.status(500).send("Error: Either contact number already exists or an internal server error has occured.");
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
    if (!member) return res.status(404).send("Error: Member not found.");
    res.status(200).json(member);
});

const deleteMember = wrap(async (req, res) => {
    let member = await Members.findOne({_id: req.params.id});   
    if (!member) return res.status(404).send("Error: Member not found.");
    if (member.books.length > 0) {
        return res.status(400).send("Error: Member has books to return. Cannot delete just yet.");
    }
    member = await Members.findOneAndDelete({_id: req.params.id});
    res.status(200).json(member);
});

const updateMember = wrap(async (req, res) => { 
    const exists = await Members.findOne({contact: req.body.contact});
    if (exists) {
        return res.status(500).send("Error: Either contact number already exists or an internal server error has occured.");
    }     
    const member  = await Members.findOneAndUpdate({_id: req.params.id}, req.body , {new: true, runValidators: true});
    if (!member) return res.status(404).send("Error: Member not found.");
    res.status(200).json(member);
});

const searchMember = wrap(async (req, res) => {
    let members = await Members.find(req.query);
    if (members.length == 0) {
        res.status(404).json({"message": "No books found"});
    }
    res.status(200).json(members);
});


module.exports = {
    getMembers,
    addMember,
    getMember,
    updateMember,
    deleteMember,
    searchMember
}