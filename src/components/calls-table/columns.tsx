"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CallRecord } from "@/types";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SentimentBadge } from "./sentiment-badge";
import { StatusBadge } from "./status-badge";

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function SortableHeader({
  column,
  label,
}: {
  column: { getIsSorted: () => false | "asc" | "desc"; toggleSorting: (desc?: boolean) => void };
  label: string;
}) {
  const sorted = column.getIsSorted();
  return (
    <Button
      variant="ghost"
      className="-ml-4"
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      {label}
      {sorted === "asc" && <span className="ml-1">&uarr;</span>}
      {sorted === "desc" && <span className="ml-1">&darr;</span>}
      {!sorted && <span className="ml-1 text-muted-foreground/50">&updownarrow;</span>}
    </Button>
  );
}

export const columns: ColumnDef<CallRecord>[] = [
  {
    accessorKey: "dateTime",
    header: ({ column }) => <SortableHeader column={column} label="Дата / Время" />,
    cell: ({ row }) => format(new Date(row.getValue("dateTime")), "MMM d, yyyy HH:mm"),
  },
  {
    accessorKey: "agentName",
    header: ({ column }) => <SortableHeader column={column} label="Оператор" />,
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => <SortableHeader column={column} label="Клиент" />,
  },
  {
    accessorKey: "duration",
    header: ({ column }) => <SortableHeader column={column} label="Длительность" />,
    cell: ({ row }) => formatDuration(row.getValue("duration")),
  },
  {
    accessorKey: "sentiment",
    header: "Эмоции",
    cell: ({ row }) => <SentimentBadge sentiment={row.getValue("sentiment")} />,
  },
  {
    accessorKey: "topics",
    header: "Причина",
    cell: ({ row }) => {
      const topics: string[] = row.getValue("topics");
      return (
        <div className="flex flex-wrap gap-1">
          {topics.map((topic) => (
            <Badge key={topic} variant="outline" className="text-xs">
              {topic}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Play Recording</DropdownMenuItem>
            <DropdownMenuItem>View Transcript</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
