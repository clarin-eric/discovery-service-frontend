export const FILTER_ON_TEXT = 'FILTER_ON_TEXT'
export const FILTER_ON_COUNTRY = 'FILTER_ON_COUNTRY'
export const SET_VIEW = 'SET_VIEW'

export const filterOnText = (value) => {
    return {
        type: FILTER_ON_TEXT,
        value: value
    }
}

export const filterOnCountry = (value) => {
    return {
        type: FILTER_ON_COUNTRY,
        value: value
    }
}

export const setView = (value) => {
    return {
        type: SET_VIEW,
        value: value
    }
}