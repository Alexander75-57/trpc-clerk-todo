'use client';

import {trpc} from '@/app/_trpc/client';
import Container from '@/components/Container';

export default function Dashboard() {
    const getTodos = trpc.getTestTodos.useQuery();        
    return (
        <Container className="flex flex-col items-center justify-center min-h-screen py-10">
            <h2 className='mb-8 text-4xl font-bold text-center'>To-do List</h2>
            <div className='p-6 bg-white rounded-lg shadow-md w-full max-w-2xl'>
                <pre className='overflow-auto text-sm whitespace-pre-wrap'>
                    {JSON.stringify(getTodos.data, null, 2)}
                </pre>
            </div>
        </Container>
    )
}