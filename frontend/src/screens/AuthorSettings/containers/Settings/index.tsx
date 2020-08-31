import React, { useEffect, useState } from 'react';
import { Form } from 'semantic-ui-react';
import styles from './styles.module.sass';
import { locationOptions } from './options';
import { history } from '@helpers/history.helper';
import { connect } from 'react-redux';
import { fetchGetAuthorSettingsRoutine, fetchSetAuthorSettingsRoutine } from '@screens/AuthorSettings/routines';
import { IAuthorSettings } from 'screens/AuthorSettings/models/IAuthorSettings';
import { IBindingAction, IBindingCallback1 } from 'models/Callbacks';
import GrayOutlineButton from '@components/buttons/GrayOutlineButton';
import GradientButton from '@components/buttons/GradientButton';
import { resetSettingsModeRoutine, setUserRoleRoutine } from 'containers/AppRouter/routines';
import { RoleTypes } from 'containers/AppRouter/models/IRole';
import { isImage } from '@screens/AddCourse/services/helper.service';
import {
  BIOGRAPHY_MESSAGE,
  COMPANY_MESSAGE,
  FIRST_NAME_MESSAGE,
  isValidBiography,
  isValidCompany,
  isValidJob,
  isValidNameSurname,
  isValidTwitterUser,
  isValidUrl,
  JOB_MESSAGE,
  LAST_NAME_MESSAGE,
  REQUIRED_FIELD_MESSAGE,
  TWITTER_MESSAGE,
  TWITTER_URL_PREFIX,
  URL_MESSAGE
} from '@helpers/validation.helper';
import AvatarUploader from '@components/avatar/AvatarUploader';

export interface IAuthorSettingsProps {
  authorSettings: IAuthorSettings;
  fetchAuthorSettings: IBindingAction;
  fetchSetAuthorSettings: IBindingCallback1<IAuthorSettings>;
  setUserRole: IBindingCallback1<RoleTypes>;
  resetSettingsMode: IBindingAction;
}

const AuthorSettings: React.FunctionComponent<IAuthorSettingsProps> = ({
  authorSettings: settings,
  fetchAuthorSettings: getSettings,
  fetchSetAuthorSettings: setSettings,
  resetSettingsMode,
  setUserRole
}) => {
  useEffect(() => {
    getSettings();
    return () => resetSettingsMode();
  }, []);
  const getTwitterUserFromUrl = (url: string): string => url.substring(TWITTER_URL_PREFIX.length);
  const [firstName, setFirstName] = useState(settings.firstName || '');
  const [lastName, setLastName] = useState(settings.lastName || '');
  const [avatar, setAvatar] = useState(settings.avatar);
  const [uploadImage, setUploadImage] = useState(null);
  const [location, setLocation] = useState(settings.location || '');
  const [company, setCompany] = useState(settings.company || '');
  const [job, setJob] = useState(settings.job || '');
  const [website, setWebsite] = useState(settings.website || '');
  const [twitterUser, setTwitterUser] = useState(getTwitterUserFromUrl(settings?.twitter || ''));
  const [biography, setBiography] = useState(settings.biography || '');
  useEffect(() => {
    setAvatar(settings.avatar);
    setFirstName(settings.firstName);
    setLastName(settings.lastName);
    setLocation(settings.location);
    setCompany(settings.company);
    setJob(settings.job);
    setWebsite(settings.website);
    setTwitterUser(getTwitterUserFromUrl(settings?.twitter || ''));
    setBiography(settings.biography || '');
  }, [settings]);

  const handleUploadFile = file => {
    const thisFile: File = file;
    if (thisFile && isImage(thisFile.name)) {
      setUploadImage(thisFile);
      setAvatar(URL.createObjectURL(thisFile));
    }
  };

  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [isLastNameValid, setIsLastNameValid] = useState(true);
  const [isLocationValid, setIsLocationValid] = useState(true);
  const isRequiredFieldsValid = (): boolean => !!firstName && !!lastName && !!location
    && isFirstNameValid && isLastNameValid && isLocationValid;

  const [isCompanyValid, setIsCompanyValid] = useState(true);
  const [isJobValid, setIsJobValid] = useState(true);
  const [isWebsiteValid, setIsWebsiteValid] = useState(true);
  const [isTwitterUserValid, setIsTwitterUserValid] = useState(true);
  const [isBiographyValid, setIsBiographyValid] = useState(true);
  const isNonRequiredFieldsValid = (): boolean => isCompanyValid && isJobValid && isWebsiteValid && isTwitterUserValid
    && isBiographyValid;

  const isLastSettingsChanged = settings.avatar !== avatar
    || settings.firstName !== firstName
    || settings.lastName !== lastName
    || settings.location !== location
    || settings.company !== company
    || settings.job !== job
    || settings.website !== website
    || settings.twitter !== (TWITTER_URL_PREFIX + twitterUser)
    || settings.biography !== biography;

  const handleSubmit = e => {
    e.preventDefault();
    if (isRequiredFieldsValid() && isNonRequiredFieldsValid()) {
      setUserRole(RoleTypes.AUTHOR);
      const updatedSettings = {
        id: settings.id,
        firstName,
        lastName,
        avatar,
        location,
        company,
        job,
        website,
        twitter: (TWITTER_URL_PREFIX + twitterUser),
        biography,
        uploadImage
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
  const validateCompany = (newName?: string) => {
    setIsCompanyValid(isValidCompany(typeof newName === 'string' ? newName : company));
  };
  const validateJob = (newName?: string) => {
    setIsJobValid(isValidJob(typeof newName === 'string' ? newName : job));
  };
  const validateWebsite = (newName?: string) => {
    setIsWebsiteValid(isValidUrl(typeof newName === 'string' ? newName : website));
  };
  const validateTwitterUser = (newName?: string) => {
    setIsTwitterUserValid(isValidTwitterUser(typeof newName === 'string' ? newName : twitterUser));
  };
  const validateBiography = (newName?: string) => {
    setIsBiographyValid(isValidBiography(typeof newName === 'string' ? newName : biography));
  };
  const validateLocation = (newName?: string) => {
    const lastChangeValue = typeof newName === 'string' ? newName : location;
    setIsLocationValid(locationOptions.map(l => l.value).includes(lastChangeValue));
  };
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
      <Form
        className={styles.formSettings}
        onKeyPress={e => {
          if (e.key === 'Enter') e.preventDefault();
        }}
      >
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
          <Form.Input
            fluid
            className={`${styles.formField} ${!isCompanyValid && styles.roundedBottomField}`}
            label="Company name"
            value={company}
            onChange={e => { setCompany(e.target.value); validateCompany(e.target.value); }}
            placeholder="Company name"
            error={isCompanyValid ? false : COMPANY_MESSAGE}
          />
          <Form.Input
            fluid
            className={`${styles.formField} ${!isJobValid && styles.roundedBottomField}`}
            label="Job title"
            placeholder="Job title"
            value={job}
            onChange={e => {
              const { value } = e.target;
              setJob(value);
              validateJob(value);
            }}
            error={isJobValid ? false : JOB_MESSAGE}
            onBlur={() => validateJob()}
          />
        </Form.Group>
        <Form.Group widths="2">
          <Form.Input
            fluid
            className={`${styles.formField} ${!isWebsiteValid && styles.roundedBottomField}`}
            label="Personal website"
            placeholder="Personal website"
            value={website}
            onChange={e => {
              const { value } = e.target;
              setWebsite(value);
              validateWebsite(value);
            }}
            error={isWebsiteValid ? false : URL_MESSAGE}
            onBlur={() => validateWebsite()}
          />
          <Form.Input
            fluid
            className={`${styles.formField} ${!isTwitterUserValid && styles.roundedBottomField}`}
            label="Twitter"
            placeholder="@nickname"
            value={twitterUser}
            error={isTwitterUserValid ? false : TWITTER_MESSAGE}
            onChange={e => {
              const { value } = e.target;
              setTwitterUser(value);
              validateTwitterUser(value);
            }}
            onBlur={() => validateTwitterUser()}
          >
            <div className={`ui label ${styles.inputInlineLabel}`}>{TWITTER_URL_PREFIX}</div>
            <input
              className={`ui input ${styles.inputWithInlineLabel} ${!isTwitterUserValid && styles.roundedBottomField}`}
            />
          </Form.Input>
        </Form.Group>
        <Form.Group widths="2">
          <Form.Dropdown
            fluid
            className={`${styles.formField} ${!isLocationValid && styles.roundedBottomField}`}
            label="Location"
            placeholder="Select"
            value={location}
            onChange={(e, data) => {
              const value = data.value as string;
              setLocation(value);
              validateLocation(value);
            }}
            required
            error={isLocationValid ? false : REQUIRED_FIELD_MESSAGE}
            onBlur={() => validateLocation()}
            clearable
            search
            selection
            options={locationOptions}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.TextArea
            className={`${styles.formField} ${!isBiographyValid && styles.roundedBottomField}`}
            label="Biography"
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
        <Form.Group className={`${styles.formField} ${styles.formButtons}`}>
          <GrayOutlineButton
            className={styles.Btn}
            onClick={() => handleCancel()}
            content="Cancel"
          />
          <GradientButton
            className={styles.Btn}
            onClick={e => handleSubmit(e)}
            disabled={!isLastSettingsChanged || !isRequiredFieldsValid() || !isNonRequiredFieldsValid()}
            content="Save"
          />
        </Form.Group>
      </Form>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { authorSettings: { authorSettings } } = state;
  return {
    authorSettings
  };
};

const mapDispatchToProps = {
  fetchAuthorSettings: fetchGetAuthorSettingsRoutine,
  fetchSetAuthorSettings: fetchSetAuthorSettingsRoutine,
  setUserRole: setUserRoleRoutine,
  resetSettingsMode: resetSettingsModeRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorSettings);
