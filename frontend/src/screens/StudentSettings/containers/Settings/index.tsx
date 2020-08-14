import React, { useEffect, useState } from 'react';
import { Form } from 'semantic-ui-react';
import GrayOutlineButton from 'components/buttons/GrayOutlineButton';
import GradientButton from 'components/buttons/GradientButton';
import styles from './styles.module.sass';
import {
  educationOptions,
  employmentOptions,
  experienceOptions,
  industryOptions,
  levelOptions,
  locationOptions,
  roleOptions,
  yearOptions
} from './options';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchGetStudentSettingsRoutine, fetchSetStudentSettingsRoutine } from '../../routines';
import { IStudentSettings } from 'screens/StudentSettings/models/IStudentSettings';
import { IBindingAction, IBindingCallback1 } from 'models/Callbacks';
import { resetSettingsModeRoutine, setUserRoleRoutine } from 'containers/AppRouter/routines';
import { RoleTypes } from 'containers/AppRouter/models/IRole';
import AvatarUploader from '../../../../components/avatar/AvatarUploader';

export interface IStudentSettingsProps {
  studentSettings: IStudentSettings;
  fetchStudentSettings: IBindingAction;
  fetchSetStudentSettings: IBindingCallback1<IStudentSettings>;
  setUserRole: IBindingCallback1<RoleTypes>;
  resetSettingsMode: IBindingAction;
}

const StudentSettings: React.FunctionComponent<IStudentSettingsProps> = ({
  studentSettings: settings,
  fetchStudentSettings: getSettings,
  fetchSetStudentSettings: setSettings,
  setUserRole,
  resetSettingsMode
}) => {
  useEffect(() => {
    getSettings();
    return () => resetSettingsMode();
  }, []);
  const history = useHistory();
  const [firstName, setFirstName] = useState(settings.firstName);
  const [lastName, setLastName] = useState(settings.lastName);
  const [avatar, setAvatar] = useState(settings.avatar);
  const [uploadImage, setUploadImage] = useState(null);
  const [location, setLocation] = useState(settings.location);
  const [company, setCompany] = useState(settings.company);
  const [job, setJob] = useState(settings.job);
  const [website, setWebsite] = useState(settings.website);
  const [biography, setBiography] = useState(settings.biography);
  const [direction, setDirection] = useState(settings.direction);
  const [experience, setExperience] = useState(settings.experience);
  const [level, setLevel] = useState(settings.level);
  const [industry, setIndustry] = useState(settings.industry);
  const [role, setRole] = useState(settings.role);
  const [employment, setEmployment] = useState(settings.employment);
  const [education, setEducation] = useState(settings.education);
  const [year, setYear] = useState(settings.year);

  useEffect(() => {
    setAvatar(settings.avatar);
    setFirstName(settings.firstName);
    setLastName(settings.lastName);
    setLocation(settings.location);
    setCompany(settings.company);
    setJob(settings.job);
    setWebsite(settings.website);
    setBiography(settings.biography);
    setDirection(settings.direction);
    setExperience(settings.experience);
    setLevel(settings.level);
    setIndustry(settings.industry);
    setRole(settings.role);
    setEmployment(settings.employment);
    setEducation(settings.education);
    setYear(settings.year);
  }, [settings]);
  const handleUploadFile = async file => {
    setUploadImage(file);
    setAvatar(URL.createObjectURL(file));
  };
  const handleSubmit = () => {
    setUserRole(RoleTypes.USER);
    const updatedSettings = {
      id: settings.id,
      firstName,
      lastName,
      avatar,
      location,
      company,
      job,
      website,
      biography,
      direction,
      experience,
      level,
      industry,
      role,
      employment,
      education,
      year,
      uploadImage
    };
    setSettings(updatedSettings);
    history.push('/');
  };
  const handleCancel = () => {
    history.push('/');
  };
  return (
    <div className={styles.settings}>
      <div id={styles.settingsTitle}>Account Settings</div>
      <div className={styles.wrapperAvatar}>
        <div className={styles.avatar}>
          <AvatarUploader handleFileUpload={e => handleUploadFile(e.target.files[0])} imageSrc={avatar} />
        </div>
      </div>
      <Form className={styles.formSettings}>
        <div id={styles.personalTitle} className={styles.title}>Personal info</div>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            className={styles.formField}
            label="First Name"
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <Form.Input
            fluid
            className={styles.formField}
            label="Last Name"
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            className={styles.formField}
            label="Job title"
            placeholder="Job title"
            value={job}
            onChange={e => setJob(e.target.value)}
          />
          <Form.Select
            fluid
            className={styles.formField}
            label="Location"
            placeholder="Select"
            options={locationOptions}
            value={location}
            onChange={(e, data) => setLocation(data.value as string)}
          />
        </Form.Group>
        <Form.Group widths="2">
          <Form.Input
            fluid
            className={styles.formField}
            label="Company name"
            value={company}
            onChange={e => setCompany(e.target.value)}
            placeholder="Company name"
          />
          <Form.Input
            fluid
            className={styles.formField}
            label="Personal website"
            placeholder="Personal website"
            value={website}
            onChange={e => setWebsite(e.target.value)}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.TextArea
            label="Biography"
            className={styles.formField}
            value={biography}
            id={styles.textBio}
            onChange={(e, data) => setBiography(data.value as string)}
            placeholder="Tell about yourself"
          />
        </Form.Group>
        <div id={styles.demographicTitle} className={styles.title}> Demographic Info</div>
        <Form.Group width="4">
          <Form.Checkbox
            className={styles.formCheckBox}
            label="Developer"
            value="Developer"
            checked={direction === 'Developer'}
            onChange={() => setDirection('Developer')}
          />
          <Form.Checkbox
            className={styles.formCheckBox}
            label="IT Professional"
            value="IT Professional"
            checked={direction === 'IT Professional'}
            onChange={() => setDirection('IT Professional')}
          />
          <Form.Checkbox
            className={styles.formCheckBox}
            label="Creative"
            value="Creative"
            checked={direction === 'Creative'}
            onChange={() => setDirection('Creative')}
          />
          <Form.Checkbox
            className={styles.formCheckBox}
            label="Other"
            value="Other"
            checked={direction === 'Other'}
            onChange={() => setDirection('Other')}
          />
        </Form.Group>
        <Form.Group widths="2">
          <Form.Select
            fluid
            className={styles.formField}
            label="Years of Experience"
            placeholder="0"
            options={experienceOptions}
            value={experience}
            onChange={(e, data) => setExperience(data.value as number)}
          />
          <Form.Select
            fluid
            className={styles.formField}
            label="Level within"
            placeholder="Select"
            options={levelOptions}
            value={level}
            onChange={(e, data) => setLevel(data.value as string)}
          />
        </Form.Group>
        <Form.Group widths="2">
          <Form.Select
            fluid
            className={styles.formField}
            label="Industry"
            placeholder="Select"
            options={industryOptions}
            value={industry}
            onChange={(e, data) => setIndustry(data.value as string)}
          />
          <Form.Select
            fluid
            className={styles.formField}
            label="Role"
            placeholder="Select"
            options={roleOptions}
            value={role}
            onChange={(e, data) => setRole(data.value as string)}
          />
        </Form.Group>
        <Form.Group widths="2">
          <Form.Select
            fluid
            className={styles.formField}
            label="Employment Status"
            placeholder="Select"
            options={employmentOptions}
            value={employment}
            onChange={(e, data) => setEmployment(data.value as string)}
          />
          <Form.Select
            fluid
            className={styles.formField}
            label="Education Level"
            placeholder="Select"
            options={educationOptions}
            value={education}
            onChange={(e, data) => setEducation(data.value as string)}
          />
        </Form.Group>
        <Form.Group widths="2">
          <Form.Select
            fluid
            className={styles.formField}
            label="Year of Birth"
            placeholder="Select"
            options={yearOptions}
            value={year}
            onChange={(e, data) => setYear(data.value as number)}
          />
        </Form.Group>
        <Form.Group className={styles.formField}>
          <GrayOutlineButton className={styles.Btn} onClick={() => handleCancel()}>Cancel </GrayOutlineButton>
          <GradientButton className={styles.Btn} onClick={() => handleSubmit()}>Save</GradientButton>
        </Form.Group>
      </Form>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { studentSettings: { studentSettings } } = state;
  return {
    studentSettings
  };
};

const mapDispatchToProps = {
  fetchStudentSettings: fetchGetStudentSettingsRoutine,
  fetchSetStudentSettings: fetchSetStudentSettingsRoutine,
  setUserRole: setUserRoleRoutine,
  resetSettingsMode: resetSettingsModeRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentSettings);
