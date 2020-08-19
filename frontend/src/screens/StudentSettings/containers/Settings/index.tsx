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
import { fetchGetStudentSettingsRoutine, fetchSetStudentSettingsRoutine, fetchAllTagsRoutine } from '../../routines';
import { IStudentSettings } from 'screens/StudentSettings/models/IStudentSettings';
import { IBindingAction, IBindingCallback1 } from 'models/Callbacks';
import { resetSettingsModeRoutine, setUserRoleRoutine } from 'containers/AppRouter/routines';
import { RoleTypes } from 'containers/AppRouter/models/IRole';
import AvatarUploader from '@components/avatar/AvatarUploader';
import { ITag } from '../../models/ITag';
import { TagSelector } from '@components/TagSelector';

const tagSelectorStyles = {
  maxWidth: '100%',
  margin: '0',
  padding: '0',
  border: '0',
  outline: 'none',
  fontSize: '1.1em',
  lineHeight: 'inherit',
  background: 'none',
  color: '#fff'
}

export interface IStudentSettingsProps {
  allTags: ITag[],
  studentSettings: IStudentSettings;
  fetchStudentSettings: IBindingAction;
  fetchSetStudentSettings: IBindingCallback1<IStudentSettings>;
  setUserRole: IBindingCallback1<RoleTypes>;
  resetSettingsMode: IBindingAction;
  fetchAllTags: IBindingAction;
}

function presentStudentTagsAssembler (allTags: ITag[], presentTags: string[]) {
  var resultTags = [];

  if(allTags == undefined || presentTags == undefined) return [];
  if(presentTags[0] === undefined || allTags[0].id === undefined) return [];

  for(let i = 0; i < presentTags.length; i++) {
    for(let j = 0; j < allTags.length; j++) {
      if(allTags[j].id === presentTags[i]) {
        resultTags.push(allTags[j]);
      }
    }
  }
  return resultTags;
}

const StudentSettings: React.FunctionComponent<IStudentSettingsProps> = ({
  studentSettings: settings,
  fetchStudentSettings: getSettings,
  fetchSetStudentSettings: setSettings,
  setUserRole,
  resetSettingsMode,
  fetchAllTags,
  allTags
}) => {
  useEffect(() => {
    getSettings();
    console.log(settings); // you have to delete this
    fetchAllTags();
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

  const [storedTags, setStoredTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

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

  useEffect(() => {
    setStoredTags(allTags);
    setSelectedTags(presentStudentTagsAssembler(allTags, settings.tags));

  }, [allTags]);

  const handleUploadFile = file => {
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
      uploadImage,
      tags: selectedTags.map(t => t.id)
    };
    console.log('Settings: ', updatedSettings);
    setSettings(updatedSettings);
    history.push('/');
  };
  const handleCancel = () => {
    history.push('/');
  };

  function onTagAddition (tag) {
    setSelectedTags(prev => [...prev, tag]);
    setStoredTags(prev => prev.filter(t => t.id !== tag.id));
  }

  function onTagDeletion (i) {
    console.log('index in selected Tags: ', i)
    const deletedTag = selectedTags[i];
    console.log('seletedTags[i] : ', selectedTags[i]);
    if (deletedTag !== undefined) {
      setSelectedTags(prev => prev.filter((_, index) => index !== i));
      setStoredTags(prev => [...prev, deletedTag]);
    }
    console.log('selected tags after deletion: ', selectedTags);
  }

  return (
    <div className={styles.settings}>
      <div id={styles.settingsTitle}>Account Settings</div>
      <div className={styles.wrapperAvatar}>
        <div className={styles.avatar}>
          <AvatarUploader
            className={styles.uploader}
            handleFileUpload={e => handleUploadFile(e.target.files[0])}
            imageSrc={avatar}
          />
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
        <div className={styles.tagSelector}>
          <div className={styles.interests}>Interests:</div>
          <TagSelector
            id={styles.selectorId}
            onDelete={onTagDeletion}
            onAddition={onTagAddition}
            suggestions={storedTags}
            tags={selectedTags}
            placeholderText={'Add new'}
          />
        </div>
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

const mapStateToProps = (state: any) => ({
  studentSettings: state.studentSettings.studentSettings,
  allTags: state.studentSettings.getAllTags
});

const mapDispatchToProps = {
  fetchStudentSettings: fetchGetStudentSettingsRoutine,
  fetchSetStudentSettings: fetchSetStudentSettingsRoutine,
  setUserRole: setUserRoleRoutine,
  resetSettingsMode: resetSettingsModeRoutine,
  fetchAllTags: fetchAllTagsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentSettings);
