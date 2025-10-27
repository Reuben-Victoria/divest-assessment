import React from "react";

type StatusType = "paid" | "pending" | "draft";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = "",
}) => {
  const getStatusLabel = (status: StatusType): string => {
    return status?.charAt(0)?.toUpperCase() + status?.slice(1);
  };

  return (
    <div className={`status-badge status-badge--${status} ${className}`}>
      <span className="status-badge__dot"></span>
      <span className="status-badge__text">{getStatusLabel(status)}</span>
    </div>
  );
};
export default StatusBadge;
