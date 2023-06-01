import * as yup from 'yup';

export const contactsSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Too short name!')
    .required('Name is a required field!'),
  number: yup.string().required('Number is a required field!'),
});
export const validateName = value => {
  let errorMessage;
  if (
    !/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/i.test(value)
  ) {
    errorMessage = `Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan`;
  }
  return errorMessage;
};

export const validateNumber = value => {
  let errorMessage;
  if (
    !/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/i.test(
      value
    )
  ) {
    errorMessage = `Phone number must be digits and can contain spaces, dashes, parentheses and can start with +`;
  }
  return errorMessage;
};
