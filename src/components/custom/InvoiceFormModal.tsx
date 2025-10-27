"use client";
import { useEffect } from "react";
import { InvoiceFormData } from "@/types";
import { useInvoiceForm } from "@/hooks/useInvoiceForm";
import {
  calculateInvoiceTotal,
  generateInvoiceId,
  calculatePaymentDue,
  getEmptyInvoiceForm,
} from "@/utils/invoiceHelper";
import {
  Button,
  RenderIf,
  TextInput,
  DatePicker,
  Dropdown,
} from "@/components";

interface InvoiceFormModalProps {
  mode: "create" | "edit";
  invoice?: InvoiceFormData;
  onClose: () => void;
  onSave: (invoice: InvoiceFormData) => void;
}

const InvoiceFormModal: React.FC<InvoiceFormModalProps> = ({
  mode,
  invoice,
  onClose,
  onSave,
}) => {
  const isEditMode = mode === "edit";

  const {
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
  } = useInvoiceForm(invoice || getEmptyInvoiceForm());

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isValid = await validateForm();

    if (isValid) {
      const total = calculateInvoiceTotal(formData.items);
      const paymentDue = calculatePaymentDue(
        formData.invoiceDate,
        formData.paymentTerms
      );

      const invoiceData: InvoiceFormData = {
        ...formData,
        id: isEditMode && invoice ? invoice.id : generateInvoiceId(),
        status: isEditMode && invoice ? invoice.status : "pending",
        paymentDue,
        total,
      };

      onSave(invoiceData);
    } else {
      const firstErrorElement = document.querySelector(".textinput__error");
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }

    setIsSubmitting(false);
  };

  const handleSaveAsDraft = async () => {
    const total = calculateInvoiceTotal(formData.items);
    const paymentDue = calculatePaymentDue(
      formData.invoiceDate,
      formData.paymentTerms
    );

    const invoiceData: InvoiceFormData = {
      ...formData,
      id: generateInvoiceId(),
      status: "draft",
      paymentDue,
      total,
    };

    onSave(invoiceData);
  };

  return (
    <div className="invoice-form-modal">
      <div className="invoice-form-modal__overlay" onClick={onClose}></div>

      <div className="invoice-form-modal__content">
        <div className="invoice-form-modal__header">
          <h2 className="invoice-form-modal__title">
            <RenderIf condition={isEditMode}>
              Edit <span className="invoice-form-modal__title-hash">#</span>
              {invoice?.id}
            </RenderIf>
            <RenderIf condition={!isEditMode}>New Invoice</RenderIf>
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="invoice-form-modal__body">
            {/* Bill From Section */}
            <div className="invoice-form-modal__section">
              <h3 className="invoice-form-modal__section-title">Bill From</h3>

              <TextInput
                label="Street Address"
                value={formData.senderAddress.street}
                onChange={(e) =>
                  handleAddressChange("senderAddress", "street", e.target.value)
                }
                error={errors.senderStreet}
                fullWidth
              />

              <div className="form-row">
                <TextInput
                  label="City"
                  value={formData.senderAddress.city}
                  onChange={(e) =>
                    handleAddressChange("senderAddress", "city", e.target.value)
                  }
                  error={errors.senderCity}
                />
                <TextInput
                  label="Post Code"
                  value={formData.senderAddress.postCode}
                  onChange={(e) =>
                    handleAddressChange(
                      "senderAddress",
                      "postCode",
                      e.target.value
                    )
                  }
                  error={errors.senderPostCode}
                />
                <TextInput
                  label="Country"
                  value={formData.senderAddress.country}
                  onChange={(e) =>
                    handleAddressChange(
                      "senderAddress",
                      "country",
                      e.target.value
                    )
                  }
                  error={errors.senderCountry}
                />
              </div>
            </div>

            {/* Bill To Section */}
            <div className="invoice-form-modal__section">
              <h3 className="invoice-form-modal__section-title">Bill To</h3>

              <TextInput
                label="Client's Name"
                value={formData.clientName}
                onChange={(e) =>
                  handleInputChange("clientName", e.target.value)
                }
                error={errors.clientName}
                fullWidth
              />

              <TextInput
                label="Client's Email"
                type="email"
                value={formData.clientEmail}
                onChange={(e) =>
                  handleInputChange("clientEmail", e.target.value)
                }
                error={errors.clientEmail}
                fullWidth
                placeholder="e.g. email@example.com"
              />

              <TextInput
                label="Street Address"
                value={formData.clientAddress.street}
                onChange={(e) =>
                  handleAddressChange("clientAddress", "street", e.target.value)
                }
                error={errors.clientStreet}
                fullWidth
              />

              <div className="form-row">
                <TextInput
                  label="City"
                  value={formData.clientAddress.city}
                  onChange={(e) =>
                    handleAddressChange("clientAddress", "city", e.target.value)
                  }
                  error={errors.clientCity}
                />
                <TextInput
                  label="Post Code"
                  value={formData.clientAddress.postCode}
                  onChange={(e) =>
                    handleAddressChange(
                      "clientAddress",
                      "postCode",
                      e.target.value
                    )
                  }
                  error={errors.clientPostCode}
                />
                <TextInput
                  label="Country"
                  value={formData.clientAddress.country}
                  onChange={(e) =>
                    handleAddressChange(
                      "clientAddress",
                      "country",
                      e.target.value
                    )
                  }
                  error={errors.clientCountry}
                />
              </div>
            </div>

            {/* Invoice Details */}
            <div className="form-row-one">
              <div className="form-field">
                <DatePicker
                  fullWidth
                  name="invoiceDate"
                  label="Invoice Date"
                  defaultValue={new Date(formData.invoiceDate)}
                  onChange={(value) => handleInputChange("invoiceDate", value)}
                />
                {errors.invoiceDate && (
                  <span className="textinput__error">{errors.invoiceDate}</span>
                )}
              </div>
              <div className="form-field">
                <Dropdown
                  fullWidth
                  label="Payment Terms"
                  onChange={(value) => handleInputChange("paymentTerms", value)}
                />
                {errors.paymentTerms && (
                  <span className="textinput__error">
                    {errors.paymentTerms}
                  </span>
                )}
              </div>
            </div>

            <TextInput
              label="Project Description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              error={errors.description}
              fullWidth
              placeholder="e.g. Graphic Design Service"
            />

            {/* Item List */}
            <div className="invoice-form-modal__section-one ">
              <h3 className="invoice-form-modal__section-title">Item List</h3>

              {formData.items.map((item, index) => (
                <div key={index} className="item-row">
                  <TextInput
                    label="Item Name"
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(index, "name", e.target.value)
                    }
                    error={errors[`items.${index}.name`]}
                    fullWidth
                  />
                  <TextInput
                    label="Qty."
                    type="number"
                    value={item.quantity.toString()}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                    error={errors[`items.${index}.quantity`]}
                    className="form-field--small"
                  />
                  <TextInput
                    label="Price"
                    type="number"
                    step="0.01"
                    value={item.price.toString()}
                    onChange={(e) =>
                      handleItemChange(index, "price", e.target.value)
                    }
                    error={errors[`items.${index}.price`]}
                  />
                  <div className="form-field">
                    <label className="form-field__label">Total</label>
                    <div className="form-field__total">
                      £ {item.total.toFixed(2)}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="item-row__delete"
                    onClick={() => handleDeleteItem(index)}
                    disabled={formData.items.length === 1}
                  >
                    <svg width="13" height="16" viewBox="0 0 13 16" fill="none">
                      <path
                        d="M11.5 3H8.5V2.5C8.5 1.4 7.6 0.5 6.5 0.5C5.4 0.5 4.5 1.4 4.5 2.5V3H1.5C1.2 3 1 3.2 1 3.5V4C1 4.3 1.2 4.5 1.5 4.5H2V14.5C2 15.1 2.4 15.5 3 15.5H10C10.6 15.5 11 15.1 11 14.5V4.5H11.5C11.8 4.5 12 4.3 12 4V3.5C12 3.2 11.8 3 11.5 3Z"
                        fill="#888EB0"
                      />
                    </svg>
                  </button>
                </div>
              ))}

              {errors.items && typeof errors.items === "string" && (
                <span className="textinput__error">{errors.items}</span>
              )}

              <Button
                type="button"
                variant="default"
                fullWidth
                onClick={handleAddItem}
              >
                + Add New Item
              </Button>
            </div>
          </div>

          <div className="invoice-form-modal__footer">
            <RenderIf condition={!isEditMode}>
              <Button type="button" variant="ghost" onClick={onClose}>
                Discard
              </Button>
            </RenderIf>

            <div className="invoice-form-modal__footer-right">
              <RenderIf condition={!isEditMode}>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleSaveAsDraft}
                >
                  Save as Draft
                </Button>
              </RenderIf>

              <RenderIf condition={isEditMode}>
                <Button type="button" variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
              </RenderIf>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting
                  ? "Saving..."
                  : isEditMode
                  ? "Save Changes"
                  : "Save & Send"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceFormModal;
