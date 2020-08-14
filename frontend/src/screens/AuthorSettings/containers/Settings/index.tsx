import React, { useEffect, useState } from 'react';
import { Form } from 'semantic-ui-react';

import styles from './styles.module.sass';
import { locationOptions } from './options';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchGetAuthorSettingsRoutine, fetchSetAuthorSettingsRoutine } from '../../routines';
import { IAuthorSettings } from 'screens/AuthorSettings/models/IAuthorSettings';
import { IBindingAction, IBindingCallback1 } from 'models/Callbacks';
import GrayOutlineButton from 'components/buttons/GrayOutlineButton';
import GradientButton from 'components/buttons/GradientButton';
import { resetSettingsModeRoutine, setUserRoleRoutine } from 'containers/AppRouter/routines';
import { RoleTypes } from 'containers/AppRouter/models/IRole';
import AvatarUploader from '../../../../components/avatar/AvatarUploader';

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
  const history = useHistory();
  const [firstName, setFirstName] = useState(settings.firstName);
  const [lastName, setLastName] = useState(settings.lastName);
  const [avatar, setAvatar] = useState(settings.avatar);
  const [uploadImage, setUploadImage] = useState(null);
  const [location, setLocation] = useState(settings.location);
  const [company, setCompany] = useState(settings.company);
  const [job, setJob] = useState(settings.job);
  const [website, setWebsite] = useState(settings.website);
  const [twitter, setTwitter] = useState(settings.twitter);
  const [biography, setBiography] = useState(settings.biography);
  useEffect(() => {
    setAvatar(settings.avatar);
    setFirstName(settings.firstName);
    setLastName(settings.lastName);
    setLocation(settings.location);
    setCompany(settings.company);
    setJob(settings.job);
    setWebsite(settings.website);
    setTwitter(settings.twitter);
    setBiography(settings.biography);
  }, [settings]);
  const handleUploadFile = async file => {
    setUploadImage(file);
    setAvatar(URL.createObjectURL(file));
  };
  const handleSubmit = () => {
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
      twitter,
      biography,
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
            label="Company name"
            value={company}
            onChange={e => setCompany(e.target.value)}
            placeholder="Company name"
          />
          <Form.Input
            fluid
            className={styles.formField}
            label="Job title"
            placeholder="Job title"
            value={job}
            onChange={e => setJob(e.target.value)}
          />
        </Form.Group>
        <Form.Group widths="2">
          <Form.Input
            fluid
            className={styles.formField}
            label="Personal website"
            placeholder="Personal website"
            value={website}
            onChange={e => setWebsite(e.target.value)}
          />
          <Form.Input
            fluid
            className={styles.formField}
            label="Twitter"
            placeholder="Twitter"
            value={twitter}
            onChange={e => setTwitter(e.target.value)}
          />
        </Form.Group>
        <Form.Group widths="2">
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
        <Form.Group widths="equal">
          <Form.TextArea
            className={styles.formField}
            label="Biography"
            value={biography}
            id={styles.textBio}
            onChange={(e, data) => setBiography(data.value as string)}
            placeholder="Tell about yourself"
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
