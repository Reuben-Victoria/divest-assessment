import { calculatePaymentDue } from "./invoiceHelper";

export const formatCurrency = (
  amount: number,
  locale = "en-GB",
  currency = "GBP"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateString: string, locale = "en-GB"): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

export function toInvoiceFormData(flatData: Record<string, any>) {

    console.log(flatData.invoiceDate, "SHSH")
  return {
    createdAt: flatData.invoiceDate,
    description: flatData.description,
    paymentDue: calculatePaymentDue(
      flatData.invoiceDate,
      Number(flatData.paymentTerms)
    ),
    senderAddress: {
      street: flatData.senderAddress.street,
      city: flatData.senderAddress.city,
      postCode: flatData.senderAddress.postCode,
      country: flatData.senderAddress.country,
    },
    clientName: flatData.clientName,
    clientEmail: flatData.clientEmail,
    clientAddress: {
      street: flatData.clientAddress.street,
      city: flatData.clientAddress.city,
      postCode: flatData.clientAddress.postCode,
      country: flatData.clientAddress.country,
    },
    paymentTerms: Number(flatData.paymentTerms),
    items: flatData.items,
    total: flatData.total ?? 0,
    status: flatData.status ?? "draft",
  };
}
