import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  const isPublicPath = currentPath === '/login' || currentPath === '/sign-up';
  const token = request.cookies.get('token')?.value || '';

  // if user is already logged in (has token), then redirect the motherlover.
  if (isPublicPath && token)
    return NextResponse.redirect(new URL('/', request.nextUrl));

  // if user is not logged in and accessing a private route
  if (!isPublicPath && !token)
    return NextResponse.redirect(new URL('/login', request.nextUrl));
}

export const config = {
  matcher: ['/', '/profile', '/profile/:id*', '/login', '/sign-up'],
};

// Mathing Paths - list of paths on which you run the middleware.
// middleware runs code before the REQUESTS are executed.

// PUBLIC and PROTECTED PATHS.
// if user has token - public paths shouldn't be visible.
// if user doesn't have token - protected paths shouldn't be visible.

/* 
 Rewrites allow you to map an incoming request path to a different destination path. 
 Rewrites act as a URL proxy and mask the destination path, making it appear the user 
 hasn't changed their location on the site. 
 In contrast, redirects will reroute to a new page and show the URL changes.
*/
