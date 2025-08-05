type StatusBadgeProps = {
  status: "approved" | "pending";
  children: React.ReactNode;
};

export default function StatusBadge({ status, children }: StatusBadgeProps) {
  const statusClasses = {
    approved: "bg-ds-bg-badge-approved text-ds-success-green",
    pending: "bg-ds-bg-badge-pending text-ds-warning-orange",
  };

  return (
    <span
      className={`px-3 py-1 rounded-ds-button text-sm font-medium ${statusClasses[status]}`}
    >
      {children}
    </span>
  );
}
