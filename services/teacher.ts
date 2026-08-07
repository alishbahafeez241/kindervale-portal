import { queryKeys } from "@/services/query-keys";
import { useCreateResource, useDeleteResource, useResourceList, useUpdateResource } from "@/services/resource-hooks";
import type { Teacher } from "@/types";

export type TeacherPayload = Partial<Omit<Teacher, "id" | "name" | "email" | "attendance">> & {
  userId?: string;
  attendance?: "PRESENT" | "LATE" | "ABSENT";
};

function attendanceLabel(status: string | undefined): Teacher["attendance"] {
  if (status === "LATE" || status === "Late") return "Late";
  if (status === "ABSENT" || status === "Absent") return "Absent";
  return "Present";
}

export function mapTeacher(row: Record<string, unknown>): Teacher {
  return {
    id: String(row.id),
    // TODO: Backend /teachers returns userId but not linked user name/email. Use user details here when that endpoint includes them.
    name: String(row.name ?? row.userId ?? ""),
    email: String(row.email ?? ""),
    phone: String(row.phone ?? ""),
    subject: String(row.subject ?? ""),
    className: String(row.className ?? ""),
    attendance: attendanceLabel(String(row.attendance ?? "PRESENT"))
  };
}

export function useTeachers() {
  return useResourceList<Record<string, unknown>, Teacher[]>(queryKeys.teachers, "/teachers", {
    params: { page: 1, limit: 10 },
    select: (items) => items?.map(mapTeacher) ?? undefined
  });
}

export const useCreateTeacher = () => useCreateResource<Teacher, TeacherPayload>(queryKeys.teachers, "/teachers");
export const useUpdateTeacher = () => useUpdateResource<Teacher, TeacherPayload>(queryKeys.teachers, "/teachers");
export const useDeleteTeacher = () => useDeleteResource(queryKeys.teachers, "/teachers");
