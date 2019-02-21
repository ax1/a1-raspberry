# A1-RASPBERRY

Utilities for Raspberry PI devices. Promise based. Zero dependencies.

> Note: this library uses the **BCM pinout** by default. See https://pinout.xyz/

## Installation

```bash
npm install a1-raspberry
```

## Usage

The module uses the `gpio` command installed in the raspberry. See http://wiringpi.com/the-gpio-utility/ for available options. For the sake of simplicity the module uses **the BCM pinout** (by adding the -g flag to the gpio command)

```javascript
async function test() {
  const PIN = 4
  await configure(PIN, 'out') // configure as output
  await write(PIN, 1) // set pin to 3.3V
  setTimeout(() => { write(PIN, 0) }, 5000)
  console.log (await read(PIN)) // return number 1 (3.3V)
}

test().catch(err => console.error(err))
```