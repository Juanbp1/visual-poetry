import { v4 } from 'uuid';

jest.mock('uuid', () => {
  return {
    v4: jest.fn(() => '12345678-1234-1234-1234-123456789012'),
  };
});
