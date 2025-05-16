import { NextRequest } from 'next/server';

/* export async function GET(req: NextRequest){
    console.log('GET request to Clerk Webhook');
    return new Response('GET request to Clerk Webhook', { status: 200 });
} */

export async function POST(req: NextRequest){
    const json = await req.json();
    console.log(json);
    return new Response('', { status: 200 });
}