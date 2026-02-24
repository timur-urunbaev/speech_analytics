"use client";

import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { mockCalls, computeKpis } from "@/lib/mock-data";
import { CallStatus, Sentiment } from "@/types";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { FiltersBar } from "@/components/dashboard/filters-bar";
import { DataTable } from "@/components/calls-table/data-table";
import { columns } from "@/components/calls-table/columns";

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [sentiment, setSentiment] = useState<Sentiment | "all">("all");
  const [agent, setAgent] = useState("all");
  const [status, setStatus] = useState<CallStatus | "all">("all");

  const agents = useMemo(
    () => Array.from(new Set(mockCalls.map((c) => c.agentName))).sort(),
    []
  );

  const filteredCalls = useMemo(() => {
    return mockCalls.filter((call) => {
      // Search filter
      if (search) {
        const q = search.toLowerCase();
        const searchable = [
          call.agentName,
          call.customerName,
          call.customerId,
          call.id,
          ...call.topics,
        ]
          .join(" ")
          .toLowerCase();
        if (!searchable.includes(q)) return false;
      }

      // Date range filter
      if (dateRange?.from) {
        const callDate = new Date(call.dateTime);
        if (callDate < dateRange.from) return false;
        if (dateRange.to) {
          const endOfDay = new Date(dateRange.to);
          endOfDay.setHours(23, 59, 59, 999);
          if (callDate > endOfDay) return false;
        }
      }

      // Sentiment filter
      if (sentiment !== "all" && call.sentiment !== sentiment) return false;

      // Agent filter
      if (agent !== "all" && call.agentName !== agent) return false;

      // Status filter
      if (status !== "all" && call.status !== status) return false;

      return true;
    });
  }, [search, dateRange, sentiment, agent, status]);

  const kpis = useMemo(() => computeKpis(filteredCalls), [filteredCalls]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of call analytics and performance metrics.
        </p>
      </div>

      <KpiCards data={kpis} />

      <FiltersBar
        search={search}
        onSearchChange={setSearch}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        sentiment={sentiment}
        onSentimentChange={setSentiment}
        agent={agent}
        onAgentChange={setAgent}
        status={status}
        onStatusChange={setStatus}
        agents={agents}
      />

      <DataTable columns={columns} data={filteredCalls} />
    </div>
  );
}
