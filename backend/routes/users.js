const router = require('express').Router();
const {
  getUsers, getUserById, patchUser, patchAvatar, getCurrentUser,
} = require('../controllers/users');
const { idValidation, userInfoValidation, userAvatarValidation } = require('../middlewares/validationCheck');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', idValidation, getUserById);
router.patch('/me', userInfoValidation, patchUser);
router.patch('/me/avatar', userAvatarValidation, patchAvatar);

module.exports = router;
