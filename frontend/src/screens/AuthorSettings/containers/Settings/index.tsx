import React, { useState, useEffect } from 'react';
import {
  Button,
  Form
} from 'semantic-ui-react';
import './style.sass';
import {
  locationOptions
} from './options';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchGetAuthorSettingsRoutine, fetchSetAuthorSettingsRoutine } from '../../routines';
import { IAuthorSettings } from 'screens/AuthorSettings/models/ISettings';
import { IBindingAction, IBindingCallback1 } from 'models/Callbacks';
import { uploadImage } from 'services/image.service';

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
  const handleUploadFile = async image => {
    console.log(image);
    const { link } = await uploadImage(image);
    console.log(link);
    setAvatar(link);
  };
  const handleSubmit = () => {
    const updatedSettings = {
      id: settings.id,
      name,
      avatar,
      location,
      company,
      website,
      biography
    };
    setSettings(updatedSettings);
  };
  const handleCancel = () => {
    history.push('/');
  };
  return (
    <div className="Settings">
      <div className="SettingsTitle">Account Settings</div>
      <div className="WrapperImg">
        <img src={avatar} alt="" className="Avatar" />
        <Button as="label" id="ImageUploder">
          Update
          <input name="image" type="file" onChange={e => handleUploadFile(e.target.files[0])} hidden />
        </Button>
      </div>
      <Form>
        <div className="Personal Title">Personal info</div>
        <Form.Group className="FormGroup" widths="2">
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
        <Form.Group className="FormGroup" widths="2">
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
        <Form.Group className="FormGroup" widths="2">
          <Form.TextArea
            label="Biography"
            value={biography}
            onChange={(e, data) => setBiography(data.value as string)}
            placeholder="Tell about yourself"
          />
        </Form.Group>
        <Form.Group className="FormGroup" inline>
          <Form.Button id="CancelBtn" onClick={() => handleCancel()}>Cancel </Form.Button>
          <Form.Button type="submit" id="SubmitBtn" onClick={() => handleSubmit()}>Save</Form.Button>
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
