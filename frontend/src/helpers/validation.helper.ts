export const LATIN_LETTER_ONLY = '(only Latin letters allowed)';
export const DIGITS_LATIN_LETTERS_SPEC_CHARS_ONLY = '(only digits, Latin letters and special characters allowed)';
export const EMAIL_MESSAGE = `Email length must be 5-71(with @) symbols ${DIGITS_LATIN_LETTERS_SPEC_CHARS_ONLY}.`;
export const PASSWORD_MESSAGE = `Password length must be 8-32 symbols ${DIGITS_LATIN_LETTERS_SPEC_CHARS_ONLY}.`;
export const PASSWORDS_NOT_MATCH = 'Passwords not match.';
export const FIRST_NAME_MESSAGE = `First name must be 2-40 symbols ${LATIN_LETTER_ONLY}.`;
export const LAST_NAME_MESSAGE = `Last name must be 2-40 symbols ${LATIN_LETTER_ONLY}.`;
export const COMPANY_MESSAGE = 'Company name must be 2-40 symbols (only Latin letters, numbers, and \'-\' allowed).';
export const URL_MESSAGE = 'Check your website url correctness.';
export const TWITTER_MESSAGE = 'Check your twitter account url correctness.';
export const BIOGRAPHY_MESSAGE = `
Biography can be empty or it min length must be 50 symbols ${DIGITS_LATIN_LETTERS_SPEC_CHARS_ONLY}.`;
export const JOB_MESSAGE = 'Job min length must be 1 symbol (only Latin letters, hyphen and whitespaces allowed).';
export const COURSE_NAME_MESSAGE = `Course name length must be 2-40 symbols ${DIGITS_LATIN_LETTERS_SPEC_CHARS_ONLY}.`;
export const PATH_NAME_MESSAGE = `Path name length must be 2-40 symbols ${DIGITS_LATIN_LETTERS_SPEC_CHARS_ONLY}.`;
export const DESCRIPTION_MESSAGE = `
Description can be empty or it min length must be 10 symbols ${DIGITS_LATIN_LETTERS_SPEC_CHARS_ONLY}.`;
export const LECTURE_MESSAGE = `Lecture name must be 3-40 symbols ${DIGITS_LATIN_LETTERS_SPEC_CHARS_ONLY}.`;

export const IMAGE_FORMAT_MESSAGE = 'Supported image formats: jpg, png, jpeg.';
export const VIDEO_FORMAT_MESSAGE = 'Supported video formats: m4v, avi, mpg, mp4, mkv.';
export const REQUIRED_FIELD_MESSAGE = 'This field is required';

// eslint-disable-next-line max-len
const emailRegex = /^\w[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~"-]{0,34}@((\[?[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}]?)|(([a-zA-Z0-9][a-zA-Z\-0-9]*\.)+[a-zA-Z]+))$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,32}$/;
const userNameRegex = /^[a-zA-Z]{2,40}$/;
const companyRegex = /^[a-zA-Z0-9-]{2,40}$/;
const urlRegex = /^(https?|ftp|file):\/\/[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]/;
const twitterRegex = /^https(?:s)?:\/\/twitter\.com\/([a-zA-Z0-9_]+)$/;
const biographyRegex = /^$|^[\d\D]{50,}$/;
const jobRegex = /^[a-zA-Z][a-zA-Z- ]+$/;
const coursePathNameRegex = /^[a-zA-Z0-9!:;=<>@#$&()\\-`.+,"/ ]{2,40}$/;
const coursePathLectureDescriptionRegex = /^$|^[a-zA-Z0-9!:;=<>@#$&()\\-`.+,"/ ]{10,}$/;
const lectureNameRegex = /^[a-zA-Z0-9!:;=<>@#$&()\\-`.+,"/ ]{3,40}$/;

export const isValidEmail = (str: string): boolean => emailRegex.test(str) && str.length >= 5 && str.length <= 71;
export const isValidPassword = (str: string): boolean => passwordRegex.test(str) && str.length >= 8 && str.length <= 32;
export const isValidNameSurname = (str: string): boolean => userNameRegex.test(str);
export const isValidCompany = (str: string): boolean => companyRegex.test(str);
export const isValidUrl = (str: string): boolean => urlRegex.test(str);
export const isValidTwitter = (str: string): boolean => twitterRegex.test(str);
export const isValidBiography = (str: string): boolean => biographyRegex.test(str);
export const isValidJob = (str: string): boolean => jobRegex.test(str);
export const isValidCourseName = (str: string): boolean => coursePathNameRegex.test(str);
export const isValidCourseDescription = (str: string): boolean => coursePathLectureDescriptionRegex.test(str);
export const isValidPathName = (str: string): boolean => coursePathNameRegex.test(str);
export const isValidPathDescription = (str: string): boolean => coursePathLectureDescriptionRegex.test(str);
export const isValidLectureName = (str: string): boolean => lectureNameRegex.test(str);
export const isValidLectureDescription = (str: string): boolean => coursePathLectureDescriptionRegex.test(str);
