import { author, courses, paths } from './author.page.mock';

async function mockRequest() {
  return new Promise(resolve => {
    setTimeout(() => resolve({
      author,
      courses,
      paths
    }), 500);
  });
}

export const getData = async () => mockRequest();
