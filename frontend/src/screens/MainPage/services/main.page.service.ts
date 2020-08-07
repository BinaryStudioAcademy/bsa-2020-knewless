import { courses, student, paths } from './mock';

async function mockRequest() {
  return new Promise(resolve => {
    setTimeout(() => resolve({
      student,
      continueCourses: courses,
      recommendedCourses: courses,
      paths
    }), 500);
  });
}

export const getData = async () => mockRequest();
