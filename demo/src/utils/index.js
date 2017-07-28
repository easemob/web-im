import Cookie from "js-cookie"
import qs from "qs"

const lo = window.location

export { default as history } from "./history"

const { username } = qs.parse(lo.hash.split("?")[1])

export default {
	getHash() {
		return lo.hash
	},
	getToken() {
		return Cookie.get("web_im_" + username)
	},
	hasToken() {
		return Cookie.get("web_im_" + username)
	},
	getUserName() {
		return username
	}
}
