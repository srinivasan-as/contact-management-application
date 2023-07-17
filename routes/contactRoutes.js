const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateTokenHandler');
const {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
} = require('../controllers/contactController');

// router.route('/').get(getContacts);
// router.route('/:id').get(getContact);
// router.route('/').post(createContact);
// router.route('/:id').put(updateContact);
// router.route('/:id').delete(deleteContact);

router.use(validateToken)
router.route('/').get(getContacts).post(createContact);
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;