import { normalizeDate } from "./formatter";
import { InvoiceFormData, InvoiceItem } from "@/types";
export const getEmptyInvoiceForm = (): InvoiceFormData => {
//   const today = new Date();
//   const year = today.getFullYear();
//   const month = String(today.getMonth() + 1).padStart(2, "0");
//   const day = String(today.getDate()).padStart(2, "0");

  return {
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
  };
};
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
  const normalizedDate = normalizeDate(invoiceDate);
  const date = new Date(normalizedDate);
  date.setDate(date.getDate() + paymentTerms);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};
