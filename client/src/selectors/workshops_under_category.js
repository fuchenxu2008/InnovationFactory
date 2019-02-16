import { createSelector } from 'reselect';

const workshopsSelector = (state) => state.allWorkshops;
const categorySelector = (state) => state.currentWorkshopCategory;

const getWorkshopsUnderCategory = (allWorkshops, category) => allWorkshops[category._id];

export default createSelector(
    workshopsSelector,
    categorySelector,
    getWorkshopsUnderCategory,
)