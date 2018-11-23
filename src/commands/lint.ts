import {Command} from '@oclif/command'
import runCommand from '../utils/runCommand'


export default class LintCommand extends Command {
  static description = 'Lints the application using PMD'

  async run() {
    runCommand('./gradlew', ['check'])
  }
}
