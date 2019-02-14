import { createSelector } from 'reselect';

const workshopsSelector = (state) => state.allWorkshops;
const categorySelector = (state) => state.currentWorkshopCategory;

const getWorkshopsUnderCategory = (allWorkshops, category) => {
    return allWorkshops.filter(workshop => {
        return workshop.category
        ? workshop.category._id === category._id
        : false;
    });  
}

export default createSelector(
    workshopsSelector,
    categorySelector,
    getWorkshopsUnderCategory,
)