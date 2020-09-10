import React, { useState, useEffect } from 'react';
import styles from './styles.module.sass';
import { IArticle } from '../../models/domain';
import { Button, Input, Label } from 'semantic-ui-react';
import {
  saveArticleRoutine,
  fetchArticleEditRoutine
} from '../../routines';
import { IAppState } from '@models/AppState';
import { connect } from 'react-redux';
import upload from '@images/file-upload.png';
import { GradientButton } from '@components/buttons/GradientButton';
import GrayOutlineButton from '@components/buttons/GrayOutlineButton';
import { history } from '@helpers/history.helper';
import { IBindingCallback1 } from '@models/Callbacks';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import {EditorState, convertToRaw, ContentState  } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { isImage } from '@screens/AddCourse/services/helper.service';
import {
  isValidArticleName,
  ARTICLE_NAME_MESSAGE
} from '@helpers/validation.helper';
import { useParams, useLocation } from 'react-router-dom';
export interface IAddArticleProps {
  saveArticle: IBindingCallback1<IArticle>;
  fetchArticle: IBindingCallback1<string>;
  isAuthorized: boolean;
  article: IArticle;
  saveLoading: boolean;
}

export const AddArticlePage: React.FC<IAddArticleProps> = ({
  saveArticle , article , fetchArticle, saveLoading
}) => {
  const location = useLocation();
  const { articleId } = useParams();  
  const isEdit = location.pathname.startsWith('/article/edit');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState(undefined);
  const [isArticleNameValid, setIsArticleNameValid] = useState(true);
  const [uploadImage, setUploadImage] = useState(null);
  const setDefault = () => {
    setName('');
    setImage('');
    setContent(undefined);
    setIsArticleNameValid(true);
    setUploadImage(null);
  };

  useEffect(() => {
    if (location.pathname === "/add_article") setDefault();
  }, [location.pathname]);

  useEffect(() => {
    if (articleId){
    fetchArticle(articleId);
    }
  }, [articleId]);
  useEffect(()=>{
    setName(article?.name);
    setImage(article?.image);
    if(article?.text){
    setContent(EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(article?.text).contentBlocks)));    
    }
  },[article])

 
  function validateArticleName(newName?: string) {
    const lastChangesName = typeof newName === 'string' ? newName : name;
    setIsArticleNameValid(!!lastChangesName && isValidArticleName(lastChangesName));
  }
  const isRequiredFieldsValid = !!name && isArticleNameValid;
  const isReadyToRelease = isRequiredFieldsValid && (uploadImage ||image )&& content !== undefined;

  const handleSaveArticle = () => {
    if (!isReadyToRelease) return;
    const article: IArticle = {
      id: articleId ,
      name,
      image: uploadImage ? '' : image,
      text: draftToHtml(convertToRaw(content.getCurrentContent())),
      uploadImage
    };
    saveArticle(article);
  };

  const handleCancel = () => {
    history.push('/');
  };

  const handleUploadFile = file => {
    const thisFile: File = file;
    if (thisFile && isImage(thisFile.name)) {
      setUploadImage(thisFile);
      setImage(URL.createObjectURL(thisFile));
    }
  };
  const editorOptions = ['inline', 'embedded', 'emoji', 'image', 'blockType', 'list', 'textAlign', 'link', 'history'];
  return (
    <>
      <div className={styles.wrapperTitle}>
        <div id={styles.articleTitle}>New Article</div>
      </div>
      <div className={styles.main_container}>
        <div className={styles.main_content}>
          <div className={styles.wrapPreview}>
            <div className={styles.preview}>
              <div className={styles.form__name}>
                <span className={styles.form__label}>Title:</span>
                <Input
                  name="Name"
                  value={name}
                  className={
                    `${!isArticleNameValid && styles.no_bottom_rounding_field}`
                  }
                  onChange={ev => {
                    const { value } = ev.target;
                    setName(value);
                    validateArticleName(value);
                  }}
                  onBlur={() => validateArticleName()}
                  error={!isArticleNameValid}
                  fluid
                />
                {!isArticleNameValid && (
                  <Label
                    basic
                    className={styles.warningLabel}
                    promt="true"
                    content={ARTICLE_NAME_MESSAGE}
                  />
                )}
              </div>
              <div className={styles.container}>
                <div className={styles.back}>
                  <div className={styles.article_image}>
                    {image && <img src={image} alt="Course" />}
                  </div>
                  <Button as="label" className={image ? styles.imageUploader : styles.imagePlaceholder}>
                    <div className={styles.uploaderInfo}>
                      <img src={upload} alt="Upload" />
                      Upload image here
                    </div>
                    <input name="image" type="file" onChange={e => handleUploadFile(e.target.files[0])} hidden />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.wide_container}>
            <div className={styles.form__container}>
              <span className={styles.form__label}>Content:</span>
              <div id={styles.editor_block}>
                <Editor
                  toolbarClassName={styles.form__toolbar}
                  wrapperClassName={styles.form__wrapEditor}
                  editorClassName={styles.form__editor}
                  toolbar={{ options: editorOptions }}
                  editorState={content}
                  onEditorStateChange={setContent}
                />
              </div>
              <div className={`${styles.form__buttons} ${styles.form__group}`}>
                <div className={styles.form__button_row}>
                  <GrayOutlineButton
                    content="Cancel"
                    onClick={handleCancel}
                    className={styles.btn_cancel}
                  />
                  <GradientButton
                    disabled={!isReadyToRelease}
                    loading={saveLoading}
                    className={isReadyToRelease ? styles.button_release : styles.button_release_disabled}
                    onClick={handleSaveArticle}
                    content="Save"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: IAppState) => {
  const {article} = state.addArticlePage.data;
  const { isAuthorized } = state.auth.auth;
  return {
    isAuthorized,
    article,
    saveLoading: state.addArticlePage.requests.saveArticleRequest.loading
  };
};

const mapDispatchToProps = {
  saveArticle: saveArticleRoutine,
  fetchArticle: fetchArticleEditRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(AddArticlePage);

