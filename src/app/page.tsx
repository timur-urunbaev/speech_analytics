import { Suspense } from "react";
import { Sentiment, CallStatus } from "@/types";
import { getCalls, getKpis, getAgentNames, CallFilters } from "@/lib/data";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { FiltersBar } from "@/components/dashboard/filters-bar";
import { DataTable } from "@/components/calls-table/data-table";
import { columns } from "@/components/calls-table/columns";

function FiltersBarSkeleton() {
  return <div className="h-10 w-full animate-pulse rounded bg-muted" />;
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  const filters: CallFilters = {
    search: typeof params.search === "string" ? params.search : undefined,
    dateFrom: typeof params.dateFrom === "string" ? params.dateFrom : undefined,
    dateTo: typeof params.dateTo === "string" ? params.dateTo : undefined,
    sentiment:
      typeof params.sentiment === "string"
        ? (params.sentiment as Sentiment | "all")
        : undefined,
    agent: typeof params.agent === "string" ? params.agent : undefined,
    status:
      typeof params.status === "string"
        ? (params.status as CallStatus | "all")
        : undefined,
  };

  const [calls, kpis, agents] = await Promise.all([
    getCalls(filters),
    getKpis(filters),
    getAgentNames(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of call analytics and performance metrics.
        </p>
      </div>

      <KpiCards data={kpis} />

      <Suspense fallback={<FiltersBarSkeleton />}>
        <FiltersBar agents={agents} />
      </Suspense>

      <DataTable columns={columns} data={calls} />
    </div>
  );
}
