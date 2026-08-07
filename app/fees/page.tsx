"use client";

import { ProtectedShell } from "@/components/layout/protected-shell";
import { DataTable } from "@/components/tables/data-table";
import { ErrorState, LoadingState } from "@/components/state/query-state";
import { Badge } from "@/components/ui/badge";
import { useFees } from "@/services/fees";
import { useStudents } from "@/services/student";
import type { Fee } from "@/types";
import { money, prettyDate } from "@/utils/format";

export default function FeesPage() {
  const feesQuery = useFees();
  const studentsQuery = useStudents();
  const students = studentsQuery.data ?? [];

  return (
    <ProtectedShell title="Fees">
      {feesQuery.isLoading || studentsQuery.isLoading ? <LoadingState label="Loading fees..." /> : feesQuery.error ? <ErrorState error={feesQuery.error} /> : studentsQuery.error ? <ErrorState error={studentsQuery.error} /> : (
      <DataTable<Fee>
        data={feesQuery.data ?? []}
        columns={[
          { key: "invoice", label: "Invoice" },
          { key: "studentId", label: "Student", render: (row) => students.find((student) => student.id === row.studentId)?.name ?? row.studentId },
          { key: "amount", label: "Amount", render: (row) => money(row.amount) },
          { key: "dueDate", label: "Due", render: (row) => prettyDate(row.dueDate) },
          { key: "status", label: "Status", render: (row) => <Badge tone={row.status === "Paid" ? "ok" : row.status === "Partial" ? "warn" : "bad"}>{row.status}</Badge> }
        ]}
      />
      )}
    </ProtectedShell>
  );
}
