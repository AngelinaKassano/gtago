// middleware.ts
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'], // тут писать пути которые мы хотим защитить -профили. админки и т.д
};