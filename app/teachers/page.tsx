"use client";

import { ProtectedShell } from "@/components/layout/protected-shell";
import { DataTable } from "@/components/tables/data-table";
import { ErrorState, LoadingState } from "@/components/state/query-state";
import { Badge } from "@/components/ui/badge";
import { useTeachers } from "@/services/teacher";
import type { Teacher } from "@/types";

export default function TeachersPage() {
  const { data: teachers, isLoading, error } = useTeachers();

  return (
    <ProtectedShell title="Teachers">
      {isLoading ? <LoadingState label="Loading teachers..." /> : error ? <ErrorState error={error} /> : (
      <DataTable<Teacher>
        data={teachers}
        searchLabel="Search teachers"
        columns={[
          { key: "name", label: "Name" },
          { key: "subject", label: "Subject" },
          { key: "className", label: "Class" },
          { key: "phone", label: "Phone" },
          { key: "attendance", label: "Attendance", render: (row) => <Badge tone={row.attendance === "Present" ? "ok" : row.attendance === "Late" ? "warn" : "bad"}>{row.attendance}</Badge> }
        ]}
      />
      )}
    </ProtectedShell>
  );
}
