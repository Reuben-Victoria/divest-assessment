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

export const normalizeDate = (date: string | Date | undefined): string => {
  if (!date) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  let dateObj: Date;

  if (typeof date === "string") {
    if (/^\d{1,2}\s\w{3,9}\s\d{4}$/.test(date)) {
      const months: { [key: string]: number } = {
        Jan: 0,
        January: 0,
        Feb: 1,
        February: 1,
        Mar: 2,
        March: 2,
        Apr: 3,
        April: 3,
        May: 4,
        Jun: 5,
        June: 5,
        Jul: 6,
        July: 6,
        Aug: 7,
        August: 7,
        Sep: 8,
        September: 8,
        Oct: 9,
        October: 9,
        Nov: 10,
        November: 10,
        Dec: 11,
        December: 11,
      };

      const parts = date.split(" ");
      const day = parseInt(parts[0], 10);
      const month = months[parts[1]];
      const year = parseInt(parts[2], 10);

      dateObj = new Date(year, month, day);
    } else if (date.includes("T")) {
      const cleanDate = date.split("T")[0];
      const [year, month, day] = cleanDate.split("-").map(Number);
      dateObj = new Date(year, month - 1, day);
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      const [year, month, day] = date.split("-").map(Number);
      dateObj = new Date(year, month - 1, day);
    } else {
      dateObj = new Date(date);
    }
  } else {
    dateObj = date;
  }

  if (isNaN(dateObj.getTime())) {
    console.warn("Invalid date:", date, "- using current date");
    dateObj = new Date();
  }

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const parseDayMonthYearFormat = (dateString: string): Date => {
  const months: { [key: string]: number } = {
    Jan: 0,
    January: 0,
    Feb: 1,
    February: 1,
    Mar: 2,
    March: 2,
    Apr: 3,
    April: 3,
    May: 4,
    Jun: 5,
    June: 5,
    Jul: 6,
    July: 6,
    Aug: 7,
    August: 7,
    Sep: 8,
    September: 8,
    Oct: 9,
    October: 9,
    Nov: 10,
    November: 10,
    Dec: 11,
    December: 11,
  };

  const parts = dateString.split(" ");
  const day = parseInt(parts[0], 10);
  const month = months[parts[1]];
  const year = parseInt(parts[2], 10);

  return new Date(year, month, day);
};

export const formatDateForDisplay = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

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

export const formatDateForAPI = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export function toInvoiceFormData(flatData: Record<string, any>) {
  const normalizedInvoiceDate = normalizeDate(flatData.invoiceDate);
  return {
    createdAt: formatDateForDisplay(normalizedInvoiceDate),
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
