const express = require('express');
const router = express.Router();
const verifyToken= require("../middleware/auth.js");
const { addMovie,getAllMovies,getMovieById,deleteMovie,updateMovie} = require('../controllers/moviecontroller');
router.post("/movies",verifyToken,addMovie);
router.get("/movies", getAllMovies);
router.get("/movies/:id",verifyToken,getMovieById);
router.put("/movies/:id",verifyToken,updateMovie);
router.delete("/movies/:id",verifyToken,deleteMovie);

module.exports = router;