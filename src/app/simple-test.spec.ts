// Simple test to verify Jest is working
describe('Simple Test', () => {
  it('should work', () => {
    expect(true).toBe(true);
  });

  it('should add numbers', () => {
    expect(2 + 2).toBe(4);
  });

  it('should handle strings', () => {
    expect('hello').toContain('hello');
  });
});

