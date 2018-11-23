import {Command} from '@oclif/command'
const fs = require('fs-extra')
import chalk from 'chalk'
import * as inquirer from 'inquirer'
import * as Mustache from 'mustache'
import outdent from 'outdent'

const projectTemplateDir = `${__dirname}/../project`

class ProjectGenerator {
  private group: string;
  private artifact: string;
  private cmd: Command;

  constructor(cmd: Command, group: string, artifact: string) {
    this.group = group;
    this.artifact = artifact;
    this.cmd = cmd;
  }

  private async createProjectDirectoryStructure() {
    const packageDir = this.group.replace(/\./g, '/')
    await fs.mkdir(this.artifact)
    await fs.mkdir(`${this.artifact}/lint`)
    await fs.ensureDir(`${this.artifact}/src/main/java/${packageDir}`)
    return await fs.ensureDir(`${this.artifact}/src/test/java/${packageDir}`)
  }

  private async copyToProjectDir(src:string) {
    return await fs.copy(`${projectTemplateDir}/${src}`, `${this.artifact}/${src}`)
  }

  private async renderTemplate(templateFile: string, templateData: any) {
    const tmpl = await fs.readFile(`${projectTemplateDir}/${templateFile}`, 'utf8')
    const renderedTmpl = await Mustache.render(tmpl, templateData)
    return renderedTmpl
  }
  private async renderTemplateAndMoveToProjectDir(templateFile:string, templateData: any) {
    const filepath = templateFile.replace(".tmpl", "")
    const renderedTmpl = await this.renderTemplate(templateFile, templateData)
    return await fs.writeFile(`${this.artifact}/${filepath}`, renderedTmpl)
  }

  private async addGitignore() {
    return await this.copyToProjectDir('.gitignore')
  }

  async addGradleScripts() {
    await this.copyToProjectDir('gradlew')
    await this.copyToProjectDir('gradlew.bat')
    await this.copyToProjectDir('gradle.properties')
    await this.copyToProjectDir('gradle')
    await this.renderTemplateAndMoveToProjectDir('build.gradle.tmpl', {group: this.group});
    return await this.renderTemplateAndMoveToProjectDir('settings.gradle.tmpl', {artifact: this.artifact});
  }

  async addStaticAnalysisScripts() {
    return await this.copyToProjectDir('.baseline');
  }

  async addStaticAssets() {
    return await this.copyToProjectDir('static')
  }

  async addRootApplication() {
    const packageDir = this.group.replace(/\./g, '/')
    const appFile = await this.renderTemplate('App.java.tmpl', {group: this.group})
    return await fs.outputFile(`${this.artifact}/src/main/java/${packageDir}/App.java`, appFile)
  }

  async generate() {
    const nameExists: boolean = await fs.exists(this.artifact)
    if (nameExists) {
      this.cmd.error(`A file or directory with the name ${this.artifact} already exists`)
    } else {
      await this.createProjectDirectoryStructure()
      await this.addGitignore()
      await this.addGradleScripts()
      await this.addStaticAnalysisScripts()
      await this.addStaticAssets()
      await this.addRootApplication()

      this.cmd.log(chalk.green(outdent`
      Your app is ready!

      cd ${this.artifact}
      spring-cli runserver
      `));
    }
  }
}


export default class CreateProjectCommand extends Command {
  static description = 'Create a new Spring Boot project'

  async run() {
    const {group, artifact}: any = await inquirer.prompt([
        {name: 'group', message: 'What is the package name?'},
        {name: 'artifact', message: 'What is the project name?'}
    ])

    const projectGenerator = new ProjectGenerator(this, group, artifact);
    await projectGenerator.generate()
  }
}
