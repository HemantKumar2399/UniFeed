"use client";

import { LoginModal } from "@/components/LoginModal";
import Home from "../page";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <>
      <Home />
      <LoginModal onDismiss={() => router.push("/")} />
    </>
  );
}
