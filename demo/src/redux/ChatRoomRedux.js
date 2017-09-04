import { createReducer, createActions } from "reduxsauce"
import Immutable from "seamless-immutable"
import _ from "lodash"
import { WebIM } from "@/config"
import { store } from "@/redux"
import CommonActions from "@/redux/CommonRedux"
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    updateChatRooms: [ "rooms" ],
    topChatroom: [ "roomId" ],
    // ---------------async------------------
    getChatRooms: () => {
        return (dispatch, getState) => {
            store.dispatch(CommonActions.getChatRoomAlready())
            // console.log('getChatRooms', getState())
            let pagenum = 1
            let pagesize = 10
            WebIM.conn.getChatRooms({
                apiUrl: WebIM.config.apiURL,
                pagenum: pagenum,
                pagesize: pagesize,
                success: function(resp) {
                    // console.log('aa', resp)
                    resp.data && dispatch(Creators.updateChatRooms(resp.data))
                },
                error: function(e) {}
            })
        }
    },
    joinChatRoom: roomId => {
        return (dispatch, getState) => {
            WebIM.conn.joinChatRoom({
                roomId: roomId
            })
        }
    },
    quitChatRoom: roomId => {
        return (dispatch, getState) => {
            WebIM.conn.quitChatRoom({
                roomId: roomId
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
export const updateChatRooms = (state, { rooms }) => {
    // let byName = {}
    let byId = {}
    let names = []
    rooms.forEach(v => {
        // byName[v.name] = v
        byId[v.id] = v
        names.push(v.name + "_#-#_" + v.id)
    })
    return state.merge({
        byId: byId,
        names: names.sort()
    })
}

export const topChatroom = (state, { roomId }) => {
    let names = state.getIn([ "names" ], Immutable([])).asMutable()
    for (let i = 0; i < names.length; i++) {
        const name = names[i]
        if (name.split("_#-#_")[1] === roomId) {
            if (i === 0) return state // if already top, return directly
            names = _.without(names, name)
            names.unshift(name)
            break
        }
    }
    return state.merge({ names })
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.UPDATE_CHAT_ROOMS]: updateChatRooms,
    [Types.TOP_CHATROOM]: topChatroom
})

/* ------------- Selectors ------------- */
