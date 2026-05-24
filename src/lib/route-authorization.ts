export type ProtectedUserRole = "STUDENT" | "ORGANIZER" | "ADMIN";

type RouteAuthorizationInput = {
  path: string;
  user?: {
    role?: ProtectedUserRole;
  } | null;
};

export type RouteAuthorizationDecision =
  | {
      action: "allow";
    }
  | {
      action: "redirect";
      destination: "/login" | "/dashboard" | "/unauthorized";
      callbackUrl?: string;
    };

function isStudentProtectedArea(path: string) {
  return (
    path.startsWith("/home") ||
    path.startsWith("/discover") ||
    path.startsWith("/passport") ||
    path.startsWith("/profile") ||
    path.startsWith("/search") ||
    path.startsWith("/notifications") ||
    path.startsWith("/tickets")
  );
}

export function resolveRouteAuthorization(input: RouteAuthorizationInput): RouteAuthorizationDecision {
  const path = input.path;
  const role = input.user?.role;
  const isDashboard = path.startsWith("/dashboard");
  const isAdmin = path.startsWith("/admin");
  const isStudentArea = isStudentProtectedArea(path);

  if (!isDashboard && !isAdmin && !isStudentArea) {
    return { action: "allow" };
  }

  if (!input.user) {
    return {
      action: "redirect",
      destination: "/login",
      callbackUrl: path,
    };
  }

  if (isStudentArea && (role === "ADMIN" || role === "ORGANIZER")) {
    return {
      action: "redirect",
      destination: "/dashboard",
    };
  }

  if (isDashboard && role !== "ORGANIZER" && role !== "ADMIN") {
    return {
      action: "redirect",
      destination: "/unauthorized",
    };
  }

  if (isAdmin && role !== "ADMIN") {
    return {
      action: "redirect",
      destination: "/unauthorized",
    };
  }

  return { action: "allow" };
}
