import {graphqurl} from './deps.ts'
// @ts-ignore NPM mismatch
const {query, Client} = graphqurl.default

export default class Api {
  constructor(
    readonly endpoint: string,
    readonly authToken: string,
    readonly repositoryId: number
  ) {}

  async read(metricKey: string) {
    const result = await query(
      {
        query: `
        query ($repositoryId: Int!, $metricKey: String!) {
          repoMeasurement: latestRepoMeasurement(repositoryId: $repositoryId, metricKey: $metricKey ) {
            createdAt
            value
            repositoryId
            metricId
            __typename
          }
        }
        `,
        endpoint: this.endpoint,
        headers: {
          'x-access-key': 'mysecretxxx',
        },
        variables: {
          repositoryId: this.repositoryId, metricKey: metricKey
        }
      })

    return result.data.repoMeasurement.value
  }

  async write(metricKey: string, value: number) {
    const result = await query(
      {
        query: `
        mutation CreateRepoMeasurementMutation($input: CreateRepoMeasurementInput!) {
          createRepoMeasurement(input: $input) {
            id
            __typename
          }
        }
        `,
        endpoint: this.endpoint,
        headers: {
          'x-access-key': 'mysecretxxx',
        },
        variables: {
          input: {repositoryId: this.repositoryId, metricKey, value}
        }
      })
  }
}
