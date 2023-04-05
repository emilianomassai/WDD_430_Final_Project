// TrendingMovies Routes
const express = require('express');
const router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');

const trendingMovie = require('../models/trendingMovie');

function returnError(res, error) {
    res.status(500).json({
        message: 'An error occurred',
        error: error
    });
}

router.get('/', (req, res, next) => {
    TrendingMovie.find()
        .populate('group')
        .then(trendingMovies => {
            res.status(200).json({
                message: 'trendingMovies fetched successfully',
                trendingMovies: trendingMovies
            });
        })
        .catch(error => {
            returnError(res, error);
        });
}
);

router.get('/:id', (req, res, next) => {
    TrendingMovie.findOne({
        "id": req.params.id
    })
        .populate('group')
        .then(trendingMovie => {
            res.status(200).json({
                message: 'TrendingMovie fetched successfully',
                trendingMovie: trendingMovie
            });
        })
        .catch(error => {
            returnError(res, error);
        })
})

router.post('/', (req, res, next) => {
    const maxTrendingMovieId = sequenceGenerator.nextId("trendingMovies");

    const trendingMovie = new TrendingMovie({
        id: maxTrendingMovieId,
        title: req.body.title,
        overview: req.body.overview,
        release_date: req.body.release_date,
        poster_path: req.body.poster_path,
        vote_average: req.body.vote_average
    });

    if (trendingMovie.group && trendingMovie.group.length > 0) {
        for (let groupTrendingMovie of trendingMovie.group) {
            groupTrendingMovie = groupTrendingMovie._id;
        }
    }

    trendingMovie.save()
        .then(createdTrendingMovie => {
            res.status(201).json({
                message: 'TrendingMovie added successfully',
                trendingMovie: createdTrendingMovie
            });
        })
        .catch(error => {
            returnError(res, error);
        });
});

router.put('/:id', (req, res, next) => {
    TrendingMovie.findOne({ id: req.params.id })
        .then(trendingMovie => {
            trendingMovie.title = req.body.title;
            trendingMovie.overview = req.body.overview;
            trendingMovie.release_date = req.body.release_date;
            trendingMovie.poster_path = req.body.poster_path;
            trendingMovie.vote_average = req.body.vote_average;


            TrendingMovie.updateOne({ id: req.params.id }, trendingMovie)
                .then(result => {
                    res.status(204).json({
                        message: 'TrendingMovie updated successfully'
                    })
                })
                .catch(error => {
                    returnError(res, error);
                });
        })
        .catch(error => {
            res.status(500).json({
                message: 'trendingMovie not found.',
                error: { trendingMovie: 'trendingMovie not found' }
            });
        });
});

router.delete("/:id", (req, res, next) => {
    TrendingMovie.findOne({ id: req.params.id })
        .then(trendingMovie => {
            TrendingMovie.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(204).json({ message: "trendingMovie deleted successfully" });
                })
                .catch(error => {
                    returnError(res, error);
                })
        })
        .catch(error => {
            returnError(res, error);
        });
});

module.exports = router;

