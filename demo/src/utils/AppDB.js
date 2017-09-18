

import Dexie from "dexie"
import WebIMConfig from "@/config/WebIMConfig"
import { config } from "@/config/"

const DB_ENABLE = WebIMConfig.enableLocalStorage
const DB_VERSION = "2.0"

const TABLE_NAME = "webim_history"
const TABLE_INDEX_KEYS = [ "id", "from", "to", "type", "isUnread", "status" ]
const { PAGE_NUM } = config

const AppDB = {

    // init db
    init: function(username) {

        if (!DB_ENABLE || this.db) {
            return
        }

        // create a database, use username as db name
        const db = new Dexie(username)
        
        // create a table, use TABLE_NAME as table name
        db.version(DB_VERSION).stores({
            [TABLE_NAME] : TABLE_INDEX_KEYS.join(",")
        })

        this.db = db
        this.$_TABLE = db.table(TABLE_NAME)
    },
    
    exec(cb1, cb2) {
        return new Promise(function(resolve, reject) {
            if (DB_ENABLE) {
                cb1(resolve)
            } else {
                cb2 && cb2(reject)
            }
        })
    },

    // get unread messages
    getUnreadList() {
        const $_TABLE = this.$_TABLE
        return this.exec(resolve => {
            $_TABLE.where("isUnread").equals(1).toArray().then(res => resolve(res))
        })
    },

    // get lastest mumber of message by start index
    fetchMessage(id, chatType = "chat", offset = 0, limit = PAGE_NUM) {
        const $_TABLE = this.$_TABLE
        return this.exec(resolve => {
            $_TABLE.where("type")
                .equals(chatType)
                .filter(item => {
                    if (item.error) {
                        return false
                    }
                    if (chatType === "chat") {
                        return item.from == id || item.to == id
                    } else {
                        return item.to == id
                    }
                })
                .reverse()
                .offset(offset)
                .limit(limit)
                .sortBy("time")
                .then(res => {
                    resolve(res.reverse())
                })
        })
    },

    // read all messages of conversation
    readMessage(chatType, id) {
        const $_TABLE = this.$_TABLE
        const key = chatType === "chat" ? "from" : "to"
        return this.exec(resolve => {
            $_TABLE.where({ "type": chatType, [key]: id, "isUnread": 1 })
                .modify({ "isUnread": 0 })
                .then(res => {
                    resolve(res)
                })
        })
    },

    // update  message status
    updateMessageStatus(id, status) {
        const $_TABLE = this.$_TABLE
        return this.exec(resolve => {
            $_TABLE.where("id")
                .equals(id)
                .modify({ "status": status })
                .then(res => {
                    resolve(res)
                })
        })
    },

    // add a message to the database
    addMessage(message, isUnread = 0) {
        const $_TABLE = this.$_TABLE
        if (!message.error) {
            return this.exec(resolve => {
                $_TABLE.where("id").equals(message.id).count().then(res => {
                    if (res === 0 ) {
                        message.isUnread = isUnread
                        $_TABLE.add(message)
                            .then(res => resolve(res))
                            .catch(e => console.log("add messaga:", e))
                    }
                })
            })
        }
    },

    // clear all messages of specified conversation
    clearMessage(chatType, id) {
        const $_TABLE = this.$_TABLE
        return this.exec(resolve => {
            $_TABLE.where("type")
                .equals(chatType)
                .filter(item => {
                    if (chatType === "chat") {
                        return item.from == id || item.to == id
                    } else {
                        return item.to == id
                    }
                })
                .delete()
                .then(res => resolve(res))
        })
    }

}

// in order to test in browser, will be removed
window.AppDB = AppDB

export default AppDB
