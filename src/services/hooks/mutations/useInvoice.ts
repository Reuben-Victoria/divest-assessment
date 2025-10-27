import { useQueryClient, useMutation } from "@tanstack/react-query";

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
