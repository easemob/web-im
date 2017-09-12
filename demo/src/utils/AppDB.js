

// 数据结构
import Dexie from "dexie"
import utils from "@/utils"

const DB_NAME = utils.getUserName()
const DB_VERSION = "2.0"

const TABLE_NAME = "webim_history"
const TABLE_INDEX_KEYS = [ "id", "[from+to]", "type", "isUnread" ]
const PAGE_NUM = 20

// create a database, use username as db name
const db = new Dexie(DB_NAME)

// create a table, use TABLE_NAME as table name
db.version(DB_VERSION).stores({
    [TABLE_NAME] : TABLE_INDEX_KEYS.join(",")
})

// save the table for quickly visit
const $_TABLE = db.table(TABLE_NAME)

// API list for redux
// ----------------------
// 1. 获取各个类型聊天室下新消记录
// 2. 获取某个对话的历史聊天记录(id, from, count)
// 3. 清空某个对话未读消息状态
// 4. 添加一条（已读/未读）消息
// 5. 清空某个对话的历史消息
// ----------------------

const AppDB = {
    
    // get conversaion unread message number
    getUnreadMessage(id) {
        return $_TABLE.where({ "from": id, "isUnread": 1 })
    },

    // get unread messages
    getUnreadList() {
        return $_TABLE.where("isUnread")
            .equals(1)
            .toArray()
    },

    // get lastest mumber of message by start index
    getLatestMessage(id, chatType = "chat", offset = 0) {
        return $_TABLE.where("type")
            .equals(chatType)
            .filter(item => {
                if (chatType === "chat") {
                    return item.from == id || item.to == id
                } else {
                    return item.from == id
                }
            })
            .offset(offset)
            .limit(PAGE_NUM)
            .sortBy("time")
    },

    // make message unread -> read
    readMessage(chatType, id) {
        const propName = chatType === "chat" ? "from" : "to"
        return $_TABLE.where({ "type": chatType, [propName]: id, "isUnread": 1 })
            .modify({ "isUnread": 0 })
    },

    // add a message to the database
    addMessage(message, isUnread = 0) {
        message.isUnread = isUnread
        if (message.type === "chat") {

        }
        return $_TABLE.add(message)
    },

    // clear conversation history message
    clearAllMessage(id) {
        
    }

}

// in order to test in browser, will be removed
window.AppDB = AppDB
window.db = db
window.$_TABLE = $_TABLE

export default AppDB
