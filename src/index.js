
// Silence `console.log` temporarily since Theatre.js uses it to print a warning about running on a server when run
// with the `node` command.
const originalConsoleLog = console.log
console.log = () => {}

const THEATRE = require('@theatre/core')
const state = require('./state.json')

console.log = originalConsoleLog


const { getProject } = THEATRE

const project = getProject('THREE.js x Theatre.js', { state })

project.ready.then(() => {
    const sheet = project.sheet('sample sheet')

    // NB: The signature of the 2nd args object must match what's in state.json.
    const sampleObject = sheet.object('sample object', {
        "position": {
          "x": 0,
          "y": 0
        }
    })

    console.log(`sequence ...`)
    const sequence = sheet.sequence

    // NB: `sequence.position` uses seconds for its value, so for this example we'll advance at 60 frames per second.
    for (let i = 0; i < 20; i+=1/60) {
        sequence.position = i

        // If `sequence.position` does not equal what we set it to (`i` in this case), then we assume the end of the
        // sequence has been reached.
        if (sequence.position !== i) {
            break
        }

        // Log the sample object's new value. `position.x` should change and `position.y` should stay the same.
        const value = sampleObject.value
        console.log(`i: ${i}, sequence.position: ${sequence.position}`)
        console.log(value)
        console.log()
    }

    console.log(`sequence - done`)
})
