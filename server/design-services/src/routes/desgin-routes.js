const express = require('express');
const designController = require('../controllers/design-controller');
const authenticateRequest = require('../middleware/auth-middleware');
const router = express.Router();

router.use(authenticateRequest);

router.get('/', designController.getUserDesigns);
router.get ('/:id',designController.getUserDesignsByID);
router.post('/',designController.saveDesign);
router.delete('/:id',designController.deleteDesign);

module.exports = router;