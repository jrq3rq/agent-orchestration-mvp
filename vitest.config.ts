import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    // No setupFiles needed if dotenv is loaded elsewhere or not required in tests
    // If you still need dotenv, add: setupFiles: ['./tests/setup.ts']
  },
});