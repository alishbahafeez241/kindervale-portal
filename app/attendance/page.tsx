"use client";

import { ProtectedShell } from "@/components/layout/protected-shell";
import { ErrorState, LoadingState } from "@/components/state/query-state";
import { Card } from "@/components/ui/card";
import { useStudents } from "@/services/student";
import { useTeachers } from "@/services/teacher";

export default function AttendancePage() {
  const studentsQuery = useStudents();
  const teachersQuery = useTeachers();

  return (
    <ProtectedShell title="Attendance">
      {studentsQuery.isLoading || teachersQuery.isLoading ? <LoadingState label="Loading attendance..." /> : studentsQuery.error ? <ErrorState error={studentsQuery.error} /> : teachersQuery.error ? <ErrorState error={teachersQuery.error} /> : (
      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-lg font-black text-brand-navy">Student Attendance</h2>
          <div className="space-y-3">
            {studentsQuery.data.length ? studentsQuery.data.map((student) => (
              <div key={student.id} className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                <span className="font-bold">{student.name}</span>
                <span className="font-black text-brand-navy">{student.attendance}%</span>
              </div>
            )) : <p className="text-sm font-semibold text-slate-500">No students found.</p>}
          </div>
        </Card>
        <Card>
          <h2 className="mb-4 text-lg font-black text-brand-navy">Staff Attendance</h2>
          <div className="space-y-3">
            {teachersQuery.data.length ? teachersQuery.data.map((teacher) => (
              <div key={teacher.id} className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                <span className="font-bold">{teacher.name}</span>
                <span className="font-black text-brand-navy">{teacher.attendance}</span>
              </div>
            )) : <p className="text-sm font-semibold text-slate-500">No teachers found.</p>}
          </div>
        </Card>
      </div>
      )}
    </ProtectedShell>
  );
}
