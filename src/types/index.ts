export type Sentiment = "positive" | "neutral" | "negative";

export type CallStatus = "reviewed" | "pending" | "flagged";

export interface CallRecord {
  id: string;
  dateTime: string; // ISO string
  agentName: string;
  customerName: string;
  customerId: string;
  duration: number; // seconds
  sentimentScore: number; // -1 to 1
  sentiment: Sentiment;
  topics: string[];
  status: CallStatus;
}

export interface KpiData {
  totalCalls: number;
  avgSentiment: number;
  avgDuration: number; // seconds
  flaggedCalls: number;
}
