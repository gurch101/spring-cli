const {spawn} = require('child_process')

const runCommand = (command: string, args: string[], onDataCallback?: (data:Buffer) => void) => {
    const cmd = spawn(command, args)
    cmd.stdout.pipe(process.stdout)
    cmd.stderr.pipe(process.stderr)
    if(onDataCallback) {
        cmd.stdout.on('data', onDataCallback)
    }
}

export default runCommand;