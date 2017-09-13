import * as loglevel from "loglevel"
import config from "../config/WebIMConfig"

loglevel.setLevel(config.loglevel)

export default loglevel
