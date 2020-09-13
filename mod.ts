import { parse, green, bold } from './deps.ts'
import { displayHelpAndQuit } from './error.ts'
import Api from './api.ts'

const DEFAULT_ENDPOINT='https://heuristic-pare-06a29d.netlify.app/.netlify/functions/graphql'

// CLI override, e.g. ENDPOINT=http://localhost:8910/.netlify/functions/graphql
const ENDPOINT = Deno.env.get('SG_ENDPOINT') || DEFAULT_ENDPOINT

const TOKEN = Deno.env.get('SG_TOKEN')

const displayBanner = (): void => {
  console.log(bold('---------------'))
  console.log(
    bold(
      green(`
   Squad Goals
`)
    )
  )
  console.log(bold('---------------'))
  console.log(bold(green(`\nSet and progress on codebase metrics\n`)))
}

if (import.meta.main) {
  const { args } = Deno
  const parsedArgs = parse(args, { string: ['read', 'write'] })
  displayBanner()
  if (args.length === 0 || parsedArgs.h || parsedArgs.help) {
    displayHelpAndQuit()
  } else if (parsedArgs.repositoryId && parsedArgs.metricKey) {
    if (!TOKEN) {
      displayHelpAndQuit('SG_TOKEN must be specified')
      Deno.exit(1)
    }
    const apiClient = new Api(
      ENDPOINT,
      TOKEN,
      parsedArgs.repositoryId
    )
    const [command, value] = parsedArgs._
    console.log('Executing', command, value)
    if (command === 'write') {
      await apiClient.write(parsedArgs.metricKey, Number(value))
    } else if (command === 'read') {
      const value = await apiClient.read(parsedArgs.metricKey)
      console.log('VALUE', value)
    }
    else displayHelpAndQuit('Invalid command')
  } else displayHelpAndQuit('Invalid argument')
}
