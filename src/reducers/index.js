const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    activeFilter: 'all',
    filtersLoadingStatus: 'idle',
    filteredHeroes: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading',
            };
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle',
                filteredHeroes:
                    state.activeFilter === 'all'
                        ? action.payload
                        : action.payload.filter(
                              (hero) => hero.element === state.activeFilter
                          ),
            };
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error',
            };
        case 'HERO_DELETED':
            const newHeroList = state.heroes.filter(
                (item) => item.id !== action.payload
            );

            return {
                ...state,
                heroes: newHeroList,
                filteredHeroes:
                    state.activeFilter === 'all'
                        ? newHeroList
                        : newHeroList.filter(
                              (hero) => hero.element === state.activeFilter
                          ),
            };
        case 'HERO_ADDED':
            const newAddedHeroList = [...state.heroes, action.payload];

            return {
                ...state,
                heroes: newAddedHeroList,
                filteredHeroes:
                    state.activeFilter === 'all'
                        ? newAddedHeroList
                        : newAddedHeroList.filter(
                              (hero) => hero.element === state.activeFilter
                          ),
            };
        case 'ACTIVE_FILTER_SELECTED':
            return {
                ...state,
                activeFilter: action.payload,
                filteredHeroes:
                    action.payload === 'all'
                        ? state.heroes
                        : state.heroes.filter(
                              (hero) => hero.element === action.payload
                          ),
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

export default reducer;
