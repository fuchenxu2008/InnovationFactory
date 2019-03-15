const fs = require('fs');
const path = require('path');
const Activity = require('../models/Activity');
const Category = require('../models/Category');

const getActivities = (req, res) => {
  const { type } = req.params;
  // If no query variables => app initial load, return 3 from each category
  if (Object.keys(req.query).length === 0) {
    return Category.find({ type }).sort({ updated_at: -1 })
      .then(async (categories) => {
        const activities = await categories.reduce(async (previousPromise, category) => {
          const obj = await previousPromise;
          return {
            ...obj,
            [category._id]: await Activity.find({ category: category._id })
              .limit(3)
              .populate('category', ['name', '_id'])
              .sort({ created_at: -1 }),
          };
        }, Promise.resolve({}));
        res.json({
          [`${type}s`]: activities,
          categories,
          message: `Successfully retrieved 3 ${type}s from each category.`,
        });
      })
      .catch(err => res.status(400).json({
        message: `Error while getting initial ${type}s.`,
        err,
      }));
  }
  // If has query, return as requested (default all)
  const { start, count, ...searchTerm } = req.query;
  return Activity.find(searchTerm)
    .skip(start * 1 || 0)
    .limit(count * 1 || 0)
    .populate('category', ['name', '_id'])
    .sort({ created_at: -1 })
    .then(activities => res.json({ [`${type}s`]: activities, searchTerm }))
    .catch(err => res.status(400).json({
      message: `Error while getting filtered ${type}s.`,
      err,
    }));
};

const getActivity = (req, res) => {
  const { type, id } = req.params;
  if (!id) return res.status(400).json({ message: 'No ID provided' });
  return Activity.findById(id)
    .populate('category', ['name', '_id'])
    .then((activity) => {
      if (!activity) return res.status(404).json({ message: `No ${type} found with this ID.` });
      return res.json({ [type]: activity });
    }).catch(err => res.status(400).json({
      message: `Error while getting ${type}.`,
      err,
    }));
};

/**
 * Admin Functions
 */

const addActivity = (req, res) => {
  const { type } = req.params;
  let activity;
  try {
    // wx.upload sends form bug -> '[Object, Object]' => so request is stringified
    activity = JSON.parse(req.body[type]);
  } catch (err) {
    return res.status(400).json({ message: `Error while parsing ${type}.`, err });
  }
  const { filename } = req.file || {};
  if (!activity || !filename) return res.status(400).json({ message: `Missing info while creating ${type}.` });
  // Info complete
  return Activity.create({
    ...activity,
    albumPicPath: `/api/image/${filename}`,
    type,
  }).then(newActivity => Activity.findById(newActivity._id).populate('category', ['name', '_id']))
    .then((newActivity) => {
      Category.findById(activity.category).then((category) => {
        category.set({ updated_at: newActivity.created_at });
        category.save();
      });
      res.json({ message: `Successfully created ${type}!`, [type]: newActivity });
    }).catch((err) => {
      res.status(400).json({
        message: `Error while creating ${type}.`,
        err,
      });
      throw new Error(err);
    });
};

const deleteActivity = (req, res) => {
  const { type, id } = req.params;
  Activity.findByIdAndDelete(id, (err, doc) => {
    if (err) return res.status(400).json({ message: `Error while deleting ${type}.`, err });
    if (!doc) return res.status(404).json({ message: `Could not find ${type} with specified id` });
    res.json({ message: `Successfully deleted ${type}!`, [type]: doc });
    // Remove picture attached to the activity
    const pathArr = doc.albumPicPath.split('/');
    const picFile = pathArr[pathArr.length - 1];
    return fs.unlink(path.join(global.__root, `storage/${type}/${picFile}`), (error) => {
      if (error) console.log(`Error while deleting ${type}:`, error);
    });
  });
};

const updateActivityWithImage = (req, res) => {
  const { type, id } = req.params;
  let editedActivity;
  try {
    editedActivity = JSON.parse(req.body[type]);
  } catch (err) {
    return res.status(400).json({ message: `Error while parsing ${type}.`, err });
  }
  const { filename } = req.file || {};
  if (!editedActivity || !filename || !id) return res.status(400).json({ message: `Missing info while updating ${type}.` });
  return Activity.findById(id, (err, activity) => {
    if (err) return res.status(400).json({ message: `Error while finding ${type} before updating.`, err });
    // Remove old picture attached to the activity
    const pathArr = activity.albumPicPath.split('/');
    const picFile = pathArr[pathArr.length - 1];
    fs.unlink(path.join(global.__root, `storage/${type}/${picFile}`), (error) => {
      if (error) console.log('Error while deleting file:', error);
    });
    // Update activity
    activity.set({
      ...editedActivity,
      albumPicPath: `/api/image/${filename}`,
    });
    return activity.save((err2, doc) => {
      if (err2) return res.status(400).json({ message: `Error while finding ${type} before updating.`, err: err2 });
      return Activity.findById(doc._id).populate('category', ['name', '_id']).exec((err3, updatedActivity) => {
        if (err3) return res.status(400).json({ message: `Error while populating ${type}.`, err: err3 });
        return res.json({ message: `Successfully updated ${type}!`, [type]: updatedActivity });
      });
    });
  });
};

const updateActivityWithoutImage = (req, res) => {
  const { type, id } = req.params;
  const editedActivity = req.body[type];
  if (!id || !editedActivity) return res.status(400).json({ message: `Incomplete info while updating ${type}.` });
  // restore image's full http url to api path
  const pathArr = editedActivity.albumPicPath.split('/');
  const filename = pathArr[pathArr.length - 1];
  return Activity.findById(id, (err, activity) => {
    if (err) return res.status(400).json({ message: `Error while finding ${type} before updating.`, err });
    activity.set({
      ...editedActivity,
      albumPicPath: `/api/image/${filename}`,
    });
    return activity.save((err2, doc) => {
      if (err2) return res.status(400).json({ message: `Error while updating ${type}.`, err: err2 });
      if (!doc) return res.status(404).json({ message: `Could not find ${type} with specified _id` });
      return Activity.findById(doc._id).populate('category', ['name', '_id']).exec((err3, updatedActivity) => {
        if (err3) return res.status(400).json({ message: `Error while populating ${type}.`, err: err3 });
        return res.json({ message: `Successfully updated ${type}!`, [type]: updatedActivity });
      });
    });
  });
};

module.exports = {
  getActivities,
  getActivity,
  // admin
  addActivity,
  deleteActivity,
  updateActivityWithImage,
  updateActivityWithoutImage,
};
