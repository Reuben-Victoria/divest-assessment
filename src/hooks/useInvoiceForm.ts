import { useState } from "react";
import * as Yup from "yup";
import { InvoiceFormData, InvoiceItem } from "@/types";
import { invoiceValidationSchema, FormErrors } from "@/utils/invoiceValidation";
import { normalizeDate } from "@/utils/formatter";

export const useInvoiceForm = (initialData: InvoiceFormData) => {
  const [formData, setFormData] = useState<InvoiceFormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const getFlattenedFormData = (): Record<string, unknown> => ({
    senderStreet: formData.senderAddress.street,
    senderCity: formData.senderAddress.city,
    senderPostCode: formData.senderAddress.postCode,
    senderCountry: formData.senderAddress.country,
    clientName: formData.clientName,
    clientEmail: formData.clientEmail,
    clientStreet: formData.clientAddress.street,
    clientCity: formData.clientAddress.city,
    clientPostCode: formData.clientAddress.postCode,
    clientCountry: formData.clientAddress.country,
    invoiceDate: normalizeDate(formData?.createdAt),
    paymentTerms: formData.paymentTerms,
    description: formData.description,
    items: formData.items,
  });

  const validateForm = async (): Promise<boolean> => {
    try {
      await invoiceValidationSchema.validate(getFlattenedFormData(), {
        abortEarly: false,
      });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: FormErrors = {};
        err.inner.forEach((error) => {
          if (error.path) validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      }
      return false;
    }
  };

  const clearError = (field: string): void => {
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  const handleInputChange = <K extends keyof InvoiceFormData>(
    field: K,
    value: InvoiceFormData[K]
  ): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    clearError(field as string);
  };

  const handleAddressChange = <
    T extends "senderAddress" | "clientAddress",
    K extends keyof InvoiceFormData[T]
  >(
    type: T,
    field: K,
    value: InvoiceFormData[T][K]
  ): void => {
    setFormData((prev) => {
      const newData = {
        ...prev,
        [type]: {
          ...prev[type],
          [field]: value,
        },
      };
      return newData;
    });

    const errorKey =
      type === "senderAddress"
        ? `sender${String(field)[0].toUpperCase()}${String(field).slice(1)}`
        : `client${String(field)[0].toUpperCase()}${String(field).slice(1)}`;

    clearError(errorKey);
  };

  const handleItemChange = <K extends keyof InvoiceItem>(
    index: number,
    field: K,
    value: InvoiceItem[K]
  ): void => {
    const updatedItems = [...formData.items];
    const item = { ...updatedItems[index] };

    if (field === "quantity" || field === "price") {
      const numericValue =
        typeof value === "number" ? value : parseFloat(String(value)) || 0;
      item[field] = numericValue as InvoiceItem[K];
    } else {
      item[field] = value;
    }

    if (field === "quantity" || field === "price") {
      item.total = item.quantity * item.price;
    }

    updatedItems[index] = item;
    setFormData((prev) => ({ ...prev, items: updatedItems }));
    clearError(`items.${index}.${String(field)}`);
  };

  const handleAddItem = (): void => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { name: "", quantity: 1, price: 0, total: 0 }],
    }));
  };

  const handleDeleteItem = (index: number): void => {
    if (formData.items.length === 1) {
      setErrors((prev) => ({
        ...prev,
        items: "At least one item is required",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  return {
    formData,
    errors,
    isSubmitting,
    setIsSubmitting,
    validateForm,
    handleInputChange,
    handleAddressChange,
    handleItemChange,
    handleAddItem,
    handleDeleteItem,
  };
};
