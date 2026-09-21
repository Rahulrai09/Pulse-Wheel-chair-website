import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const ADMIN_AUTH_PAGES = ["/admin/login", "/admin/forgot-password", "/admin/reset-password"];
const CUSTOMER_AUTH_PAGES = ["/account/login", "/account/signup"];
const CUSTOMER_PROTECTED_PAGES = ["/checkout", "/account/orders"];

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

  // ---- Admin routes (unchanged) ----
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

  // ---- Customer routes (checkout + order history require login) ----
  if (CUSTOMER_PROTECTED_PAGES.some((p) => pathname.startsWith(p)) && !user) {
    const loginUrl = new URL("/account/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (CUSTOMER_AUTH_PAGES.includes(pathname) && user) {
    return NextResponse.redirect(new URL("/account/orders", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/checkout"],
};
