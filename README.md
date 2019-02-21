# A1-RASPBERRY

Utilities for Raspberry PI devices. Promise based. Zero dependencies.

> Note: this library uses the **BCM pinout** by default. See https://pinout.xyz/

## Installation

```bash
npm install a1-raspberry
```

## Usage

### GPIO pins

The module uses the `gpio` command installed in the raspberry. See http://wiringpi.com/the-gpio-utility/ for available options. For the sake of simplicity the module uses **the BCM pinout** (by adding the -g flag to the gpio command)

```javascript
const { gpio } = require('a1-raspberry')

async function test() {
  const PIN = 4
  await gpio.configure(PIN, 'out') // configure as output
  await gpio.write(PIN, 1) // set pin to 3.3V
  setTimeout(() => { gpio.write(PIN, 0) }, 5000)
  const val = await gpio.read(PIN) // return 1 (3.3V)
  gpio.execute('gpio -g write 4 1') // execute a custom command
}

test().catch(err => console.error(err))
```