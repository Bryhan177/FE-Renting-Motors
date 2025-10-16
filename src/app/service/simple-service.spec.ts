// Simple service test
describe('Simple Service Test', () => {
  it('should create a mock service', () => {
    const mockService = {
      getData: jest.fn().mockReturnValue('test data'),
      saveData: jest.fn()
    };

    expect(mockService.getData()).toBe('test data');
    expect(mockService.getData).toHaveBeenCalledTimes(1);
  });

  it('should handle async operations', async () => {
    const mockAsyncService = {
      fetchData: jest.fn().mockResolvedValue({ id: 1, name: 'test' })
    };

    const result = await mockAsyncService.fetchData();
    expect(result).toEqual({ id: 1, name: 'test' });
    expect(mockAsyncService.fetchData).toHaveBeenCalledTimes(1);
  });
});

