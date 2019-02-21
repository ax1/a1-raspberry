const assert = require('assert')
const gpio = require('../index')

async function test() {
  const PIN = 4
  await gpio.configure(PIN, 'out') // configure as output
  await gpio.write(PIN, 1) // set pin to 3.3V
  setTimeout(() => { gpio.write(PIN, 0) }, 5000)
  const val = await gpio.read(PIN) // return 1 (3.3V)
  assert.deepStrictEqual(val, 1)
}
test().catch(err => console.error(err))