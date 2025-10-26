type StatusType = "paid" | "pending" | "draft";
type ThemeType = "light" | "dark";

export interface Invoice {
  id: string;
  dueDate: string;
  clientName: string;
  amount: number;
  status: StatusType;
}

export interface InvoiceDetails extends Invoice {
  createdAt: string;
  paymentTerms: number;
  description: string;
  senderAddress: Address;
  clientAddress: Address;
  items: InvoiceItem[];
  total: number;
}



export interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface InvoiceFormData {
  id?: string;
  status?: StatusType;
  description: string;
  senderAddress: Address;
  clientName: string;
  clientEmail: string;
  clientAddress: Address;
  invoiceDate: string;
  paymentDue?: string;
  paymentTerms: number;
  items: InvoiceItem[];
  total?: number;
}

export interface InvoiceDetailData extends InvoiceFormData {
  id: string;
  status: StatusType;
  paymentDue: string;
  total: number;
}
