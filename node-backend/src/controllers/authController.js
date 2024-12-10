const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { randomUUID } = require('crypto');

// Helper for Redis
const getRedisClient = (req) => req.app.locals.redis;

exports.register = async (req, res) => {
  const redis = getRedisClient(req);

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const userKey = `user:${email}`;
  const userExists = await redis.exists(userKey);

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await redis.hSet(userKey, {
    id: uuidv4(),
    email,
    password: hashedPassword,
    is_first_time: 'true',
  });

  const user = await redis.hGetAll(userKey);
  return res.status(201).json({ message: 'User registered successfully', user });
};

exports.login = async (req, res) => {
  try {
    const redis = req.app.locals.redis;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const userKey = `user:${email}`;
    const user = await redis.hGetAll(userKey);

    if (!user || Object.keys(user).length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.password) {
      return res.status(500).json({ message: 'User data corrupted: password missing' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = randomUUID();
    await redis.set(`auth:tokens:${token}`, userKey);
    await redis.expire(`auth:tokens:${token}`, 3600);

    res.status(200).json({
      token,
      message: 'Login successful',
      user,
    });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ message: 'An error occurred during login' });
  }
};

exports.googleLoginRegister = async (req, res) => {
    const redis = req.app.locals.redis;
    const { user, token } = req.body;
  
    if (!user || !user.email) {
      return res.status(400).json({ message: 'Google user data is required' });
    }
  
    const userKey = `user:${user.email}`;
  
    if (!(await redis.exists(userKey))) {
      await redis.hSet(userKey, {
        id: user.id,
        email: user.email,
        family_name: user.family_name || '',
        given_name: user.given_name || '',
        name: user.name || '',
        picture: user.picture || '',
        verified_email: 'true',
        is_first_time: 'true',
      });
    }
  
    await redis.set(`auth:tokens:${token}`, userKey);
    await redis.expire(`auth:tokens:${token}`, 3600);
  
    const userData = await redis.hGetAll(userKey);
    res.status(200).json({
      message: 'Login successful',
      user: userData,
    });
};
  
exports.updatePassword = async (req, res) => {
    const redis = req.app.locals.redis;
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and new password are required' });
    }
  
    const userKey = `user:${email}`;
    const userExists = await redis.exists(userKey);
  
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    await redis.hSet(userKey, 'password', hashedPassword);
  
    res.status(201).json({ message: 'Password updated successfully' });
};

exports.completeOnboarding = async (req, res) => {
    const redis = req.app.locals.redis;
    const token = req.headers.authorization;
  
    const userKey = await redis.get(`auth:tokens:${token}`);
    if (!userKey) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  
    const { selectedDays, daysWithTargetArea, daysWithTargetExercises, daysWithNotes, daysCompleted } = req.body;
  
    await redis.hSet(userKey, {
      is_first_time: 'false',
      selectedDays: JSON.stringify(selectedDays),
      daysWithTargetArea: JSON.stringify(daysWithTargetArea),
      daysWithTargetExercises: JSON.stringify(daysWithTargetExercises),
      daysWithNotes: JSON.stringify(daysWithNotes),
      daysCompleted: JSON.stringify(daysCompleted),
    });
  
    res.status(201).json({ message: 'Onboarding completed successfully' });
};
  
exports.addNewWorkout = async (req, res) => {
    const redis = req.app.locals.redis;
    const token = req.headers.authorization;
  
    const userKey = await redis.get(`auth:tokens:${token}`);
    if (!userKey) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  
    const { workout } = req.body;
    const user = await redis.hGetAll(userKey);
  
    const selectedDays = JSON.parse(user.selectedDays || '[]');
    selectedDays.push(workout.day);
  
    const daysWithTargetArea = JSON.parse(user.daysWithTargetArea || '{}');
    daysWithTargetArea[workout.day] = workout.areas;
  
    const daysWithTargetExercises = JSON.parse(user.daysWithTargetExercises || '{}');
    daysWithTargetExercises[workout.day] = workout.exercises;
  
    const daysWithNotes = JSON.parse(user.daysWithNotes || '{}');
    daysWithNotes[workout.day] = workout.notes;
  
    await redis.hSet(userKey, {
      selectedDays: JSON.stringify(selectedDays),
      daysWithTargetArea: JSON.stringify(daysWithTargetArea),
      daysWithTargetExercises: JSON.stringify(daysWithTargetExercises),
      daysWithNotes: JSON.stringify(daysWithNotes),
    });
  
    res.status(201).json({ message: 'Workout added successfully' });
};
 
exports.updateWorkoutExercise = async (req, res) => {
    const redis = req.app.locals.redis;
    const token = req.headers.authorization;
  
    const userKey = await redis.get(`auth:tokens:${token}`);
    if (!userKey) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  
    const { workout } = req.body;
    const user = await redis.hGetAll(userKey);
  
    const daysWithTargetExercises = JSON.parse(user.daysWithTargetExercises || '{}');
    daysWithTargetExercises[workout.day] = workout.exercises;
  
    await redis.hSet(userKey, {
      daysWithTargetExercises: JSON.stringify(daysWithTargetExercises),
    });
  
    res.status(201).json({ message: 'Workout updated successfully' });
};

exports.completeWorkout = async (req, res) => {
    const redis = req.app.locals.redis;
    const token = req.headers.authorization;
  
    const userKey = await redis.get(`auth:tokens:${token}`);
    if (!userKey) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  
    const { day, completedExercises } = req.body;
    const user = await redis.hGetAll(userKey);
  
    const daysCompleted = JSON.parse(user.daysCompleted || '{}');
    daysCompleted[day] = '1';
  
    await redis.hSet(userKey, {
      daysCompleted: JSON.stringify(daysCompleted),
      daysWithTargetExercises: JSON.stringify(completedExercises),
    });
  
    res.status(201).json({ message: 'Workout completed successfully' });
};
  
exports.logout = async (req, res) => {
    const redis = req.app.locals.redis;
    const token = req.headers.authorization;
  
    if (await redis.del(`auth:tokens:${token}`)) {
      return res.status(200).json({ message: 'Logged out successfully' });
    }
  
    res.status(400).json({ message: 'Invalid token' });
};
 
exports.user = async (req, res) => {
    const redis = req.app.locals.redis;
    const token = req.headers.authorization;
  
    const userKey = await redis.get(`auth:tokens:${token}`);
    if (!userKey) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  
    const user = await redis.hGetAll(userKey);
    res.status(200).json(user);
};
  
exports.welcome = async (req, res) => {
    res.status(200).json({
        message: 'Hello there!!!'
    });
};