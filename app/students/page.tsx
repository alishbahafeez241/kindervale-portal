"use client";

import { useState } from "react";
import { ProtectedShell } from "@/components/layout/protected-shell";
import { DataTable } from "@/components/tables/data-table";
import { ErrorState, LoadingState } from "@/components/state/query-state";
import { Badge } from "@/components/ui/badge";
import { StudentIdCardModal } from "@/components/students/student-id-card-modal";
import { useStudents } from "@/services/student";
import type { Student } from "@/types";
import { Download } from "lucide-react";

export default function StudentsPage() {
  const { data: students = [], isLoading, error } = useStudents();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  return (
    <ProtectedShell title="Students">
      {isLoading ? (
        <LoadingState label="Loading students..." />
      ) : error ? (
        <ErrorState error={error} />
      ) : (
        <>
          <DataTable<Student>
            data={students}
            searchLabel="Search students"
            columns={[
              { key: "id", label: "ID" },
              { key: "name", label: "Name" },
              { key: "className", label: "Class" },
              { key: "age", label: "Age" },
              { key: "attendance", label: "Attendance", render: (row) => `${row.attendance}%` },
              { key: "parentName", label: "Parent" },
              {
                key: "feeStatus",
                label: "Fee",
                render: (row) => (
                  <Badge tone={row.feeStatus === "Paid" ? "ok" : row.feeStatus === "Partial" ? "warn" : "bad"}>
                    {row.feeStatus}
                  </Badge>
                )
              },
              {
                key: "actions",
                label: "ID Card",
                render: (row) => (
                  <button
                    onClick={() => setSelectedStudent(row)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-[#2e5a75] shadow-sm hover:bg-slate-50"
                  >
                    <Download className="h-3.5 w-3.5" />
                    ID Card
                  </button>
                )
              }
            ]}
          />

          {selectedStudent && (
            <StudentIdCardModal
              student={selectedStudent}
              isOpen={Boolean(selectedStudent)}
              onClose={() => setSelectedStudent(null)}
            />
          )}
        </>
      )}
    </ProtectedShell>
  );
}
