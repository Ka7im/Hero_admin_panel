const initialState = {
    filters: [],
    activeFilter: 'all',
    filtersLoadingStatus: 'idle',
};

const filters = (state = initialState, action) => {
    switch (action.type) {
        case 'ACTIVE_FILTER_SELECTED':
            return {
                ...state,
                activeFilter: action.payload,
            };
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filtersLoadingStatus: 'idle',
                filters: action.payload,
            };
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error',
            };
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading',
            };
        default:
            return state;
    }
};

export default filters;
