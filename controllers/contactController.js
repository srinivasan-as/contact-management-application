const asyncHandler = require(`express-async-handler`);
const Contact = require(`../models/contactModel`)

/**
 * @route GET api/contacts
 * @description get all contacts
 * @access private
 */
const getContacts = asyncHandler(async (req,res) => {
        const contacts = await Contact.find({ user_id: req.user.id });
        res.status(200).json(contacts);
});

/**
 * @route GET api/contacts/:id
 * @description get contact
 * @access private
 */
const getContact = asyncHandler(async (req, res, next) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error('Contact Not Found');
    }
    res.status(200).json(contact);
});
  

/**
 * @route POST api/contacts
 * @description post contact 
 * @access private 
 */
const createContact = asyncHandler(async (req,res) => {
    const { name, email, number } = req.body;
    if(!name || !email || !number){
        res.status(400);
        throw new Error(`All fields are mandatory`);
    }
    const contact = await Contact.create({ 
        name, 
        email, 
        number,
        user_id: req.user.id 
    });
    res.status(201).json(contact);
});

/**
 * @route PUT api/contacts/:id
 * @description update contact
 * @access private
 */
const updateContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error(`Contact Not Found`);
    }
    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error(`You don't have permission to update the other user's contact`);
    }
    const updatedContact = await Contact.findByIdAndUpdate( 
        req.params.id, 
        req.body, 
        { new: true } 
    )
    res.status(200).json(updatedContact);
});

/**
 * @route DELETE api/contacts/:id
 * @description delete contact
 * @access private
 */
const deleteContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error(`Contact Not Found`);
    } 
    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error(`You don't have permission to delete other user's contact`);
    }
    await Contact.findByIdAndRemove(req.params.id);
    res.status(200).json(contact);
});

module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
}