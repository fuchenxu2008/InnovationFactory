import { createSelector } from 'reselect';

const eventsSelector = (state) => state.allEvents;

const getOrderedEvents = (allEvents) => {
    return allEvents.sort((a, b) => {
        return new Date(b.created_at.replace(/-/g, '/')) - new Date(a.created_at.replace(/-/g, '/'));
    });
}

export default createSelector(
    eventsSelector,
    getOrderedEvents,
)