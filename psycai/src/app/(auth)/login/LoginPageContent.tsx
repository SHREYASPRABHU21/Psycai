"use client"

import { useSearchParams } from "next/navigation"
import LoginForm from "./LoginForm"

export default function LoginPageContent() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") || "/tools"

  return <LoginForm redirectTo={redirectTo} />
}
