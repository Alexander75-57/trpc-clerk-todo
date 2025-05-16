'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-5xl font-bold">To-DO List</h1>
        <p className="text-xl mb-6">A simple todo app with tRPC and Clerk authentication</p>
        
        <div className="flex gap-4">
          <SignedIn>
            {/* Redirect to dashboard if signed in */}
            <Button asChild variant="default">
              <Link href="/dashboard">My Todo List</Link>
            </Button>
          </SignedIn>
          
          <SignedOut>
            {/* Redirect to sign-in if not signed in */}
            <Button asChild variant="default">
              <Link href="/sign-in">My Todo List</Link>
            </Button>
          </SignedOut>
        </div>
      </main>
    </div>
  );
}
