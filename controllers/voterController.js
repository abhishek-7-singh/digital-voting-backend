
// import Voter from '../models/voterModel.js';
// import { asyncHandler } from '../utils/asyncHandler.js';
// import generateToken from '../utils/generateToken.js';
// import dotenv from 'dotenv';
// dotenv.config();

// // @desc Auth user and get token
// // @route POST /api/voters/login
// // @access Public
// export const loginUser = asyncHandler(async (req, res) => {
//   const { citizenship_no, password, adminLogin } = req.body;  // <-- Added adminLogin

//   const voter = await Voter.findOne({ citizenship_no });

//   if (voter && (await voter.matchPassword(password))) {

//     // Check if trying to login as admin
//     if (adminLogin && voter.admin !== true) {
//       res.status(401);
//       throw new Error('You are not authorized to login as Admin');
//     }

//     res.json({
//       _id: voter._id,
//       name: voter.name,
//       citizenship_no: voter.citizenship_no,
//       token: generateToken(voter._id),
//       admin: voter.admin,
//     });
//   } else {
//     res.status(401);
//     throw new Error('Invalid citizenship_no or password');
//   }
// });

// // @desc Register a new user
// // @route POST /api/voters
// // @access Public
// export const registerVoter = asyncHandler(async (req, res) => {
//   const { name, citizenship_no, password, gender, address, dob, documents } =
//     req.body;

//   const voterExists = await Voter.findOne({ citizenship_no });

//   if (voterExists) {
//     res.status(400);
//     throw new Error('Voter already exists');
//   }

//   const voter = await Voter.create({
//     name,
//     citizenship_no,
//     password,
//     gender,
//     address,
//     dob,
//     documents,
//     admin: false,  // <-- New voters are normal voters by default
//   });

//   if (voter) {
//     res.status(201).json({
//       msg: 'Voter created successfully!',
//     });
//   } else {
//     res.status(400);
//     throw new Error('Invalid Voter Data');
//   }
// });


import Voter from '../models/voterModel.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import dotenv from 'dotenv';
dotenv.config();

// @desc Auth user and get token
// @route POST /api/voters/login
// @access Public
export const loginUser = asyncHandler(async (req, res) => {
  const { citizenship_no, password, adminLogin } = req.body;

  const voter = await Voter.findOne({ citizenship_no });

  if (voter && (await voter.matchPassword(password))) {
    if (adminLogin && voter.admin !== true) {
      res.status(401);
      throw new Error('You are not authorized to login as Admin');
    }

    res.json({
      _id: voter._id,
      name: voter.name,
      citizenship_no: voter.citizenship_no,
      token: generateToken(voter._id),
      admin: voter.admin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid citizenship_no or password');
  }
});

// @desc Register a new user
// @route POST /api/voters
// @access Public
export const registerVoter = asyncHandler(async (req, res) => {
  const { name, citizenship_no, password, gender, address, dob, documents, admin } = req.body;

  const voterExists = await Voter.findOne({ citizenship_no });

  if (voterExists) {
    res.status(400);
    throw new Error('Voter already exists');
  }

  const voter = await Voter.create({
    name,
    citizenship_no,
    password,
    gender,
    address,
    dob,
    documents,
    admin: admin || false,   // <-- This is the key change
  });

  if (voter) {
    res.status(201).json({
      msg: 'Voter created successfully!',
    });
  } else {
    res.status(400);
    throw new Error('Invalid Voter Data');
  }
});
