const DESCRIPTION_MAX_LENGTH = 140;
let errorMessage = '';
const error = () => errorMessage;

const isDescriptionValid = (descriptionString) => {
  errorMessage = '';
  const descr = descriptionString.trim();
  if(descr.length > DESCRIPTION_MAX_LENGTH) {
    errorMessage = 'длина комментария не может составлять больше 140 символов.';
    return false;
  }
  return true;
};

export { isDescriptionValid, error };
