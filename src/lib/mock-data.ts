import { CallRecord, KpiData } from "@/types";

export const mockCalls: CallRecord[] = [
  { id: "CALL-001", dateTime: "2025-01-15T09:23:00Z", agentName: "Alice Johnson", customerName: "John Doe", customerId: "C-1001", duration: 342, sentimentScore: 0.72, sentiment: "positive", topics: ["Billing", "Upgrade"], status: "reviewed" },
  { id: "CALL-002", dateTime: "2025-01-15T10:05:00Z", agentName: "Bob Smith", customerName: "Jane Roe", customerId: "C-1002", duration: 189, sentimentScore: -0.45, sentiment: "negative", topics: ["Complaint", "Refund"], status: "flagged" },
  { id: "CALL-003", dateTime: "2025-01-15T11:30:00Z", agentName: "Carol Williams", customerName: "Mike Chen", customerId: "C-1003", duration: 456, sentimentScore: 0.15, sentiment: "neutral", topics: ["Technical Support"], status: "pending" },
  { id: "CALL-004", dateTime: "2025-01-16T08:45:00Z", agentName: "David Brown", customerName: "Sara Kim", customerId: "C-1004", duration: 278, sentimentScore: 0.88, sentiment: "positive", topics: ["Onboarding", "Account Setup"], status: "reviewed" },
  { id: "CALL-005", dateTime: "2025-01-16T09:12:00Z", agentName: "Eva Martinez", customerName: "Tom Baker", customerId: "C-1005", duration: 523, sentimentScore: -0.62, sentiment: "negative", topics: ["Cancellation", "Complaint"], status: "flagged" },
  { id: "CALL-006", dateTime: "2025-01-16T13:00:00Z", agentName: "Alice Johnson", customerName: "Lisa Wong", customerId: "C-1006", duration: 167, sentimentScore: 0.55, sentiment: "positive", topics: ["Feedback"], status: "reviewed" },
  { id: "CALL-007", dateTime: "2025-01-17T10:20:00Z", agentName: "Bob Smith", customerName: "Chris Lee", customerId: "C-1007", duration: 390, sentimentScore: 0.05, sentiment: "neutral", topics: ["Technical Support", "Feature Request"], status: "pending" },
  { id: "CALL-008", dateTime: "2025-01-17T11:45:00Z", agentName: "Carol Williams", customerName: "Amy Davis", customerId: "C-1008", duration: 234, sentimentScore: 0.41, sentiment: "positive", topics: ["Billing"], status: "reviewed" },
  { id: "CALL-009", dateTime: "2025-01-17T14:30:00Z", agentName: "David Brown", customerName: "Ryan Moore", customerId: "C-1009", duration: 612, sentimentScore: -0.78, sentiment: "negative", topics: ["Complaint", "Cancellation", "Refund"], status: "flagged" },
  { id: "CALL-010", dateTime: "2025-01-18T09:00:00Z", agentName: "Eva Martinez", customerName: "Nina Patel", customerId: "C-1010", duration: 145, sentimentScore: 0.33, sentiment: "positive", topics: ["Account Setup"], status: "reviewed" },
  { id: "CALL-011", dateTime: "2025-01-18T10:15:00Z", agentName: "Alice Johnson", customerName: "John Doe", customerId: "C-1001", duration: 298, sentimentScore: -0.12, sentiment: "neutral", topics: ["Billing", "Refund"], status: "pending" },
  { id: "CALL-012", dateTime: "2025-01-18T11:40:00Z", agentName: "Bob Smith", customerName: "Sara Kim", customerId: "C-1004", duration: 467, sentimentScore: 0.67, sentiment: "positive", topics: ["Upgrade", "Feature Request"], status: "reviewed" },
  { id: "CALL-013", dateTime: "2025-01-19T08:30:00Z", agentName: "Carol Williams", customerName: "Tom Baker", customerId: "C-1005", duration: 321, sentimentScore: -0.35, sentiment: "negative", topics: ["Technical Support", "Complaint"], status: "flagged" },
  { id: "CALL-014", dateTime: "2025-01-19T09:50:00Z", agentName: "David Brown", customerName: "Lisa Wong", customerId: "C-1006", duration: 189, sentimentScore: 0.22, sentiment: "neutral", topics: ["Feedback"], status: "pending" },
  { id: "CALL-015", dateTime: "2025-01-19T14:10:00Z", agentName: "Eva Martinez", customerName: "Chris Lee", customerId: "C-1007", duration: 534, sentimentScore: 0.81, sentiment: "positive", topics: ["Onboarding", "Account Setup"], status: "reviewed" },
  { id: "CALL-016", dateTime: "2025-01-20T09:05:00Z", agentName: "Alice Johnson", customerName: "Amy Davis", customerId: "C-1008", duration: 256, sentimentScore: -0.51, sentiment: "negative", topics: ["Cancellation"], status: "flagged" },
  { id: "CALL-017", dateTime: "2025-01-20T10:30:00Z", agentName: "Bob Smith", customerName: "Ryan Moore", customerId: "C-1009", duration: 178, sentimentScore: 0.45, sentiment: "positive", topics: ["Billing", "Upgrade"], status: "reviewed" },
  { id: "CALL-018", dateTime: "2025-01-20T13:15:00Z", agentName: "Carol Williams", customerName: "Nina Patel", customerId: "C-1010", duration: 403, sentimentScore: 0.08, sentiment: "neutral", topics: ["Technical Support"], status: "pending" },
  { id: "CALL-019", dateTime: "2025-01-21T08:20:00Z", agentName: "David Brown", customerName: "Jane Roe", customerId: "C-1002", duration: 567, sentimentScore: -0.41, sentiment: "negative", topics: ["Complaint", "Refund"], status: "flagged" },
  { id: "CALL-020", dateTime: "2025-01-21T11:00:00Z", agentName: "Eva Martinez", customerName: "Mike Chen", customerId: "C-1003", duration: 234, sentimentScore: 0.59, sentiment: "positive", topics: ["Feature Request", "Feedback"], status: "reviewed" },
  { id: "CALL-021", dateTime: "2025-01-21T14:45:00Z", agentName: "Alice Johnson", customerName: "Sara Kim", customerId: "C-1004", duration: 312, sentimentScore: 0.18, sentiment: "neutral", topics: ["Account Setup"], status: "pending" },
  { id: "CALL-022", dateTime: "2025-01-22T09:30:00Z", agentName: "Bob Smith", customerName: "Tom Baker", customerId: "C-1005", duration: 445, sentimentScore: 0.73, sentiment: "positive", topics: ["Upgrade", "Onboarding"], status: "reviewed" },
  { id: "CALL-023", dateTime: "2025-01-22T10:50:00Z", agentName: "Carol Williams", customerName: "John Doe", customerId: "C-1001", duration: 198, sentimentScore: -0.55, sentiment: "negative", topics: ["Billing", "Complaint"], status: "flagged" },
  { id: "CALL-024", dateTime: "2025-01-22T13:20:00Z", agentName: "David Brown", customerName: "Lisa Wong", customerId: "C-1006", duration: 376, sentimentScore: 0.28, sentiment: "neutral", topics: ["Technical Support", "Feature Request"], status: "pending" },
  { id: "CALL-025", dateTime: "2025-01-22T15:00:00Z", agentName: "Eva Martinez", customerName: "Amy Davis", customerId: "C-1008", duration: 289, sentimentScore: 0.64, sentiment: "positive", topics: ["Feedback", "Upgrade"], status: "reviewed" },
];

export function computeKpis(calls: CallRecord[]): KpiData {
  const totalCalls = calls.length;
  const avgSentiment =
    totalCalls > 0
      ? calls.reduce((sum, c) => sum + c.sentimentScore, 0) / totalCalls
      : 0;
  const avgDuration =
    totalCalls > 0
      ? calls.reduce((sum, c) => sum + c.duration, 0) / totalCalls
      : 0;
  const flaggedCalls = calls.filter((c) => c.status === "flagged").length;

  return {
    totalCalls,
    avgSentiment: Math.round(avgSentiment * 100) / 100,
    avgDuration: Math.round(avgDuration),
    flaggedCalls,
  };
}

export const mockKpis: KpiData = computeKpis(mockCalls);
