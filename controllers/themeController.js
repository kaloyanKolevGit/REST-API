const { themeModel } = require('../models');
const { newPost } = require('./postController')


function getThemes(req, res, next) {
    themeModel.find()
        .populate('userId')
        .then(themes => res.json(themes))
        .catch(next);
}


function getRecentListings(req, res, next) {
    const limit = Number(req.query.limit) || 0;
    themeModel.find()
        .sort({ created_at: -1 })
        .limit(limit)
        .populate('userId')
        .then(themes => res.json(themes))
        .catch(next);
}

function editTheme(req, res, next) {
    const { themeId } = req.params;
    const { themeName, transmission, year, price, imageUrl, description } = req.body;
    const { _id: userId } = req.user;

    // if the userId is not the same as this one of the post, the post will not be updated
    themeModel.findOneAndUpdate({ _id: themeId, userId }, { themeName, transmission, year, price, imageUrl, description }, { new: true })
        .then(updatedListing => {
            if (updatedListing) {
                res.status(200).json(updatedListing);
            }
            else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function getTheme(req, res, next) {
    const { themeId } = req.params;

    themeModel.findById(themeId)
        .populate({
            path : 'posts',
            populate : {
              path : 'userId'   
            },
            path : 'userId',
            populate : {
              path : 'userId'   
            },
          })
        .then(theme => res.json(theme))
        .catch(next);
}

function createTheme(req, res, next) {
    const { themeName, postText, transmission, year, price, imageUrl, description } = req.body;
    const { _id: userId } = req.user;

    themeModel.create({ themeName, transmission, year, price, imageUrl, description, userId, subscribers: [userId] })
        .then(theme => {
            newPost(postText, userId, theme._id)
                .then(([_, updatedTheme]) => res.status(200).json(updatedTheme))
        })
        .catch(next);
}

function subscribe(req, res, next) {
    const themeId = req.params.themeId;
    const { _id: userId } = req.user;
    themeModel.findByIdAndUpdate({ _id: themeId }, { $addToSet: { subscribers: userId } }, { new: true })
        .then(updatedTheme => {
            res.status(200).json(updatedTheme)
        })
        .catch(next);
}

module.exports = {
    getThemes,
    createTheme,
    getTheme,
    subscribe,
    getRecentListings,
    editTheme,
}
