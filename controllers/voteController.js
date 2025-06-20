import Candidate from '../models/candidateModel.js';
import Vote from '../models/voteModel.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// @desc Add a new vote
// @route POST /api/votes
// @access Private
export const createVote = asyncHandler(async (req, res) => {
  const { candidateId } = req.body;

  const vote = await Vote.create({
    voter: req.user._id,
    candidate: candidateId,
  });

  if (vote) {
    res.status(201).json({
      msg: 'Vote created succesfully!',
    });
  } else {
    res.status(400);
    throw new Error('Invalid Vote Data');
  }
});

export const getResults = asyncHandler(async (req, res) => {
  // Fetch all candidates
  const candidates = await Candidate.find({}).lean();

  // Calculate the vote count for each candidate
  const candidateVotes = await Vote.aggregate([
    {
      $group: {
        _id: '$candidate',
        totalVotes: { $sum: 1 },
      },
    },
  ]);

  // Create a map of candidate IDs to vote counts
  const candidateVoteMap = new Map();
  candidateVotes.forEach((vote) => {
    candidateVoteMap.set(vote._id.toString(), vote.totalVotes);
  });

  // Merge candidate information with vote counts, including candidates with 0 votes
  const result = candidates.map((candidate) => ({
    candidate: {
      name: candidate.name,
      party: candidate.party,
    },
    totalVotes: candidateVoteMap.get(candidate._id.toString()) || 0,
  }));

  result.sort((a, b) => b.totalVotes - a.totalVotes);

  console.log(result);

  if (result) {
    res.status(201).json(result);
  } else {
    res.status(400);
    throw new Error('Failed to get result');
  }
});
