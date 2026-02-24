"use client";

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
  search: string;
  onSearchChange: (value: string) => void;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  sentiment: Sentiment | "all";
  onSentimentChange: (value: Sentiment | "all") => void;
  agent: string;
  onAgentChange: (value: string) => void;
  status: CallStatus | "all";
  onStatusChange: (value: CallStatus | "all") => void;
  agents: string[];
}

export function FiltersBar({
  search,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  sentiment,
  onSentimentChange,
  agent,
  onAgentChange,
  status,
  onStatusChange,
  agents,
}: FiltersBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Input
        placeholder="Search calls..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-[200px]"
      />
      <DateRangePicker
        dateRange={dateRange}
        onDateRangeChange={onDateRangeChange}
      />
      <Select
        value={sentiment}
        onValueChange={(v) => onSentimentChange(v as Sentiment | "all")}
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
      <Select
        value={agent}
        onValueChange={onAgentChange}
      >
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
        value={status}
        onValueChange={(v) => onStatusChange(v as CallStatus | "all")}
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
