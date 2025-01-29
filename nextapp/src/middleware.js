"use server"
import { NextResponse } from 'next/server';
import { verifyUser } from '@/lib/verifyUser';

export const config = {
  runtime: 'nodejs',
  matcher: [], // Apply to /api/ and its subpaths
};

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Skip middleware for public or specific routes
  if (pathname.startsWith('/public') || pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Extract the token from the Authorization header
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.split(' ')[1]; // Assuming 'Bearer <token>' format

  if (!token) {
    return NextResponse.json(
      { message: 'Unauthorized', success: false },
      { status: 401 }
    );
  }

  try {
    const user = await verifyUser(token); // Fetch user details from the token
    if (!user) {
      return NextResponse.redirect(new URL('/auth/login', request.url)); // Redirect if user not found
    }
    // Add user details to the response headers as JSON
    const response = NextResponse.next();
    console.log(pathname);
    return response;
  } catch (error) {
    console.error('JWT Verification Error:', error);
    return NextResponse.json({ success: false, message: "Unauthorized Access" }, { status: 401 }); // Redirect on verification failure
  }
}
