"use client";
import { useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { StatusBadge, Button, RenderIf } from "@/components";
import InvoiceFormModal from "./InvoiceFormModal";
import DeleteModal from "./DeleteInvoiceModal";
import { useGetInvoiceById } from "@/services/hooks/queries/useInvoice";
import { StatusType } from "@/types";
import {
  useDeleteInvoice,
  useUpdateInvoiceStatus,
} from "@/services/hooks/mutations/useInvoice";
export interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

const InvoiceDetail = () => {
  const router = useRouter();
  const { id } = useParams();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { data } = useGetInvoiceById({ id: id as string });

  const { mutate: deleteInvoice, isPending: isDeleting } = useDeleteInvoice(
    () => router.push("/")
  );

  const { mutate: updateInvoiceStatus, isPending: isUpdatingStatus } =
    useUpdateInvoiceStatus();

  const invoice = useMemo(() => data, [data]);

  console.log(data);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleGoBack = () => {
    router.back();
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteInvoice(id as string);
  };

  const handleMarkAsPaid = () => {
    updateInvoiceStatus({
      id: id as string,
      invoice: { ...invoice, status: "paid" },
    });
  };

  const handleSaveEdit = (updatedInvoice) => {
    // if (onEdit) {
    //   onEdit(updatedInvoice);
    // }
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="invoice-detail">
        <button className="invoice-detail__back" onClick={handleGoBack}>
          <svg width="7" height="10" viewBox="0 0 7 10" fill="none">
            <path d="M6 9L2 5L6 1" stroke="#7C5DFA" strokeWidth="2" />
          </svg>
          <span>Go back</span>
        </button>

        <div className="invoice-detail__status-bar">
          <div className="invoice-detail__status-bar-right">
            <div className="invoice-detail__status-label">Status</div>
            <StatusBadge status={invoice?.status as StatusType} />
          </div>

          <div className="invoice-detail__actions-desktop">
            <Button variant="secondary" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
            <RenderIf condition={invoice?.status === "pending"}>
              <Button variant="primary" onClick={handleMarkAsPaid}>
                {isUpdatingStatus ? "Updating" : "Mark as Paid"}
              </Button>
            </RenderIf>
          </div>
        </div>

        <div className="invoice-detail__content">
          <div className="invoice-detail__header">
            <div className="invoice-detail__header-left">
              <h2 className="invoice-detail__id">
                <span className="invoice-detail__hash">#</span>
                {invoice?.id}
              </h2>
              <p className="invoice-detail__description">
                {invoice?.description}
              </p>
            </div>
            <div className="invoice-detail__sender-address">
              <p>{invoice?.senderAddress?.street}</p>
              <p>{invoice?.senderAddress?.city}</p>
              <p>{invoice?.senderAddress?.postCode}</p>
              <p>{invoice?.senderAddress?.country}</p>
            </div>
          </div>

          <div className="invoice-detail__info">
            <div className="invoice-detail__info-group">
              <div className="invoice-detail__info-item">
                <label>Invoice Date</label>
                <p className="invoice-detail__info-value">
                  {invoice?.createdAt}
                </p>
              </div>
              <div className="invoice-detail__info-item">
                <label>Payment Due</label>
                <p className="invoice-detail__info-value">
                  {invoice?.paymentDue}
                </p>
              </div>
            </div>

            <div className="invoice-detail__info-group">
              <div className="invoice-detail__info-item">
                <label>Bill To</label>
                <p className="invoice-detail__info-value">
                  {invoice?.clientName}
                </p>
                <div className="invoice-detail__client-address">
                  <p>{invoice?.clientAddress?.street}</p>
                  <p>{invoice?.clientAddress?.city}</p>
                  <p>{invoice?.clientAddress?.postCode}</p>
                  <p>{invoice?.clientAddress?.country}</p>
                </div>
              </div>
            </div>

            <div className="invoice-detail__info-group">
              <div className="invoice-detail__info-item">
                <label>Sent to</label>
                <p className="invoice-detail__info-value">
                  {invoice?.clientEmail}
                </p>
              </div>
            </div>
          </div>

          <div className="invoice-detail__items">
            <div className="invoice-detail__items-header">
              <span>Item Name</span>
              <span className="invoice-detail__items-qty">QTY.</span>
              <span className="invoice-detail__items-price">Price</span>
              <span className="invoice-detail__items-total">Total</span>
            </div>

            {invoice?.items?.map((item, index) => (
              <div key={index} className="invoice-detail__item">
                <span className="invoice-detail__item-name">{item?.name}</span>
                <span className="invoice-detail__item-qty">
                  {item?.quantity}
                </span>
                <span className="invoice-detail__item-price">
                  £ {item?.price.toFixed(2)}
                </span>
                <span className="invoice-detail__item-total">
                  £ {item?.total.toFixed(2)}
                </span>
              </div>
            ))}

            <div className="invoice-detail__amount-due">
              <span>Amount Due</span>
              <span className="invoice-detail__amount-value">
                £ {invoice?.total?.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="invoice-detail__actions-mobile">
          <Button variant="secondary" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>

          <RenderIf condition={invoice?.status === "pending"}>
            <Button variant="primary" onClick={handleMarkAsPaid}>
              {isUpdatingStatus ? "Updating" : "Mark as Paid"}
            </Button>
          </RenderIf>
        </div>
      </div>

      <RenderIf condition={isEditModalOpen}>
        <InvoiceFormModal
          mode="edit"
          invoice={invoice}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEdit}
        />
      </RenderIf>

      <RenderIf condition={isDeleteModalOpen}>
        <DeleteModal
          isSubmitting={isDeleting}
          invoiceId={invoice?.id as string}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      </RenderIf>
    </>
  );
};

export default InvoiceDetail;
