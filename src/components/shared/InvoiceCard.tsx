import StatusBadge from "./StatusBadge";
import type { Invoice } from "@/types";

interface InvoiceCardProps {
  invoice: Invoice;
  onClick?: (invoice: Invoice) => void;
}

const InvoiceCard: React.FC<InvoiceCardProps> = ({ invoice, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(invoice);
    }
  };

  return (
    <div className="invoice-card" onClick={handleClick}>
      <div className="invoice-card__id">
        <span className="invoice-card__hash">#</span>
        {invoice.id}
      </div>
      <div className="invoice-card__date">Due {invoice.dueDate}</div>
      <div className="invoice-card__client">{invoice.clientName}</div>
      <div className="invoice-card__amount">
        £{" "}
        {invoice.amount.toLocaleString("en-GB", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
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
