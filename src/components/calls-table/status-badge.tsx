import { Badge } from "@/components/ui/badge";
import { CallStatus } from "@/types";
import { cn } from "@/lib/utils";

const statusConfig: Record<CallStatus, { label: string; className: string }> = {
  reviewed: {
    label: "Reviewed",
    className:
      "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300",
  },
  pending: {
    label: "Pending",
    className:
      "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300",
  },
  flagged: {
    label: "Flagged",
    className:
      "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-300",
  },
};

interface StatusBadgeProps {
  status: CallStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <Badge variant="secondary" className={cn(config.className)}>
      {config.label}
    </Badge>
  );
}
