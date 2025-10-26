import { InvoiceFormData, InvoiceItem } from "@/types";
export const getEmptyInvoiceForm = (): InvoiceFormData => ({
  description: '',
  senderAddress: {
    street: '',
    city: '',
    postCode: '',
    country: '',
  },
  clientName: '',
  clientEmail: '',
  clientAddress: {
    street: '',
    city: '',
    postCode: '',
    country: '',
  },
  invoiceDate: new Date().toISOString().split('T')[0],
  paymentTerms: 30,
  items: [
    { name: '', quantity: 1, price: 0, total: 0 }
  ],
});

export const calculateInvoiceTotal = (items: InvoiceItem[]): number => {
  return items.reduce((sum, item) => sum + item.total, 0);
};

export const generateInvoiceId = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const calculatePaymentDue = (invoiceDate: string, paymentTerms: number): string => {
  const date = new Date(invoiceDate);
  date.setDate(date.getDate() + paymentTerms);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};
