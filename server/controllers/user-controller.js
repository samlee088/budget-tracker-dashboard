import { User } from '../models/index.js';
import { signToken } from '../utils/auth.js';

export const createUser = async ({ body }, res) => {
  const user = await User.create(body);

  if (!user) {
    return res.status(400).json({ message: 'Something is wrong!' });
  }
  const token = signToken(user);
  res.json({ token, user });
};

export const login = async ({ body }, res) => {
  
  const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });

  if (!user) {
    return res.status(400).json({ message: "Can't find this user" });
  }

  const correctPw = await user.isCorrectPassword(body.password);

  if (!correctPw) {
    return res.status(400).json({ message: 'Wrong password!' });
  }
  const token = signToken(user);
  res.json({ token, user });
};
