import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const hostname = request.headers.get("host") || "";

    // Check if we are on the admin subdomain (e.g. admin.deepanshukumar.com or admin.localhost:3000)
    const isAdminSubdomain = hostname.startsWith("admin.");

    if (isAdminSubdomain) {
        // We are on the admin subdomain.
        // Rewrite requests to the `/admin` path (where the admin app lives).
        // For example:
        // - admin.domain.com/ -> rewrites to /admin
        // - admin.domain.com/foobar -> rewrites to /admin/foobar (though /admin is an SPA, so likely mostly root)

        // Avoid double-rewriting if internal routing somehow requests /admin explicitly
        if (!url.pathname.startsWith("/admin")) {
            // Construct the new URL path pointing to the admin directory
            url.pathname = `/admin${url.pathname}`;
            return NextResponse.rewrite(url);
        }
    } else {
        // We are on the main domain (e.g. deepanshukumar.com)
        // Prevent access to the /admin route directly
        if (url.pathname.startsWith("/admin")) {
            url.pathname = "/404";
            return NextResponse.rewrite(url);
        }
    }

    // If NOT on admin subdomain (e.g. deepanshukumar.com), allow normal traffic.
    // This will serve `app/page.tsx` at `/` and other routes normally.

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (files with extensions)
         */
        "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
    ],
};
