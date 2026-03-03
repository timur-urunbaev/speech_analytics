"use client";

import { useState, useRef, useTransition, useCallback, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "./date-range-picker";
import { DateRange } from "react-day-picker";
import { Sentiment, CallStatus } from "@/types";

interface FiltersBarProps {
  agents: string[];
}

export function FiltersBar({ agents }: FiltersBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const searchParam = searchParams.get("search") ?? "";
  const dateFrom = searchParams.get("dateFrom");
  const dateTo = searchParams.get("dateTo");
  const sentimentParam = (searchParams.get("sentiment") ?? "all") as Sentiment | "all";
  const agentParam = searchParams.get("agent") ?? "all";
  const statusParam = (searchParams.get("status") ?? "all") as CallStatus | "all";

  const [localSearch, setLocalSearch] = useState(searchParam);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync local search if URL changes externally (e.g., browser back/forward)
  useEffect(() => {
    setLocalSearch(searchParam);
  }, [searchParam]);

  const dateRange: DateRange | undefined = dateFrom
    ? {
        from: new Date(dateFrom + "T00:00:00"),
        to: dateTo ? new Date(dateTo + "T00:00:00") : undefined,
      }
    : undefined;

  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === undefined || value === "all" || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }
      const query = params.toString();
      startTransition(() => {
        router.push(pathname + (query ? "?" + query : ""));
      });
    },
    [pathname, router, searchParams]
  );

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateParams({ search: value || undefined });
    }, 400);
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    updateParams({
      dateFrom: range?.from ? format(range.from, "yyyy-MM-dd") : undefined,
      dateTo: range?.to ? format(range.to, "yyyy-MM-dd") : undefined,
    });
  };

  return (
    <div
      className="flex flex-wrap items-center gap-3"
      style={{ opacity: isPending ? 0.6 : 1, transition: "opacity 0.2s" }}
    >
      <Input
        placeholder="Search calls..."
        value={localSearch}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="w-[200px]"
      />
      <DateRangePicker
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
      />
      <Select
        value={sentimentParam}
        onValueChange={(v) => updateParams({ sentiment: v })}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Sentiment" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sentiments</SelectItem>
          <SelectItem value="positive">Positive</SelectItem>
          <SelectItem value="neutral">Neutral</SelectItem>
          <SelectItem value="negative">Negative</SelectItem>
        </SelectContent>
      </Select>
      <Select value={agentParam} onValueChange={(v) => updateParams({ agent: v })}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Agent" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Agents</SelectItem>
          {agents.map((a) => (
            <SelectItem key={a} value={a}>
              {a}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={statusParam}
        onValueChange={(v) => updateParams({ status: v })}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="reviewed">Reviewed</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="flagged">Flagged</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
