import type { InvoiceFormData} from "@/types";

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

export function toInvoiceFormData(
  flatData: Record<string, any>
): InvoiceFormData {
  return {
    createdAt: flatData.invoiceDate,
    description: flatData.description,
    senderAddress: {
      street: flatData.senderStreet,
      city: flatData.senderCity,
      postCode: flatData.senderPostCode,
      country: flatData.senderCountry,
    },
    clientName: flatData.clientName,
    clientEmail: flatData.clientEmail,
    clientAddress: {
      street: flatData.clientStreet,
      city: flatData.clientCity,
      postCode: flatData.clientPostCode,
      country: flatData.clientCountry,
    },
    invoiceDate: flatData.invoiceDate,
    paymentTerms: Number(flatData.paymentTerms),
    items: flatData.items,
    total: flatData.total ?? 0,
    status: flatData.status ?? "draft",
  };
}
