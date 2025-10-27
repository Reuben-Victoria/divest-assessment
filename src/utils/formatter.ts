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
  return {
    id: flatData?.id,
    createdAt: formatDate(flatData.invoiceDate),
    description: flatData.description,
    paymentDue: calculatePaymentDue(
      flatData.invoiceDate,
      Number(flatData.paymentTerms)
    ),
    senderAddress: {
      street: flatData.senderAddress.senderStreet,
      city: flatData.senderAddress.senderCity,
      postCode: flatData.senderAddress.senderPostCode,
      country: flatData.senderAddress.senderCountry,
    },
    clientName: flatData.clientName,
    clientEmail: flatData.clientEmail,
    clientAddress: {
      street: flatData.clientAddress.clientStreet,
      city: flatData.clientAddress.clientCity,
      postCode: flatData.clientAddress.clientPostCode,
      country: flatData.clientAddress.clientCountry,
    },
    paymentTerms: Number(flatData.paymentTerms),
    items: flatData.items,
    total: flatData.total ?? 0,
    status: flatData.status ?? "draft",
  };
}
