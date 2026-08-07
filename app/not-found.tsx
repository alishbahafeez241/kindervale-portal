import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <h1 className="text-3xl font-black text-brand-navy">Page not found</h1>
        <p className="mt-2 text-slate-500">This route does not exist in the school portal.</p>
        <Link href="/dashboard"><Button className="mt-5">Back to dashboard</Button></Link>
      </div>
    </main>
  );
}
