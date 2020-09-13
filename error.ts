import { red, bold, cyan } from './deps.ts'

// Shows help text, error message(if present) and exits the program
export const displayHelpAndQuit = (error?: string): void => {
  if (error) {
    switch (error) {
      case'INVALID_KEY':
      console.log(
        bold(red(`Error: Invalid API key. Use --config flag to set key`))
      )
      default:
      console.log(bold(red(`Error: ${error}`)))
    }
  }
  console.log(`Usage: squad-goals [read | write value ]\n`)
  console.log(`Optional flags:`)
  console.log(`   ${bold('-h, --help')}\t\t Shows this help message and exits`)
  console.log(`   ${bold('--repositoryId')}\t Repository ID`)
  console.log(`   ${bold('--metricKey')}\t\t Metric key`)
  console.log(`\nEXAMPLES\n
  SG_TOKEN=secret squad-goals --repositoryId=1 --metricKey=typescript:uncovered-expression write --value=29000
  SG_TOKEN=secret squad-goals --repositoryId=1 --metricKey=typescript:uncovered-expression read
  `)
  // Exits the program
  Deno.exit()
}
