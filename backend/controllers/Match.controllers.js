import Match from "../models/Match.model";

export const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find();
    if (!matches) {
      return res.status(404).json({
        message: "Can't get all matches!",
      });
    }
    return res.status(200).json({
      message: "Success!",
      data: matches,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const getMatchById = async (req, res) => {
    try {
      const { id } = req.params;
      const match = await Match.findById(id);
      if (!match) {
        return res.status(404).json({ message: "Match not found" });
      }
      return res.status(200).json({
        message: "Success",
        data: match,
      });
    } catch (error) {
      return res.status(500).json({ message: "Failed to get match" });
    }
  };  

export const createMatch = async (req, res) => {
  try {
    const { date, ID_season, card, description } = req.body;
    const newMatch = new Match({
      date,
      ID_season,
      card,
      description,
    });
    await newMatch.save();
    return res.status(201).json({
      message: "Match created successfully",
      match: newMatch,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create match" });
  }
};

export const updateMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, ID_season, card, description } = req.body;
    const updatedMatch = await Match.findByIdAndUpdate(
      id,
      { date, ID_season, card, description },
      { new: true }
    );
    if (!updatedMatch) {
      return res.status(404).json({ message: "Match not found" });
    }
    return res.status(200).json({
      message: "Match updated successfully",
      match: updatedMatch,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update match" });
  }
};

export const deleteMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMatch = await Match.findByIdAndDelete(id);
    if (!deletedMatch) {
      return res.status(404).json({ message: "Match not found" });
    }
    return res.status(200).json({ message: "Match deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete match" });
  }
};
