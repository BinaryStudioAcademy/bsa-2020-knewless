import React, { useState } from 'react';
import { connect } from 'react-redux';
import { fetchLecturesRoutine, saveCourseRoutine } from 'screens/AddCourse/routines';
import { IBindingCallback1 } from 'models/Callbacks';
import { ICourse } from '../../models/ICourse';
import { ILecture } from '../../models/ILecture';
import { ComplexityLevel } from '../../models/helper';

interface IaddCourseProps {
  teacherId: string;
  fetchLectures: IBindingCallback1<string>;
  saveCourse: IBindingCallback1<ICourse>;
}

const AddCourse: React.FunctionComponent<IaddCourseProps> = ({
  teacherId,
  fetchLectures: getLectures,
  saveCourse: save
}) => {
  const [description, setDescription] = useState("");
  const [courseName, setCourseName] = useState("");
  const [selectedLectures, setSelectedLectures] = useState([]);
  const [level, setLevel] = useState("");


  return (
    <div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { lectures: { lectures } } = state;
  return {
    lectures
  };
};

const mapDispatchToProps = {
  fetchLectures: fetchLecturesRoutine,
  saveCourse: saveCourseRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCourse);
