import { useQueryClient, useMutation } from "@tanstack/react-query";
import { InvoiceFormData } from "@/types";

import { apiRequest } from "@/services/api/apiRequest";

export const useDeleteInvoice = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiRequest<void>(`http://localhost:5000/invoices/${id}`, "DELETE"),
    onSuccess: () => {
      onSuccessCallback?.();
      queryClient.invalidateQueries({ queryKey: ["get-invoices"] });
    },
  });
};

export const useUpdateInvoiceStatus = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      invoice,
    }: {
      id: string;
      invoice: Partial<InvoiceFormData>;
    }) =>
      apiRequest<void>(`http://localhost:5000/invoices/${id}`, "PUT", invoice),
    onSuccess: () => {
      onSuccessCallback?.();
      queryClient.invalidateQueries({ queryKey: ["get-invoices"] });
    },
  });
};

export const useUpdateInvoice = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      invoice,
    }: {
      id: string;
      invoice: Partial<InvoiceFormData>;
    }) =>
      apiRequest<void>(`http://localhost:5000/invoices/${id}`, "PUT", invoice),
    onSuccess: () => {
      onSuccessCallback?.();
      queryClient.invalidateQueries({ queryKey: ["get-invoices"] });
    },
  });
};
