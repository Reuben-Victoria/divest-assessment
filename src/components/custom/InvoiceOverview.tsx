"use client";
import { useState, useEffect } from "react";

import { Button, InvoiceCard, FilterCheckbox } from "@/components";
import type { Invoice } from "@/types";

// Mock data
const invoicesData: Invoice[] = [
  {
    id: "RT3080",
    dueDate: "19 Aug 2021",
    clientName: "Jensen Huang",
    amount: 1800.9,
    status: "paid",
  },
  {
    id: "XM9141",
    dueDate: "20 Sep 2021",
    clientName: "Alex Grim",
    amount: 556.0,
    status: "pending",
  },
  {
    id: "RG0314",
    dueDate: "01 Oct 2021",
    clientName: "John Morrison",
    amount: 14002.33,
    status: "paid",
  },
  {
    id: "RT2080",
    dueDate: "12 Oct 2021",
    clientName: "Alysa Werner",
    amount: 102.04,
    status: "pending",
  },
  {
    id: "AA1449",
    dueDate: "14 Oct 2021",
    clientName: "Mellisa Clarke",
    amount: 4032.33,
    status: "pending",
  },
  {
    id: "TY9141",
    dueDate: "31 Oct 2021",
    clientName: "Thomas Wayne",
    amount: 6155.91,
    status: "pending",
  },
  {
    id: "FV2353",
    dueDate: "12 Nov 2021",
    clientName: "Anita Wainwright",
    amount: 3102.04,
    status: "draft",
  },
];

const InvoicesPage = () => {
  const [filters, setFilters] = useState<string[]>([]);
  const [filteredInvoices, setFilteredInvoices] =
    useState<Invoice[]>(invoicesData);

  useEffect(() => {
    if (filters.length === 0) {
      setFilteredInvoices(invoicesData);
    } else {
      setFilteredInvoices(
        invoicesData.filter((invoice) => filters.includes(invoice.status))
      );
    }
  }, [filters]);

  const handleFilterChange = (selectedFilters: string[]) => {
    setFilters(selectedFilters);
  };

  const handleNewInvoice = () => {
    console.log("New invoice clicked");
    // Add your new invoice logic here
  };

  const handleInvoiceClick = (invoice: Invoice) => {
    console.log("Invoice clicked:", invoice);
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
            There are {filteredInvoices.length} total invoices
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
        {filteredInvoices.map((invoice) => (
          <InvoiceCard
            key={invoice.id}
            invoice={invoice}
            onClick={handleInvoiceClick}
          />
        ))}
      </div>
    </div>
  );
};

export default InvoicesPage;
