export const MATCH_MEDIA = "INDEX::MATCH_MEDIA"
export const USER_LOGOUT = "INDEX::LOGOUT"

const defaultState = {}

export function breakpointReducer(state = defaultState, action) {
    switch (action.type) {
    case MATCH_MEDIA:
        return {
            ...state,
            [action.k]: action.v.matches
        }
    default:
        return state
    }
}

export function combinedReducer(state = {}, action) {
    switch (action.type) {
    case USER_LOGOUT:
        return {}
    default:
        return state
    }
}
