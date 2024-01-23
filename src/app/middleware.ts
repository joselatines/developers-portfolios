import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
    const getMethod = req.method === 'GET'
    if(!getMethod) {
        return Response.json(
            { success: false, message: 'authentication failed' },
            { status: 401 }
          )
        }
    }

 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/',
}