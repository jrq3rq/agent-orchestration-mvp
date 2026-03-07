import 'dotenv/config';
import { describe, it, expect } from 'vitest';
import { graph } from '../../src/graphs/mainGraph';

describe('mainGraph', () => {
  it('invokes without crashing on minimal input', async () => {
    const initialState = {
      input: 'Test input',
      messages: [],
      history: [],
      results: '',
    };

    console.log('Test started...');

    const result = await graph.invoke(initialState, {
      recursionLimit: 5,
    });

    console.log('Test completed. Result:', result);

    expect(result).toBeDefined();
    expect(result.results).toContain('Research'); // adjust if output changes
  }, 60000); // 60 seconds timeout
});