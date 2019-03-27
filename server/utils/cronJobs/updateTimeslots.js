const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');
const schedule = require('node-schedule');
const readJSON = require('../readJSON');
const generateConfig = require('../generateConfig');

const updateTimeslots = async () => {
  const thisMonday = moment().weekday(0).startOf('day');
  const nextMonday = moment().weekday(7).startOf('day');
  const { available, ...otherTimeslotsConfig } = await readJSON('config/timeslots.json');
  const { open, scheduled } = available || {};
  // Get the schedule which is not after next Monday (should be open now)
  const toBeOpen = [];
  // Get the schedule which is after next Monday (should be still scheduled)
  const keepScheduled = [];
  (scheduled || []).forEach(weekSchedule => (moment(weekSchedule.weekStart).isAfter(nextMonday) ? keepScheduled : toBeOpen).push(weekSchedule));
  // Get the schedule which is not before this Monday (should be still open)
  const keepOpen = (open || []).filter(weekSchedule => !moment(weekSchedule.weekStart).isBefore(thisMonday));
  fs.writeFile(path.join(global.__root, 'config/timeslots.json'), JSON.stringify({
    ...otherTimeslotsConfig,
    available: {
      open: [...keepOpen, ...toBeOpen],
      scheduled: keepScheduled,
    },
  }), (err) => {
    if (err) console.log('Update timeslots error:', err);
    else console.log('timeslots updated!');
  });
};

const recurUpdateTimeslots = async () => {
  await updateTimeslots();
  console.log('[Start] Recur update timeslots');
  // Monday
  schedule.scheduleJob('0 0 0 * * *', updateTimeslots);
};

const timeslotsManager = async () => {
  // Manage the initial start time of updating
  readJSON('config/timeslots.json')
    .then(() => recurUpdateTimeslots())
    .catch(async (err) => {
      console.log('Error while running timeslotsManager', err);
      await generateConfig('timeslots');
      recurUpdateTimeslots();
    });
};

module.exports = {
  updateTimeslots,
  timeslotsManager,
};
