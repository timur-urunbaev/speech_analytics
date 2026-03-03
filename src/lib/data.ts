import { createServerClient } from "@/lib/supabase/server";
import { CallRecord, KpiData, Sentiment, CallStatus } from "@/types";

export interface CallFilters {
  search?: string;
  dateFrom?: string; // YYYY-MM-DD
  dateTo?: string; // YYYY-MM-DD
  sentiment?: Sentiment | "all";
  agent?: string;
  status?: CallStatus | "all";
}

function mapRowToCallRecord(row: Record<string, unknown>): CallRecord {
  return {
    id: row.id as string,
    dateTime: row.date_time as string,
    agentName: row.agent_name as string,
    customerName: row.customer_name as string,
    customerId: row.customer_id as string,
    duration: row.duration as number,
    sentimentScore: row.sentiment_score as number,
    sentiment: row.sentiment as Sentiment,
    topics: row.topics as string[],
    status: row.status as CallStatus,
  };
}

function applyFilters(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: any,
  filters: CallFilters
) {
  if (filters.search) {
    const q = `%${filters.search}%`;
    query = query.or(
      `agent_name.ilike.${q},customer_name.ilike.${q},customer_id.ilike.${q},id.ilike.${q}`
    );
  }

  if (filters.dateFrom) {
    query = query.gte("date_time", filters.dateFrom + "T00:00:00");
  }

  if (filters.dateTo) {
    query = query.lte("date_time", filters.dateTo + "T23:59:59");
  }

  if (filters.sentiment && filters.sentiment !== "all") {
    query = query.eq("sentiment", filters.sentiment);
  }

  if (filters.agent && filters.agent !== "all") {
    query = query.eq("agent_name", filters.agent);
  }

  if (filters.status && filters.status !== "all") {
    query = query.eq("status", filters.status);
  }

  return query;
}

export async function getCalls(filters: CallFilters = {}): Promise<CallRecord[]> {
  const supabase = createServerClient();
  let query = supabase.from("calls").select("*");
  query = applyFilters(query, filters);
  query = query.order("date_time", { ascending: false });

  const { data, error } = await query;
  if (error) throw new Error(`getCalls failed: ${error.message}`);

  return (data as Record<string, unknown>[]).map(mapRowToCallRecord);
}

export async function getKpis(filters: CallFilters = {}): Promise<KpiData> {
  const supabase = createServerClient();
  let query = supabase.from("calls").select("duration, sentiment_score, status");
  query = applyFilters(query, filters);

  const { data, error } = await query;
  if (error) throw new Error(`getKpis failed: ${error.message}`);

  const rows = data as { duration: number; sentiment_score: number; status: string }[];
  const totalCalls = rows.length;
  const avgSentiment =
    totalCalls > 0
      ? Math.round((rows.reduce((s, r) => s + r.sentiment_score, 0) / totalCalls) * 100) / 100
      : 0;
  const avgDuration =
    totalCalls > 0
      ? Math.round(rows.reduce((s, r) => s + r.duration, 0) / totalCalls)
      : 0;
  const flaggedCalls = rows.filter((r) => r.status === "flagged").length;

  return { totalCalls, avgSentiment, avgDuration, flaggedCalls };
}

export async function getAgentNames(): Promise<string[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase.from("calls").select("agent_name");
  if (error) throw new Error(`getAgentNames failed: ${error.message}`);

  const names = (data as { agent_name: string }[]).map((r) => r.agent_name);
  return Array.from(new Set(names)).sort();
}
