import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { addContact } from 'redux/contactsSlice';
import { customAlphabet } from 'nanoid';

import { contactsSchema, validateName, validateNumber } from './formValidation';

import {
  ContactsForm,
  Label,
  FormButton,
  FormField,
  FormError,
} from './ContactForm.styled';

const initialValues = {
  name: '',
  number: '',
};
const nanoId = customAlphabet('1234567890', 4);

export const ContactForm = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const onFormSubmit = (values, { resetForm }) => {
    const contactExists = contacts.find(
      ({ name }) => name.toLowerCase() === values.name.toLowerCase()
    );

    if (contactExists) {
      alert(`${values.name} is already in contacts.`);
      return;
    }
    const newContact = { id: nanoId(), ...values };
    dispatch(addContact(newContact));
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onFormSubmit}
      validationSchema={contactsSchema}
    >
      <ContactsForm autoComplete="off">
        <Label htmlFor="name">
          Name
          <FormField
            validate={validateName}
            type="text"
            name="name"
            placeholder="Jacob Mercer"
          ></FormField>
          <FormError name="name" component="div" />
        </Label>

        <Label htmlFor="name">
          Number
          <FormField
            validate={validateNumber}
            type="tel"
            name="number"
            placeholder="123-45-67"
          ></FormField>
          <FormError name="number" component="div" />
        </Label>
        <FormButton type="submit">Add contact</FormButton>
      </ContactsForm>
    </Formik>
  );
};
