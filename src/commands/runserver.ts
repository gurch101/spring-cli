import {Command} from '@oclif/command'
import opn = require('opn')
import runCommand from '../utils/runCommand'

export default class RunServerCommand extends Command {
  static description = 'Runs the Spring Boot application'

  async run() {
    runCommand('./gradlew', ['build', '--continuous'])
    runCommand('./gradlew', ['bootRun'], (data:Buffer) => {
      if(data.toString().includes('Started App')) {
        opn('http://localhost:8080')
      }
    })
  }
}
