import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const ADMIN_AUTH_PAGES = ["/admin/login", "/admin/forgot-password", "/admin/reset-password"];
const ACCOUNT_AUTH_PAGES = [
  "/account/login",
  "/account/signup",
  "/account/forgot-password",
  "/account/reset-password",
];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  response.headers.set("x-pathname", request.nextUrl.pathname);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          response.headers.set("x-pathname", request.nextUrl.pathname);
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminAuthPage = ADMIN_AUTH_PAGES.includes(pathname);
  const isAccountRoute = pathname.startsWith("/account");
  const isAccountAuthPage = ACCOUNT_AUTH_PAGES.includes(pathname);

  // --- Admin routes ---
  if (isAdminRoute && !isAdminAuthPage) {
    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single();

    if (!profile?.is_admin) {
      await supabase.auth.signOut();
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("error", "not-authorized");
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname === "/admin/login" && user) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // --- Customer account routes ---
  if (isAccountRoute && !isAccountAuthPage) {
    if (!user) {
      return NextResponse.redirect(new URL("/account/login", request.url));
    }
  }

  // Already-signed-in customers don't need the login/signup screens again.
  // (forgot-password/reset-password stay accessible even mid-session, since
  // a password recovery link creates its own temporary session.)
  if ((pathname === "/account/login" || pathname === "/account/signup") && user) {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
};
