export enum EsDataType {
  AUTHOR='AUTHOR', COURSE='COURSE', SCHOOL='SCHOOL', PATH='PATH'
}

export const esTypeOptions = Object.keys(EsDataType).map(type => (
  { text: type.substring(0, 1).toUpperCase() + type.substring(1).toLowerCase(),
    value: type.toUpperCase() }
));
