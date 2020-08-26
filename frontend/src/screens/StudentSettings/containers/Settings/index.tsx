import React, { useEffect, useState } from 'react';
import { Form } from 'semantic-ui-react';
import GrayOutlineButton from 'components/buttons/GrayOutlineButton';
import GradientButton from 'components/buttons/GradientButton';
import styles from './styles.module.sass';
import {
  directionOptions,
  educationOptions,
  employmentOptions,
  experienceOptions,
  industryOptions,
  levelOptions,
  locationOptions,
  MIN_EXPERIENCE_YEAR,
  MIN_YEAR_OF_BIRTH,
  roleOptions,
  yearOptions
} from './options';
import { history } from '@helpers/history.helper';
import { connect } from 'react-redux';
import { fetchGetStudentSettingsRoutine, fetchSetStudentSettingsRoutine, fetchAllTagsRoutine } from '../../routines';
import { IStudentSettings } from 'screens/StudentSettings/models/IStudentSettings';
import { IBindingAction, IBindingCallback1 } from 'models/Callbacks';
import { resetSettingsModeRoutine, setUserRoleRoutine } from 'containers/AppRouter/routines';
import { RoleTypes } from 'containers/AppRouter/models/IRole';
import AvatarUploader from '@components/avatar/AvatarUploader';
import { isImage } from '@screens/AddCourse/services/helper.service';
import {
  BIOGRAPHY_MESSAGE,
  COMPANY_MESSAGE,
  FIRST_NAME_MESSAGE,
  isValidBiography,
  isValidCompany, isValidJob,
  isValidNameSurname,
  isValidUrl, JOB_MESSAGE,
  LAST_NAME_MESSAGE,
  REQUIRED_FIELD_MESSAGE,
  URL_MESSAGE
} from '@helpers/validation.helper';
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
};

export interface IStudentSettingsProps {
  allTags: ITag[];
  studentSettings: IStudentSettings;
  fetchStudentSettings: IBindingAction;
  fetchSetStudentSettings: IBindingCallback1<IStudentSettings>;
  setUserRole: IBindingCallback1<RoleTypes>;
  resetSettingsMode: IBindingAction;
  fetchAllTags: IBindingAction;
}

function presentStudentTagsAssembler(allTags: ITag[], presentTags: string[]) {
  const resultTags = [];

  if (allTags === undefined || presentTags === undefined) return [];
  if (presentTags[0] === undefined || allTags[0].id === undefined) return [];

  for (let i = 0; i < presentTags.length; i += 1) {
    for (let j = 0; j < allTags.length; j += 1) {
      if (allTags[j].id === presentTags[i]) {
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
    fetchAllTags();
    return () => resetSettingsMode();
  }, []);
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
    setFirstName(settings.firstName || '');
    setLastName(settings.lastName || '');
    setLocation(settings.location || '');
    setCompany(settings.company || '');
    setJob(settings.job || '');
    setWebsite(settings.website || '');
    setBiography(settings.biography || '');
    setDirection(settings.direction || directionOptions[0].value);
    setExperience(settings.experience || MIN_EXPERIENCE_YEAR);
    setLevel(settings.level || '');
    setIndustry(settings.industry || '');
    setRole(settings.role || '');
    setEmployment(settings.employment || employmentOptions[0].value);
    setEducation(settings.education || '');
    setYear(settings.year || MIN_YEAR_OF_BIRTH);
  }, [settings]);

  useEffect(() => {
    setStoredTags(allTags);
    setSelectedTags(presentStudentTagsAssembler(allTags, settings.tags));
  }, [allTags]);

  const handleUploadFile = file => {
    const thisFile: File = file;
    if (thisFile && isImage(thisFile.name)) {
      setUploadImage(thisFile);
      setAvatar(URL.createObjectURL(thisFile));
    }
  };

  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [isLastNameValid, setIsLastNameValid] = useState(true);
  const [isYearsOfExperienceValid, setIsYearsOfExperienceValid] = useState(true);
  const [isEducationLvlValid, setIsEducationLvlValid] = useState(true);
  const [isLvlWithinValid, setIsLvlWithinValid] = useState(true);
  const [isLocationValid, setIsLocationValid] = useState(true);
  const [isIndustryValid, setIsIndustryValid] = useState(true);
  const [isRoleValid, setIsRoleValid] = useState(true);
  const isRequiredFieldsValid = (): boolean => !!firstName && !!lastName && !!education && !!level && !!location
    && !!industry && !!role && isFirstNameValid && isLastNameValid && isYearsOfExperienceValid && isEducationLvlValid
    && isLvlWithinValid && isLocationValid && isIndustryValid && isRoleValid;

  const [isBiographyValid, setIsBiographyValid] = useState(true);
  const [isJobValid, setIsJobValid] = useState(true);
  const [isCompanyValid, setIsCompanyValid] = useState(true);
  const [isWebsiteValid, setIsWebsiteValid] = useState(true);
  const isNonRequiredFieldsValid = (): boolean => isBiographyValid && isJobValid && isCompanyValid && isWebsiteValid;

  const handleSubmit = e => {
    e.preventDefault();
    if (isRequiredFieldsValid() && isNonRequiredFieldsValid()) {
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
      setSettings(updatedSettings);
      history.push('/');
    }
  };
  const handleCancel = () => {
    history.push('/');
  };

  const validateFirstName = (newName?: string) => {
    const lastChangeValue = typeof newName === 'string' ? newName : firstName;
    setIsFirstNameValid(!!lastChangeValue && isValidNameSurname(lastChangeValue));
  };
  const validateLastName = (newName?: string) => {
    const lastChangeValue = typeof newName === 'string' ? newName : lastName;
    setIsLastNameValid(!!lastChangeValue && isValidNameSurname(lastChangeValue));
  };
  const validateBiography = (newName?: string) => {
    setIsBiographyValid(isValidBiography(typeof newName === 'string' ? newName : biography));
  };
  const validateJob = (newName?: string) => {
    setIsJobValid(isValidJob(typeof newName === 'string' ? newName : job));
  };
  const validateCompany = (newName?: string) => {
    setIsCompanyValid(isValidCompany(typeof newName === 'string' ? newName : company));
  };
  const validateWebsite = (newName?: string) => {
    setIsWebsiteValid(isValidUrl(typeof newName === 'string' ? newName : website));
  };
  const validateLocation = (newName?: string) => {
    const lastChangeValue = typeof newName === 'string' ? newName : location;
    setIsLocationValid(locationOptions.map(l => l.value).includes(lastChangeValue));
  };

  function onTagAddition(tag) {
    setSelectedTags(prev => [...prev, tag]);
    setStoredTags(prev => prev.filter(t => t.id !== tag.id));
  }

  function onTagDeletion(i) {
    const deletedTag = selectedTags[i];
    if (deletedTag !== undefined) {
      setSelectedTags(prev => prev.filter((_, index) => index !== i));
      setStoredTags(prev => [...prev, deletedTag]);
    }
  }

  return (
    <div className={styles.settings}>
      <div className={styles.wrapperTitle}>
        <div id={styles.settingsTitle}>Account Settings</div>
      </div>
      <div className={styles.wrapperAvatar}>
        <div className={styles.avatar}>
          <AvatarUploader
            className={styles.uploader}
            handleFileUpload={e => handleUploadFile(e.target.files[0])}
            imageSrc={avatar}
          />
        </div>
      </div>
      <Form className={styles.formSettings} onKeyPress={e => { if (e.key === 'Enter') e.preventDefault(); }}>
        <div id={styles.personalTitle} className={styles.title}>Personal info</div>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            className={`${styles.formField} ${!isFirstNameValid && styles.roundedBottomField}`}
            label="First Name"
            placeholder="First Name"
            value={firstName}
            onChange={e => { setFirstName(e.target.value); validateFirstName(e.target.value); }}
            required
            error={isFirstNameValid ? false : FIRST_NAME_MESSAGE}
            onBlur={() => validateFirstName()}
          />
          <Form.Input
            fluid
            className={`${styles.formField} ${!isLastNameValid && styles.roundedBottomField}`}
            label="Last Name"
            placeholder="Last Name"
            value={lastName}
            onChange={e => { setLastName(e.target.value); validateLastName(e.target.value); }}
            required
            error={isLastNameValid ? false : LAST_NAME_MESSAGE}
            onBlur={() => validateLastName()}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Select
            fluid
            className={`${styles.formField} ${!year && styles.roundedBottomField}`}
            label="Year of Birth"
            placeholder="Select"
            options={yearOptions}
            value={year}
            onChange={(e, data) => setYear(data.value as number)}
            error={year ? false : REQUIRED_FIELD_MESSAGE}
            required
          />
          <Form.Select
            fluid
            className={`${styles.formField} ${!isYearsOfExperienceValid && styles.roundedBottomField}`}
            label="Years of Experience"
            placeholder="0"
            options={experienceOptions}
            value={experience}
            onChange={(e, data) => {
              const value = data.value as number;
              setExperience(value);
              setIsYearsOfExperienceValid(value >= MIN_EXPERIENCE_YEAR);
            }}
            error={isYearsOfExperienceValid ? false : REQUIRED_FIELD_MESSAGE}
            required
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Select
            fluid
            className={`${styles.formField} ${!isEducationLvlValid && styles.roundedBottomField}`}
            label="Education Level"
            placeholder="Select"
            options={educationOptions}
            value={education}
            onChange={(e, data) => {
              const value = data.value as string;
              setEducation(value);
              setIsEducationLvlValid(!!value);
            }}
            error={isEducationLvlValid ? false : REQUIRED_FIELD_MESSAGE}
            required
          />
          <Form.Select
            fluid
            className={`${styles.formField} ${!isLvlWithinValid && styles.roundedBottomField}`}
            label="Level within"
            placeholder="Select"
            options={levelOptions}
            value={level}
            onChange={(e, data) => {
              const value = data.value as string;
              setLevel(value);
              setIsLvlWithinValid(!!value);
            }}
            error={isLvlWithinValid ? false : REQUIRED_FIELD_MESSAGE}
            required
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.TextArea
            label="Biography"
            className={`${styles.formField} ${!isBiographyValid && styles.roundedBottomField}`}
            value={biography}
            id={styles.textBio}
            onChange={(e, data) => {
              const value = data.value as string;
              setBiography(value);
              validateBiography(value);
            }}
            placeholder="Tell about yourself"
            error={isBiographyValid ? false : BIOGRAPHY_MESSAGE}
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
            placeholderText="Add new"
          />
        </div>
        <div id={styles.demographicTitle} className={styles.title}> Demographic Info</div>
        <Form.Group width="4">
          {directionOptions.map(dir => (
            <Form.Radio
              className={styles.formCheckBox}
              label={dir.text}
              value={dir.value}
              checked={direction === dir.value}
              onChange={() => setDirection(dir.value)}
            />
          ))}
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Dropdown
            fluid
            className={`${styles.formField} ${!isLocationValid && styles.roundedBottomField}`}
            label="Location"
            placeholder="Select"
            options={locationOptions}
            value={location}
            onChange={(e, data) => {
              const value = data.value as string;
              setLocation(value);
              validateLocation(value);
            }}
            onBlur={() => validateLocation()}
            clearable
            search
            selection
            required
            error={isLocationValid ? false : REQUIRED_FIELD_MESSAGE}
          />
          <Form.Select
            fluid
            className={styles.formField}
            label="Employment Status"
            placeholder="Select"
            options={employmentOptions}
            value={employment}
            onChange={(e, data) => setEmployment(data.value as string)}
          />
        </Form.Group>
        <Form.Group widths="2">
          <Form.Select
            fluid
            className={`${styles.formField} ${!isIndustryValid && styles.roundedBottomField}`}
            label="Industry"
            placeholder="Select"
            options={industryOptions}
            value={industry}
            onChange={(e, data) => {
              const value = data.value as string;
              setIndustry(value);
              setIsIndustryValid(!!value);
            }}
            error={isIndustryValid ? false : REQUIRED_FIELD_MESSAGE}
            required
          />
          <Form.Select
            fluid
            className={`${styles.formField} ${!isRoleValid && styles.roundedBottomField}`}
            label="Role"
            placeholder="Select"
            options={roleOptions}
            value={role}
            onChange={(e, data) => {
              const value = data.value as string;
              setRole(value);
              setIsRoleValid(!!value);
            }}
            error={isRoleValid ? false : REQUIRED_FIELD_MESSAGE}
            required
          />
        </Form.Group>
        <Form.Group widths="2">
          <Form.Input
            fluid
            className={`${styles.formField} ${!isJobValid && styles.roundedBottomField}`}
            label="Job title"
            placeholder="Job title"
            value={job}
            onChange={e => { setJob(e.target.value); validateJob(e.target.value); }}
            error={isJobValid ? false : JOB_MESSAGE}
          />
          <Form.Input
            fluid
            className={`${styles.formField} ${!isCompanyValid && styles.roundedBottomField}`}
            label="Company name"
            value={company}
            onChange={e => { setCompany(e.target.value); validateCompany(e.target.value); }}
            placeholder="Company name"
            error={isCompanyValid ? false : COMPANY_MESSAGE}
          />
        </Form.Group>
        <Form.Group widths="2">
          <Form.Input
            fluid
            className={`${styles.formField} ${!isWebsiteValid && styles.roundedBottomField}`}
            label="Personal website"
            placeholder="Personal website"
            value={website}
            onChange={e => { setWebsite(e.target.value); validateWebsite(e.target.value); }}
            error={isWebsiteValid ? false : URL_MESSAGE}
            onBlur={() => validateWebsite()}
          />
        </Form.Group>
        <Form.Group className={`${styles.formField} ${styles.formButtons}`}>
          <GrayOutlineButton
            className={styles.Btn}
            onClick={() => handleCancel()}
            content="Cancel"
          />
          <GradientButton
            className={styles.Btn}
            onClick={e => handleSubmit(e)}
            disabled={!isRequiredFieldsValid() || !isNonRequiredFieldsValid()}
            content="Save"
          />
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
