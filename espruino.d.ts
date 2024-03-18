
declare module "Wifi" {
    function startAP(ssid: string, options: any, callback: (err: any) => any): any;

    interface WifiEvents {
        associated: (event: details) => void
        sta_joined: (event: details) => void
        disconnected: (event: details) => void
        sta_left: (event: details) => void
        probe_recv: (event: details) => void
        auth_change: (event: details) => void
        connected: (event: details) => void
        dhcp_timeout: () => void
    }

    function on<T extends keyof WifiEvents>(
        event: T,
        listener: WifiEvents[T]
    ): void;
    // http://www.espruino.com/Reference#Wifi
    //    function connect(ssid, options, callback):any
    function disconnect(callback): any
    function getAPDetails(callback): any
    function getAPIP(callback): any
    function getDetails(callback: (details: {
        status: "off" | "connecting" | "wrong_password" | "no_ap_found" | "connect_fail" | "connected"//- 有关 wifi 站连接的详细信息，其中之一 . 关闭、 密码错误和连接状态稳定，其他状态为 短暂的。 连接状态将导致已连接或其中之一 错误状态（ 密码错误、未 找到AP 、连接 失败）以及未 找到AP 和 连接 失败状态将导致在一段时间后尝试重新连接。
        rssi: number// 连接的接入点的信号强度（以 dB 为单位），通常为 范围 -110 到 0，任何大于 -30 的值都过强 信号。
        ssid: string// 接入点的 SSID。
        password: string//用于连接到接入点的密码。
        authMode: "open" | "wpa" | "wpa2" | "wpa_wpa2" //使用的身份验证： open, wpa, wpa2, wpa_wpa2（不是 目前支持）。
        savedSsid: string | null// 启动时自动连接的 SSID，如果没有则为 null。
    }) => void): any
    function getHostByName(hostname, callback): any
    function getHostname(callback): any
    function getIP(cb: (err, ipinfo: ipinfo) => void): any
    function getStatus(callback): any
    function ping(hostname, callback): any
    function restore(): any
    function save(what: "clear" | "sta+ap" = "sta+ap"): any // 一个可选参数，用于指定要保存的内容，在 esp8266 上，支持的两个值是 clear和 sta+ap。 默认为 sta+ap
    function scan(callback): any
    function setAPIP(settings, callback): any
    function setConfig(settings): any
    function setHostname(hostname, callback): any
    function setIP(settings, callback): any
    function setSNTP(server, tz_offset): any
    //    function startAP(ssid, options, callback):any
    function stopAP(callback): any
    function turbo(enable, callback): any

    export interface ipinfo {
        "ip": string
        "netmask": string
        "gw": string
        "mac": string
    }

}

declare module "Storage" {
    type name = string //文件名 - 最多 28 个字符（区分大小写）
    function compact(showMessage)
    function debug()
    function erase(name: name)
    function eraseAll()
    function getFree(checkInternalFlash)
    function getStats(checkInternalFlash)
    function hash(regex)
    function list(regex, filter)
    function open(name: name, mode)
    function optimise()
    function read(name: name, offset, length)
    function readArrayBuffer(name: name)
    function readJSON(name: name): JSONType
    function readJSON(name: name, noExceptions: true): JSONType | undefined //noExceptions- 如果 true 并且 JSON 无效，则返回 undefined- 否则 Exception被抛出
    function write(name: name, data, offset, size)
    function writeJSON(name: name, data)

}
/** */
declare module "ESP8266" {
    /**
     * <p>Perform a hardware reset/reboot of the esp8266.</p>
     *
     * @url http://www.espruino.com/Reference#l_ESP8266_reboot
     */
    function reboot(): void;

    /**
     * <p>Enable or disable the logging of debug information.  A value of <code>true</code> enables debug logging while a value of <code>false</code> disables debug logging.  Debug output is sent to UART1 (gpio2).</p>
     *
     * @param enable
     * @url http://www.espruino.com/Reference#l_ESP8266_logDebug
     */
    function logDebug(enable: boolean): void;

    /**
     * <p>Set the debug logging mode. It can be disabled (which frees ~1.2KB of heap), enabled in-memory only, or in-memory and output to a UART.</p>
     *
     * @param mode
     * @url http://www.espruino.com/Reference#l_ESP8266_setLog
     */
    function setLog(mode: number): void;

    /**
     * <p>Prints the contents of the debug log to the console.</p>
     *
     * @url http://www.espruino.com/Reference#l_ESP8266_printLog
     */
    function printLog(): void;

    /**
     * <p>Returns one line from the log or up to 128 characters.</p>
     *
     * @url http://www.espruino.com/Reference#l_ESP8266_readLog
     */
    function readLog(): void;

    /**
     * <p>Dumps info about all sockets to the log. This is for troubleshooting the socket implementation.</p>
     *
     * @url http://www.espruino.com/Reference#l_ESP8266_dumpSocketInfo
     */
    function dumpSocketInfo(): void;

    /**
     * <p><strong>Note:</strong> This is deprecated. Use <code>E.setClock(80/160)</code>
     * <strong>Note:</strong>
     * Set the operating frequency of the ESP8266 processor. The default is 160Mhz.</p>
     * <p><strong>Warning</strong>: changing the cpu frequency affects the timing of some I/O operations, notably of software SPI and I2C, so things may be a bit slower at 80Mhz.</p>
     *
     * @param freq
     * @url http://www.espruino.com/Reference#l_ESP8266_setCPUFreq
     */
    function setCPUFreq(freq: any): void;

    /**
     * <p>Returns an object that contains details about the state of the ESP8266 with the following fields:</p>
     * <ul>
     * <li><code>sdkVersion</code>   - Version of the SDK.</li>
     * <li><code>cpuFrequency</code> - CPU operating frequency in Mhz.</li>
     * <li><code>freeHeap</code>     - Amount of free heap in bytes.</li>
     * <li><code>maxCon</code>       - Maximum number of concurrent connections.</li>
     * <li><code>flashMap</code>     - Configured flash size&amp;map: &#39;512KB:256/256&#39; .. &#39;4MB:512/512&#39;</li>
     * <li><code>flashKB</code>      - Configured flash size in KB as integer</li>
     * <li><code>flashChip</code>    - Type of flash chip as string with manufacturer &amp; chip, ex: &#39;0xEF 0x4016`</li>
     * </ul>
     *
     * @return
     * @url http://www.espruino.com/Reference#l_ESP8266_getState
     */
    function getState(): any;

    /**
     * <p><strong>Note:</strong> This is deprecated. Use <code>require(&quot;flash&quot;).getFree()</code></p>
     *
     * @return
     * @url http://www.espruino.com/Reference#l_ESP8266_getFreeFlash
     */
    function getFreeFlash(): any;

    /**
     * @param arrayOfData
     * @return
     * @url http://www.espruino.com/Reference#l_ESP8266_crc32
     */
    function crc32(arrayOfData: any): any;

    /**
     * <p><strong>This function is deprecated.</strong> Please use <code>require(&quot;neopixel&quot;).write(pin, data)</code> instead</p>
     *
     * @param pin
     * @param arrayOfData
     * @url http://www.espruino.com/Reference#l_ESP8266_neopixelWrite
     */
    function neopixelWrite(pin: Pin, arrayOfData: any): void;

    /**
     * <p>Put the ESP8266 into &#39;deep sleep&#39; for the given number of microseconds,
     * reducing power consumption drastically. </p>
     * <p>meaning of option values:</p>
     * <p>0 - the 108th Byte of init parameter decides whether RF calibration will be performed or not.</p>
     * <p>1 - run RF calibration after waking up. Power consumption is high.</p>
     * <p>2 - no RF calibration after waking up. Power consumption is low.</p>
     * <p>4 - no RF after waking up. Power consumption is the lowest.</p>
     * <p><strong>Note:</strong> unlike normal Espruino boards&#39; &#39;deep sleep&#39; mode, ESP8266 deep sleep actually turns off the processor. After the given number of microseconds have elapsed, the ESP8266 will restart as if power had been turned off and then back on. <em>All contents of RAM will be lost</em>.
     * Connect GPIO 16 to RST to enable wakeup.</p>
     * <p><strong>Special:</strong> 0 microseconds cause sleep forever until external wakeup RST pull down occurs.</p>
     *
     * @param micros
     * @param option
     * @url http://www.espruino.com/Reference#l_ESP8266_deepSleep
     */
    function deepSleep(micros: any, option: any): void;

    /**
     * <p>Perform a network ping request. The parameter can be either a String or a numeric IP address.
     * <strong>Note:</strong> This function should probably be removed, or should it be part of the wifi library?</p>
     *
     * @param ipAddr
     * @param pingCallback
     * @url http://www.espruino.com/Reference#l_ESP8266_ping
     */
    function ping(ipAddr: any, pingCallback: any): void;
}

type JSONType = string | number | boolean | null | JSONObject | JSONArray
type JSONObject = {
    [key: string]: JSONType;
};
type JSONArray = JSONObject[];