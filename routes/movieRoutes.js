const express = require('express');
const router = express.Router();
const verifyToken= require("../middleware/auth.js");
const isAdmin = require("../middleware/isadmin.js");
const { addMovie,getAllMovies,getMovieById,deleteMovie,updateMovie} = require('../controllers/moviecontroller');
router.post("/movies",verifyToken,isAdmin,addMovie);
router.get("/movies", getAllMovies);
router.get("/movies/:id",verifyToken,getMovieById);
router.put("/movies/:id",verifyToken,isAdmin,updateMovie);
router.delete("/movies/:id",verifyToken,isAdmin,deleteMovie);

module.exports = router;