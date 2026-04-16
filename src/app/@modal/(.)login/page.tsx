"use client";

import { LoginModal } from "@/components/LoginModal";
import { useRouter } from "next/navigation";

export default function LoginIntercept() {
  const router = useRouter();

  return <LoginModal onDismiss={() => router.back()} />;
}
