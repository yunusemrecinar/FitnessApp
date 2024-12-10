const express = require('express');
const {
  register,
  login,
  googleLoginRegister,
  updatePassword,
  completeOnboarding,
  addNewWorkout,
  updateWorkoutExercise,
  completeWorkout,
  logout,
  user,
  welcome
} = require('../controllers/authController.js');

const router = express.Router();

router.get('/', welcome);
router.post('/register', register);
router.post('/login', login);
router.post('/googleLoginRegister', googleLoginRegister);
router.post('/updatePassword', updatePassword);
router.post('/completeOnboarding', completeOnboarding);
router.post('/addNewWorkout', addNewWorkout);
router.post('/updateWorkoutExercise', updateWorkoutExercise);
router.post('/completeWorkout', completeWorkout);
router.post('/logout', logout);
router.get('/user', user);

module.exports = router;
