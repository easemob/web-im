export const MATCH_MEDIA = "MATCH_MEDIA"
export const USER_LOGOUT = "USER_LOGOUT"

export function breakpointReducer(state = {}, action) {
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
