import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { api } from "~/utils/api";

export default function Home() {
  return (
    <>
      <Link href="/dashboard">Go to dashboard</Link>
    </>
  );
}
