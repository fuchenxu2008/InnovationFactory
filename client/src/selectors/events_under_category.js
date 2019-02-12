import { createSelector } from 'reselect';

const eventsSelector = (state) => state.allEvents;
const categorySelector = (state) => state.currentEventCategory;

const getEventsUnderCategory = (allEvents, category) => {
    console.log('reselecting category:', category);
    return allEvents.filter(event => {
        return event.category
        ? event.category._id === category._id
        : false;
    });
}

export default createSelector(
    eventsSelector,
    categorySelector,
    getEventsUnderCategory,
)