import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { auth } from './lib/auth';

export async function proxy(request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } catch (error) {
    console.error('Session check failed:', error);
    // corrupt cookie হলেও crash না করে login এ পাঠিয়ে দাও
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('better-auth.session_token');
    return response;
  }
}

export const config = {
  matcher: ['/rooms/:path*', '/my-bookings', '/my-listings', '/add-room', '/profile'],
};