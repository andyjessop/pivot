// eslint-disable-next-line
// @ts-nocheck
import { vi } from 'vitest';

import { service } from '.';

describe('service', () => {
  let testService;
  let mockConfig;
  let mockState;
  let getData;
  let setData;

  beforeEach(() => {
    mockConfig = {
      read: {
        query: vi.fn().mockResolvedValue({ data: 'testData' }),
      },
      create: {
        query: vi.fn().mockResolvedValue({ data: 'createdData' }),
        optimistic: vi.fn((_) => (oldData) => ({
          ...oldData,
          created: true,
        })),
      },
      update: {
        query: vi.fn().mockResolvedValue({ data: 'updatedData' }),
        optimistic: vi.fn((_) => (oldData) => ({
          ...oldData,
          updated: true,
        })),
      },
      delete: {
        query: vi.fn().mockResolvedValue({ data: 'deletedData' }),
        optimistic: vi.fn((_) => (oldData) => ({
          ...oldData,
          deleted: true,
        })),
      },
    };

    mockState = {
      data: null,
      error: null,
      loading: false,
      updating: false,
    };

    getData = vi.fn(() => mockState['data']);
    setData = vi.fn((newData) => {
      mockState.data = newData;
    });

    testService = service(mockConfig, { getData, setData });
  });

  it('should read data', async () => {
    await testService.read('param1', 'param2');
    expect(mockConfig.read.query).toHaveBeenCalledWith('param1', 'param2');
    expect(getData()).toEqual({ data: 'testData' });
  });

  it('should update data', async () => {
    await testService.read();
    await testService.update('param1', 'param2');
    expect(setData).toHaveBeenCalledWith({ data: 'testData', updated: true });
    expect(setData).toHaveBeenCalledWith({ data: 'testData' });
  });

  it('should create data', async () => {
    await testService.read();
    await testService.create('param1', 'param2');
    expect(setData).toHaveBeenCalledWith({ data: 'testData', created: true });
    expect(setData).toHaveBeenCalledWith({ data: 'testData' });
  });

  it('should delete data', async () => {
    await testService.read();

    await testService.delete('param1', 'param2');
    expect(setData).toHaveBeenCalledWith({ data: 'testData', deleted: true });
    expect(setData).toHaveBeenCalledWith({ data: 'testData' });
  });

  it('should throw an error if mutate is called before reading', () => {
    expect(testService.create('param1', 'param2')).rejects.toThrow(
      'Cannot mutate before reading',
    );
    expect(testService.update('param1', 'param2')).rejects.toThrow(
      'Cannot mutate before reading',
    );
    expect(testService.delete('param1', 'param2')).rejects.toThrow(
      'Cannot mutate before reading',
    );
  });

  it('should handle query errors', () => {
    mockConfig.read.query.mockRejectedValueOnce(new Error('Read error'));
    expect(testService.read('param1', 'param2')).rejects.toThrow('Read error');

    mockConfig.update.query.mockRejectedValueOnce(new Error('Update error'));
    testService.read();
    expect(testService.update('param1', 'param2')).rejects.toThrow(
      'Update error',
    );

    mockConfig.create.query.mockRejectedValueOnce(new Error('Create error'));
    expect(testService.create('param1', 'param2')).rejects.toThrow(
      'Create error',
    );

    mockConfig.delete.query.mockRejectedValueOnce(new Error('Delete error'));
    expect(testService.delete('param1', 'param2')).rejects.toThrow(
      'Delete error',
    );
  });

  it('should not apply optimistic update if not provided', async () => {
    delete mockConfig.create.optimistic;
    delete mockConfig.update.optimistic;
    delete mockConfig.delete.optimistic;

    await testService.read();
    await testService.create('param1', 'param2');
    expect(getData()).toEqual({ data: 'testData' });

    await testService.update('param1', 'param2');
    expect(getData()).toEqual({ data: 'testData' });

    await testService.delete('param1', 'param2');
    expect(getData()).toEqual({ data: 'testData' });
  });
});
