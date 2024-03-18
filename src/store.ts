import store = require("Storage")
import { s_count, s_wifi } from "./const"
export const count = store.readJSON(s_count) as number
store.writeJSON(s_count, (count || 0) + 1)
export const wifiConfig = store.readJSON(s_wifi) as { ssid: string, pwd: string }