import { defineConfig } from 'orval'

export default defineConfig({
  api: {
    input: 'go-track-api.json',
    output: {
      target: './src/http/server.ts',
      schemas: './src/http/schemas',
      client: 'axios',
      override: {
        mutator: {
          path: './src/http/orval-mutator.ts',
          name: 'customInstance',
        },
      },
    },
  },
})
