export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const ADD_FAVMOVIE = 'ADD_FAVMOVIE';
export const REM_FAVMOVIE = 'REM_FAVMOVIE';


export function setMovies(value) {
    return { 
        type: SET_MOVIES, 
        value 
    };
}

export function setFilter(value) {
    return { 
        type: SET_FILTER, 
        value 
    };
}

export function setUser(user) {
    return {
        type: SET_USER,
        user: user?.Username
    };
}

export function addFavMovie(value) {
    return {
        type: ADD_FAVMOVIE,
        value
    }
}

export function remFavMovie(value) {
    return {
        type: REM_FAVMOVIE,
        value
    };
}
