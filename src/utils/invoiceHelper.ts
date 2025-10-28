import { InvoiceFormData, InvoiceItem } from "@/types";
export const getEmptyInvoiceForm = (): InvoiceFormData => ({
  id: "",
  createdAt: undefined,
  invoiceDate: undefined,
  paymentDue: "",
  description: "",
  paymentTerms: 30,
  clientName: "",
  clientEmail: "",
  status: "draft",
  senderAddress: {
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  clientAddress: {
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  items: [
    {
      name: "",
      quantity: 1,
      price: 0,
      total: 0,
    },
  ],
  total: 0,
});
export const calculateInvoiceTotal = (items: InvoiceItem[]): number => {
  return items.reduce((sum, item) => sum + item.total, 0);
};

export const generateInvoiceId = (): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const calculatePaymentDue = (
  invoiceDate: string,
  paymentTerms: number
): string => {
  const date = new Date(invoiceDate);
  date.setDate(date.getDate() + paymentTerms);
  return date.toLocaleDateString("en-GB");
};
