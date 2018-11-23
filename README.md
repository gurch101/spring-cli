spring-cli
==========



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/spring-cli.svg)](https://npmjs.org/package/spring-cli)
[![Downloads/week](https://img.shields.io/npm/dw/spring-cli.svg)](https://npmjs.org/package/spring-cli)
[![License](https://img.shields.io/npm/l/spring-cli.svg)](https://github.com/gurch101/spring-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g spring-cli
$ spring-cli COMMAND
running command...
$ spring-cli (-v|--version|version)
spring-cli/0.1.0 linux-x64 node-v10.2.1
$ spring-cli --help [COMMAND]
USAGE
  $ spring-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`spring-cli createproject`](#spring-cli-createproject)
* [`spring-cli help [COMMAND]`](#spring-cli-help-command)
* [`spring-cli runserver`](#spring-cli-runserver)

## `spring-cli createproject`

Create a new Spring Boot project

```
USAGE
  $ spring-cli createproject
```

_See code: [src/commands/createproject.ts](https://github.com/gurch101/spring-cli/blob/v0.1.0/src/commands/createproject.ts)_

## `spring-cli help [COMMAND]`

display help for spring-cli

```
USAGE
  $ spring-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.4/src/commands/help.ts)_

## `spring-cli runserver`

Runs the Spring Boot application

```
USAGE
  $ spring-cli runserver
```

_See code: [src/commands/runserver.ts](https://github.com/gurch101/spring-cli/blob/v0.1.0/src/commands/runserver.ts)_
<!-- commandsstop -->
