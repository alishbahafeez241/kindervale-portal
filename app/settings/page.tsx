"use client";

import { ProtectedShell } from "@/components/layout/protected-shell";
import { ErrorState, LoadingState, EmptyState } from "@/components/state/query-state";
import { Card } from "@/components/ui/card";
import { useSettings } from "@/services/settings";

export default function SettingsPage() {
  const { data: settings, isLoading, error } = useSettings();

  return (
    <ProtectedShell title="Settings">
      {isLoading ? <LoadingState label="Loading settings..." /> : error ? <ErrorState error={error} /> : settings ? (
      <Card>
        <dl className="grid gap-4 md:grid-cols-3">
          <div>
            <dt className="text-xs font-black uppercase text-slate-500">School</dt>
            <dd className="mt-1 font-bold text-brand-navy">{settings.schoolName}</dd>
          </div>
          <div>
            <dt className="text-xs font-black uppercase text-slate-500">Academic Year</dt>
            <dd className="mt-1 font-bold text-brand-navy">{settings.academicYear}</dd>
          </div>
          <div>
            <dt className="text-xs font-black uppercase text-slate-500">Timezone</dt>
            <dd className="mt-1 font-bold text-brand-navy">{settings.timezone}</dd>
          </div>
        </dl>
      </Card>
      ) : <EmptyState label="No settings found." />}
    </ProtectedShell>
  );
}
