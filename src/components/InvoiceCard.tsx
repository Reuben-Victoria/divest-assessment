import StatusBadge from "./StatusBadge";
import type { Invoice } from "@/types";

const InvoiceCard = ({ invoice }: { invoice: Invoice }) => {
  return (
    <div className="invoice-card">
      <div className="invoice-card__id">#{invoice.id}</div>
      <div className="invoice-card__date">Due {invoice.dueDate}</div>
      <div className="invoice-card__client">{invoice.clientName}</div>
      <div className="invoice-card__amount">
        £ {invoice.amount.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
      </div>
      <div className="invoice-card__status">
        <StatusBadge status={invoice.status} />
      </div>
      <div className="invoice-card__arrow">
        <svg width="7" height="10" viewBox="0 0 7 10" fill="none">
          <path d="M1 1L5 5L1 9" stroke="#7C5DFA" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
};

export default InvoiceCard;
