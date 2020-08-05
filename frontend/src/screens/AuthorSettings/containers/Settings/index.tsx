import React, { useState, useEffect } from 'react';
import {
  Button,
  Form
} from 'semantic-ui-react';
import './style.sass';
import {
  locationOptions,
  yearOptions,
  levelOptions,
  industryOptions,
  roleOptions,
  educationOptions,
  employmentOptions
} from './options';

import { connect } from 'react-redux';
import { fetchGetSettingsRoutine, fetchSetSettingsRoutine } from '../../routines';
import { ISettings } from 'screens/AuthorSettings/models/ISettings';
import { IBindingAction, IBindingCallback1 } from 'models/Callbacks';

export interface ISettingsProps {
  settings: ISettings;
  fetchSettings: IBindingAction;
  fetchSetSettings: IBindingCallback1<ISettings>;
}

const AuthorSettings: React.FunctionComponent<ISettingsProps> = ({
  settings,
  fetchSettings: getSettings,
  fetchSetSettings: setSettings
}) => {
  useEffect(() => {
    getSettings();
  }, []);
  const [name, setName] = useState(settings.name);
  const [location, setLocation] = useState(settings.location);
  const [companyName, setCompanyName] = useState(settings.companyName);
  const [website, setWebsite] = useState(settings.website);
  const [job, setJob] = useState(settings.job);
  const [experience, setExperience] = useState(settings.experience);
  const [level, setLevel] = useState(settings.level);
  const [industry, setIndustry] = useState(settings.industry);
  const [role, setRole] = useState(settings.role);
  const [employment, setEmployment] = useState(settings.employment);
  const [education, setEducation] = useState(settings.education);
  const [years, setYears] = useState(settings.years);
  const handleUploadFile = () => {
    // todo
  };
  const handleSubmit = () => {
    const updatedSettings = {
      name,
      location,
      companyName,
      website,
      job,
      experience,
      level,
      industry,
      role,
      employment,
      education,
      years
    };
    setSettings(updatedSettings);
  };
  return (
    <div className="Settings">
      <div className="SettingsTitle">Account Settings</div>
      <div className="WrapperImg">
        <img src="" alt="" className="Avatar" />
        <Button as="label" id="ImageUploder">
          Update
          <input name="image" type="file" onChange={handleUploadFile} hidden />
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
            value={level}
            onChange={(e, data) => setLocation(data.value as string)}
          />
        </Form.Group>
        <Form.Group className="FormGroup" widths="2">
          <Form.Input
            fluid
            label="Company name"
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
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
        <div className="Demographic Title"> Demographic Info</div>
        <Form.Group className="FormGroup" width="4">
          <Form.Checkbox
            label="Developer"
            value="Developer"
            checked={job === 'Developer'}
            onChange={() => setJob('Developer')}
          />
          <Form.Checkbox
            label="IT Professional"
            value="IT Professional"
            checked={job === 'IT Professional'}
            onChange={() => setJob('IT Professional')}
          />
          <Form.Checkbox
            label="Creative"
            value="Creative"
            checked={job === 'Creative'}
            onChange={() => setJob('Creative')}
          />
          <Form.Checkbox
            label="Other"
            value="Other"
            checked={job === 'Other'}
            onChange={() => setJob('Other')}
          />
        </Form.Group>
        <Form.Group className="FormGroup" widths="2">
          <Form.Input
            fluid
            label="Year of Experience"
            placeholder="0"
            value={experience}
            onChange={e => setExperience(e.target.value)}
          />
          <Form.Select
            fluid
            label="Level within"
            placeholder="Select"
            options={levelOptions}
            value={level}
            onChange={(e, data) => setLevel(data.value as string)}
          />
        </Form.Group>
        <Form.Group className="FormGroup" widths="2">
          <Form.Select
            fluid
            label="Industry"
            placeholder="Select"
            options={industryOptions}
            value={industry}
            onChange={(e, data) => setIndustry(data.value as string)}
          />
          <Form.Select
            fluid
            label="Role"
            placeholder="Select"
            options={roleOptions}
            value={role}
            onChange={(e, data) => setRole(data.value as string)}
          />
        </Form.Group>
        <Form.Group className="FormGroup" widths="2">
          <Form.Select
            fluid
            label="Employment Status"
            placeholder="Select"
            options={employmentOptions}
            value={employment}
            onChange={(e, data) => setEmployment(data.value as string)}
          />
          <Form.Select
            fluid
            label="Education Level"
            placeholder="Select"
            options={educationOptions}
            value={education}
            onChange={(e, data) => setEducation(data.value as string)}
          />
        </Form.Group>
        <Form.Group className="FormGroup" widths="2">
          <Form.Select
            fluid
            label="Year of Birth"
            placeholder="Select"
            options={yearOptions}
            value={years}
            onChange={(e, data) => setYears(data.value as number)}
          />
        </Form.Group>
        <Form.Group className="FormGroup" inline>
          <Form.Button id="CancelBtn">Cancel </Form.Button>
          <Form.Button type="submit" id="SubmitBtn" onClick={() => handleSubmit()}>Save</Form.Button>
        </Form.Group>
      </Form>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { settings: { settings } } = state;
  return {
    settings
  };
};

const mapDispatchToProps = {
  fetchSettings: fetchGetSettingsRoutine,
  fetchSetSettings: fetchSetSettingsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorSettings);
