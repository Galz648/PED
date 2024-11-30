export function GET(request: Request) {
    return new Response(`Hello from ${process.env.VERCEL_REGION}`);
}
export function POST(request: Request) {
    // Return simple text response
    // return new Response(`Hello from ${process.env.VERCEL_REGION}`);
    
    // Return JSON response
    return new Response(JSON.stringify({
        message: `Hello from ${process.env.VERCEL_REGION}`,
        timestamp: new Date().toISOString()
    }), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
}




