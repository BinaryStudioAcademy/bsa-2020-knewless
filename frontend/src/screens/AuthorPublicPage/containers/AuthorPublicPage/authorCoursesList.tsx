import React from 'react';
import { connect } from 'react-redux';

import { IAuthorCourse } from '../../models/IAuthorCourse';
import { Card } from 'semantic-ui-react';

import { AiFillStar } from 'react-icons/ai';

import './styles.sass';

export interface IAuthorCoursesList {
  courses: IAuthorCourse[];
}

function secondsToTime(mins: any): string { // have to be fixed with moment.js
  const hours = Math.floor(mins / 60);

  const divisorForMinutes = mins % 60;
  const minutes = Math.floor(divisorForMinutes);

  const result = `${hours}h ${minutes}m`;
  return result;
}

const CoursesList: React.FunctionComponent<IAuthorCoursesList> = ({
  courses
}) => (
  <div className="courseList">
    {courses === undefined ? 'No courses here'
      : courses.map((c, i) => (
        <Card className="infoCourseCard">
          <img
            className="imageCourse"
            src={c.imageSrc}
            alt={`${c.author} ${c.name} prew`}
          />
          <Card.Header className="authorCourseCategory">
            {c.category}
          </Card.Header>
          <Card.Description className="authorCourseDescription">
            {c.name}
          </Card.Description>
          <Card.Meta className="authorCourseDetails">
            <div className="authorCourseDetails-authorName">
              {c.author}
            </div>
            <div className="authorCourseDetails-courseDuration">
              {secondsToTime(c.duration)}
            </div>
            <div className="authorCourseDetails-courseLevel">
              {c.level}
            </div>
            <div className="authorCourseDetails-courseStarsRank">
              <AiFillStar className="activeStar" />
              <AiFillStar className="activeStar" />
              <AiFillStar className="activeStar" />
              <AiFillStar className="inactiveStar" />
              <AiFillStar className="inactiveStar" />
            </div>
          </Card.Meta>
        </Card>
      ))}
  </div>
);

const mapStateToProps = (state: any) => ({
  courses: state.authorPublicData.authorData.courses
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesList);
