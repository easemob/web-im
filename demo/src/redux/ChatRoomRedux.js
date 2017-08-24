import {createReducer, createActions} from "reduxsauce"
import Immutable from "seamless-immutable"
import {WebIM} from "@/config"
/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({

    updateChatRooms: ["rooms"],
    // ---------------async------------------
    getChatRooms: () => {
        return (dispatch, getState) => {
            // console.log('getChatRooms', getState())
            let pagenum = 1
            let pagesize = 10
            WebIM.conn.getChatRooms({
                apiUrl: WebIM.config.apiURL,
                pagenum: pagenum,
                pagesize: pagesize,
                success: function (resp) {
                    // console.log('aa', resp)
                    resp.data && dispatch(Creators.updateChatRooms(resp.data))
                },
                error: function (e) {
                }
            })
        }
    }
})

export const GroupsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    // byName: {},
    byId: {},
    names: []
})

/* ------------- Reducers ------------- */
export const updateChatRooms = (state, {rooms}) => {
    // let byName = {}
    let byId = {}
    let names = []
    rooms.forEach(v => {
        // byName[v.name] = v
        byId[v.id] = v
        names.push(v.name + '_#-#_' + v.id)
    })
    return state.merge({
        byId: byId,
        names: names.sort()
    })
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.UPDATE_CHAT_ROOMS]: updateChatRooms
})

/* ------------- Selectors ------------- */
