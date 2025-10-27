"use client";
import { useRouter } from "next/navigation";
import { useState, useCallback, useMemo } from "react";
import { Button, InvoiceCard, FilterCheckbox, RenderIf } from "@/components";
import type { Invoice } from "@/types";
import InvoiceFormModal from "./InvoiceFormModal";
import { useGetAllInvoices } from "@/services/hooks/queries/useInvoice";
import EmptyState from "./EmptyState";
import { useCreateInvoice } from "@/services/hooks/mutations/useInvoice";

const InvoicesPage = () => {
  const [filters, setFilters] = useState<string[]>([]);
  const [isAddInvoiceModalOpen, setIsAddInvoiceModalOpen] = useState(false);
  const router = useRouter();
  const { data } = useGetAllInvoices();
  const { mutate: createInvoice } = useCreateInvoice(() =>
    setIsAddInvoiceModalOpen(false)
  );
  const invoicesData = useMemo(() => {
    if (!Array.isArray(data)) return [];

    return data.map((item) => ({
      id: item?.id,
      dueDate: item?.paymentDue,
      clientName: item?.clientName,
      amount: item?.total,
      status: item?.status?.toLowerCase(),
    }));
  }, [data]);
  const filteredInvoices = useMemo(() => {
    if (filters.length === 0) return invoicesData;
    return invoicesData?.filter((invoice) =>
      filters.includes(invoice?.status as string)
    );
  }, [filters, invoicesData]);

  const handleFilterChange = useCallback((selectedFilters: string[]) => {
    setFilters(selectedFilters);
  }, []);

  const handleNewInvoice = () => setIsAddInvoiceModalOpen(true);

  const handleInvoiceClick = (invoice: Invoice) => {
    router.push(`/${invoice?.id}`);
  };

  const newInvoiceIcon = (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <path
        d="M6.313 10.023v-3.71h3.71v-2.626h-3.71V.023h-2.626v3.71H.023v2.626h3.71v3.71z"
        fill="#fff"
      />
    </svg>
  );

  return (
    <div className="invoices-page__container">
      <header className="invoices-header">
        <div className="invoices-header__left">
          <h1 className="invoices-header__title">Invoices</h1>
          <p className="invoices-header__subtitle">
            There are {filteredInvoices?.length} total invoices
          </p>
        </div>

        <div className="invoices-header__right">
          <FilterCheckbox onChange={handleFilterChange} />
          <Button
            variant="primary"
            icon={newInvoiceIcon}
            onClick={handleNewInvoice}
          >
            New Invoice
          </Button>
        </div>
      </header>

      <div className="invoices-list">
        <RenderIf condition={filteredInvoices?.length > 0}>
          {filteredInvoices?.map((invoice) => (
            <InvoiceCard
              key={invoice.id}
              invoice={invoice as Invoice}
              onClick={handleInvoiceClick}
            />
          ))}
        </RenderIf>

        <RenderIf condition={filteredInvoices?.length === 0}>
          <EmptyState />
        </RenderIf>
      </div>

      <RenderIf condition={isAddInvoiceModalOpen}>
        <InvoiceFormModal
          onSave={(invoice) => createInvoice({ invoice })}
          invoice={undefined}
          mode="create"
          onClose={() => setIsAddInvoiceModalOpen(false)}
        />
      </RenderIf>
    </div>
  );
};

export default InvoicesPage;
