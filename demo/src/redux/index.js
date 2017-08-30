import { createStore, applyMiddleware, compose, combineReducers } from "redux"
import { config } from "@/config"
import { forEach } from "lodash"
import thunkMiddleware from "redux-thunk"
import { loadTranslations, setLocale, syncTranslationWithStore, i18nReducer } from "react-redux-i18n"
import { translationsObject } from "@/config/i18n/index.js"
import WebIMConfig from "@/config/WebIMConfig"

// todo media query pollyfill
import { breakpointReducer, combinedReducer, MATCH_MEDIA } from "./IndexRedux"

/* ------------- Redux Dev Tools ------------- */

const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose

const enhancers = []

// const customMiddleware = store => next => action => {
//     next({ ...action, getState: store.getState })
// }
const middlewares = [thunkMiddleware]

enhancers.push(applyMiddleware(...middlewares))

/* ------------- Assemble The Reducers ------------- */

const initState = {
    breakpoint: {},
    entities: {},
    login: {},
    register: {},
    im: {}
}
const rootReducer = combineReducers({
    breakpoint: breakpointReducer,
    entities: combineReducers({
        roster: require("./RosterRedux").reducer,
        group: require("./GroupRedux").reducer,
        chatroom: require("./ChatRoomRedux").reducer,
        stranger: require("./StrangerRedux").reducer,
        groupMember: require("./GroupMemberRedux").reducer,
        subscribe: require("./SubscribeRedux").reducer,
        blacklist: require("./BlacklistRedux").reducer,
        message: require("./MessageRedux").reducer,
        groupRequest: require("./GroupRequestRedux").reducer
    }),
    common: require("./CommonRedux").reducer,
    login: require("./LoginRedux").reducer,
    register: require("./RegisterRedux").reducer,
    contacts: require("./ContactsScreenRedux").reducer,
    im: require("./WebIMRedux").reducer,
    i18n: i18nReducer
})

/* ------------- Global Reducers ------------- */
const appReducer = (state = initState, action) => {
    const newState = combinedReducer(state, action)
    return rootReducer(newState, action)
}

/* ------------- Enhancers ------------- */

export const store = createStore(appReducer, composeEnhancers(...enhancers))

// store.subscribe(() => console.log(store.getState()))

syncTranslationWithStore(store)
store.dispatch(loadTranslations(translationsObject))
store.dispatch(setLocale(WebIMConfig.i18n))

/* ------------- Media Query ------------- */
// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
if (typeof window !== "undefined") {
    const matchMediaPolyfill = mediaQuery => {
        return {
            media: mediaQuery,
            matches: false,
            addListener() {},
            removeListener() {}
        }
    }
    window.matchMedia = window.matchMedia || matchMediaPolyfill
}

if (config.reduxMatchMedia) {
    let matchMedia
    if (typeof window !== "undefined") {
        matchMedia = window.matchMedia
    }
    let mql = []
    forEach(config.dimensionMap, (px, k) => {
        mql[k] = matchMedia(`(max-width: ${px})`)
        mql[k].addListener(e => {
            // console.log("mql", k, e)
            store.dispatch({
                type: MATCH_MEDIA,
                k,
                v: e
            })
        })
        // default init
        // console.log(k, mql[k])
        store.dispatch({
            type: MATCH_MEDIA,
            k,
            v: mql[k]
        })
    })
}

export default {
    store
}
