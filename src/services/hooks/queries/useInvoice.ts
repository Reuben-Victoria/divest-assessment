import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/services/api/apiRequest";
import type { InvoiceFormData } from "@/types";

export const useGetAllInvoices = () => {
  return useQuery({
    queryKey: ["get-invoices"],
    queryFn: () => apiRequest<InvoiceFormData[]>("http://localhost:5000/invoices"),
    select(data) {
      return data;
    },
  });
};

export const useGetInvoiceById = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["get-invoices", id],
    queryFn: () => apiRequest<InvoiceFormData>(`http://localhost:5000/invoices/${id}`),
    enabled: !!id,
    select(data) {
      return data;
    },
  });
};
