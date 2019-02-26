const createLoadingSelector = (actions) => (state) => {
    // returns true only when all actions is not loading
    return actions.some((action) => state[action]);
}

export default createLoadingSelector;