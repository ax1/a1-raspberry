/**
 * Pins IN BCM numbering
 * 
 * REPEAT: PINS IN **BCM** NUMBERING (even if gpio command uses wiring numbering by default)
 * see http://wiringpi.com/the-gpio-utility/
 */
const exec = require('util').promisify(require('child_process').exec)

const gpio_mode = "gpio -g mode"
const gpio_read = "gpio -g read"
const gpio_write = "gpio -g write"

/**
 * Generic binary execution.
 * If stderr but exit was 0, the response is treated as Error
 * @param {string} command 
 */
async function execute(command) {
  const { stdout, stderr } = await exec(command)
  if (stderr.toString()) throw new Error(stderr.toString())
  return stdout.toString()
}

/**
 * Configure the pin mode (input, output, pull resisitors, etc)
 * @param {number} pin    The pin number (in BCM numbering)
 * @param {string} mode   Available values: in/out/pwm/clock/up/down/tri (see http://wiringpi.com/the-gpio-utility/)
 * @returns {string}      Response from a success execution. Typically, the response is not needed. 
 */
async function configure(pin, mode) {
  return await execute(`${gpio_mode} ${pin} ${mode}`)
}

/**
 * Read pin value
 * @param {number} pin    The pin number (in BCM numbering)
 * @returns {number}      Response from a success execution. Values are 0 or 1 (0 volts or 3.3 volts)
 */
async function read(pin) {
  const sval = await execute(`${gpio_read} ${pin}`)
  return parseInt(sval)
}

/**
 * Set pin value (the voltage output to LOW or HIGH)
 * @param {number} pin    The pin number (in BCM numbering)
 * @param {number} value  The pin logic value. Values are 0 or 1 (0 volts or 3.3 volts)
 * @returns {string}      Response from a success execution. Typically, the response is not needed.
 */
async function write(pin, value) {
  return await execute(`${gpio_write} ${pin} ${value}`)
}

module.exports = { configure, read, write }

