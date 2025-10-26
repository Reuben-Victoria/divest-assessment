import * as Yup from 'yup';

export const invoiceValidationSchema = Yup.object().shape({
  // Bill From
  senderStreet: Yup.string().required('Street address is required'),
  senderCity: Yup.string().required('City is required'),
  senderPostCode: Yup.string().required('Post code is required'),
  senderCountry: Yup.string().required('Country is required'),

  // Bill To
  clientName: Yup.string().required("Client's name is required"),
  clientEmail: Yup.string()
    .email('Invalid email format')
    .required("Client's email is required"),
  clientStreet: Yup.string().required('Street address is required'),
  clientCity: Yup.string().required('City is required'),
  clientPostCode: Yup.string().required('Post code is required'),
  clientCountry: Yup.string().required('Country is required'),

  // Invoice Details
  invoiceDate: Yup.string().required('Invoice date is required'),
  paymentTerms: Yup.number()
    .required('Payment terms is required')
    .positive('Must be positive'),
  description: Yup.string().required('Project description is required'),

  // Items
  items: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required('Item name is required'),
        quantity: Yup.number()
          .required('Quantity is required')
          .positive('Must be positive')
          .integer('Must be a whole number'),
        price: Yup.number()
          .required('Price is required')
          .positive('Must be positive'),
      })
    )
    .min(1, 'At least one item is required'),
});

export interface FormErrors {
  [key: string]: string;
}
