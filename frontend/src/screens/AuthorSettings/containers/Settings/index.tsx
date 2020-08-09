import React, { useState, useEffect } from 'react';
import {
  Button,
  Form
} from 'semantic-ui-react';

import styles from './styles.module.sass';
import {
  locationOptions
} from './options';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchGetAuthorSettingsRoutine, fetchSetAuthorSettingsRoutine } from '../../routines';
import { IAuthorSettings } from 'screens/AuthorSettings/models/IAuthorSettings';
import { IBindingAction, IBindingCallback1 } from 'models/Callbacks';

export interface IAuthorSettingsProps {
  authorSettings: IAuthorSettings;
  fetchAuthorSettings: IBindingAction;
  fetchSetAuthorSettings: IBindingCallback1<IAuthorSettings>;
}

const AuthorSettings: React.FunctionComponent<IAuthorSettingsProps> = ({
  authorSettings: settings,
  fetchAuthorSettings: getSettings,
  fetchSetAuthorSettings: setSettings
}) => {
  useEffect(() => {
    getSettings();
  }, []);
  const history = useHistory();
  const [name, setName] = useState(settings.name);
  const [avatar, setAvatar] = useState(settings.avatar);
  const [uploadImage, setUploadImage] = useState(null);
  const [location, setLocation] = useState(settings.location);
  const [company, setCompany] = useState(settings.company);
  const [website, setWebsite] = useState(settings.website);
  const [biography, setBiography] = useState(settings.biography);
  useEffect(() => {
    setAvatar(settings.avatar);
    setName(settings.name);
    setLocation(settings.location);
    setCompany(settings.company);
    setWebsite(settings.website);
    setBiography(settings.biography);
  }, [settings]);
  const handleUploadFile = async file => {
    setUploadImage(file);
    setAvatar(URL.createObjectURL(file));
  };
  const handleSubmit = () => {
    const updatedSettings = {
      id: settings.id,
      name,
      avatar,
      location,
      company,
      website,
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
          <img src={avatar} alt="" className={styles.avatarImage} />
          <Button as="label" className={styles.avatarUploder}>
            Update
            <input name="image" type="file" onChange={e => handleUploadFile(e.target.files[0])} hidden />
          </Button>
        </div>
      </div>
      <Form className={styles.formSettings}>
        <div id={styles.personalTitle} className={styles.title}>Personal info</div>
        <Form.Group className={styles.formGroup} widths="equal">
          <Form.Input
            fluid
            label="Name"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Form.Select
            fluid
            label="Location"
            placeholder="Select"
            options={locationOptions}
            value={location}
            onChange={(e, data) => setLocation(data.value as string)}
          />
        </Form.Group>
        <Form.Group className={styles.formGroup} widths="equal">
          <Form.Input
            fluid
            label="Company name"
            value={company}
            onChange={e => setCompany(e.target.value)}
            placeholder="Company name"
          />
          <Form.Input
            fluid
            label="Personal website"
            placeholder="Personal website"
            value={website}
            onChange={e => setWebsite(e.target.value)}
          />
        </Form.Group>
        <Form.Group className={styles.formGroup} widths="equal">
          <Form.TextArea
            label="Biography"
            value={biography}
            id={styles.textBio}
            onChange={(e, data) => setBiography(data.value as string)}
            placeholder="Tell about yourself"
          />
        </Form.Group>
        <Form.Group className={styles.formGroup}>
          <Form.Button id={styles.cancelBtn} onClick={() => handleCancel()}>Cancel </Form.Button>
          <Form.Button id={styles.submitBtn} onClick={() => handleSubmit()}>Save</Form.Button>
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
  fetchSetAuthorSettings: fetchSetAuthorSettingsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorSettings);
