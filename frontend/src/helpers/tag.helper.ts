export const getTagsNameWithCountFromCourses = courses => {
  const coursesTags = [];
  courses.forEach(course => {
    course.tags.forEach(tag => {
      const tagIndex = coursesTags.findIndex(t => t.name === tag.name);
      if (tagIndex === -1) {
        coursesTags.push({ name: tag.name, value: 1 });
      } else {
        coursesTags[tagIndex].value += 1;
      }
    });
  });
  return coursesTags;
};
