import jwt from 'jsonwebtoken';
import Voter from '../models/voterModel.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Voter.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not Authorized,token failed');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not Authorized');
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.admin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not Authorized as an admin');
  }
};

export { protect, admin };
