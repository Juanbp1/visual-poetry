import { useMediaQuery } from 'react-responsive';

jest.mock('react-responsive', () => ({
  useMediaQuery: jest.fn(),
}));

export const mockUseMediaQuery = (queryResult) => {
  const { isMobile, isTablet, isLaptop } = queryResult;
  useMediaQuery.mockImplementation((queries) => {
    if (queries.query === '(max-width: 430px)') {
      return isMobile;
    }
    if (queries.query === '(min-width: 430px) and (max-width: 1024px)') {
      return isTablet;
    }
    if (queries.query === '(min-width: 1024px)') {
      return isLaptop;
    }
    return false;
  });
};
