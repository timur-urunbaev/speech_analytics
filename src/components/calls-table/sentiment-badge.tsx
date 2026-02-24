import { Badge } from "@/components/ui/badge";
import { Sentiment } from "@/types";
import { cn } from "@/lib/utils";

const sentimentConfig: Record<Sentiment, { label: string; className: string }> =
  {
    positive: {
      label: "Positive",
      className:
        "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300",
    },
    neutral: {
      label: "Neutral",
      className:
        "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300",
    },
    negative: {
      label: "Negative",
      className:
        "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-300",
    },
  };

interface SentimentBadgeProps {
  sentiment: Sentiment;
}

export function SentimentBadge({ sentiment }: SentimentBadgeProps) {
  const config = sentimentConfig[sentiment];
  return (
    <Badge variant="secondary" className={cn(config.className)}>
      {config.label}
    </Badge>
  );
}
