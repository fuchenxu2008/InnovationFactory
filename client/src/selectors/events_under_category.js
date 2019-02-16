import { createSelector } from 'reselect';

const eventsSelector = (state) => state.allEvents;
const categorySelector = (state) => state.currentEventCategory;

const getEventsUnderCategory = (allEvents, category) => allEvents[category._id];

export default createSelector(
    eventsSelector,
    categorySelector,
    getEventsUnderCategory,
)