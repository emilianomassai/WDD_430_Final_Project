var Sequence = require('../models/sequence');

var maxMovieId;
var maxMessageId;
var maxTrendingMovieId;
var sequenceId = null;

function SequenceGenerator() {

    Sequence.findOne()
        .exec(function (err, sequence) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }

            sequenceId = sequence._id;
            maxMovieId = sequence.maxMovieId;
            maxMessageId = sequence.maxMessageId;
            maxTrendingMovieId = sequence.maxTrendingMovieId;
        });
}

SequenceGenerator.prototype.nextId = function (collectionType) {

    var updateObject = {};
    var nextId;

    switch (collectionType) {
        case 'movies':
            maxMovieId++;
            updateObject = { maxMovieId: maxMovieId };
            nextId = maxMovieId;
            break;
        case 'messages':
            maxMessageId++;
            updateObject = { maxMessageId: maxMessageId };
            nextId = maxMessageId;
            break;
        case 'trendingMovies':
            maxTrendingMovieId++;
            updateObject = { maxTrendingMovieId: maxTrendingMovieId };
            nextId = maxTrendingMovieId;
            break;
        default:
            return -1;
    }

    Sequence.update({ _id: sequenceId }, { $set: updateObject },
        function (err) {
            if (err) {
                console.log("nextId error = " + err);
                return null
            }
        });

    return nextId;
}

module.exports = new SequenceGenerator();