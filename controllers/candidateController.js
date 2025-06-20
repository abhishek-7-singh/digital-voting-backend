import Candidate from '../models/candidateModel.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// @desc Get all candidates
// @route GET /api/candidates
// @access Private/Admin
export const getCandidates = asyncHandler(async (req, res) => {
  const candidates = await Candidate.find({})
    .select('_id name party')
    .sort({ createdAt: -1 });
  res.json(candidates);
});

// @desc Add a new candidate
// @route POST /api/candidates
// @access Private/Admin
export const addCandidate = asyncHandler(async (req, res) => {
  const { name, party } = req.body;

  const candidate = await Candidate.create({
    name,
    party,
  });

  if (candidate) {
    res.status(201).json({
      msg: 'Candidate created succesfully!',
    });
  } else {
    res.status(400);
    throw new Error('Invalid Candidate Data');
  }
});
