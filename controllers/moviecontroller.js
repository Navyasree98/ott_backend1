const Movie = require("../models/movie");
// Create new movie
exports.addMovie = async (req, res) => {
  try {
    const lastMovie = await Movie.findOne().sort({ createdAt: -1 }).lean();
    let newCode = "MOV_001";

    if (lastMovie && /^MOV_(\d+)$/.test(lastMovie.code)) {
      const match = lastMovie.code.match(/^MOV_(\d+)$/);
      const lastNumber = parseInt(match[1], 10);
      const nextNumber = lastNumber + 1;
      newCode = `MOV_${String(nextNumber).padStart(3, '0')}`;
    }

    const movie = new Movie({ ...req.body, code: newCode });
    await movie.save();

    return res.status(201).json({
      success: true,
      message: "Movie added successfully",
      data: movie,
    });
  } catch (error) {
    console.error("Error adding movie:", error);
    return res.status(400).json({
      success: false,
      message: "Failed to add movie",
      error: error.message,
    });
  }
};

// Get all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json({
      success: true,
      message: "Movies fetched successfully",
      data: movies,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch movies",
      error: error.message,
    });
  }
};

// Get a single movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Movie fetched successfully",
      data: movie,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch movie",
      error: error.message,
    });
  }
};

// Update a movie
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Movie updated successfully",
      data: movie,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to update movie",
      error: error.message,
    });
  }
};

// Delete a movie
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete movie",
      error: error.message,
    });
  }
};
