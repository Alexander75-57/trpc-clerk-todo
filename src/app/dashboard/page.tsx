'use client';

import { useState } from 'react';

import {trpc} from '@/app/_trpc/client';
import Container from '@/components/Container';

export default function Dashboard() {
    const getTodos = trpc.getTestTodos.useQuery();
    const addTodo = trpc.addTodo.useMutation();
    
    const [content, setContent] = useState('');
    
    return (
        <Container className="flex flex-col items-center justify-center min-h-screen py-10">
            <h2 className='mb-8 text-4xl font-bold text-center'>To-do List</h2>
            <div className='p-6 bg-white rounded-lg shadow-md w-full max-w-2xl'>
                <pre className='overflow-auto text-sm whitespace-pre-wrap'>
                    {/* {JSON.stringify(getTodos.data, null, 2)} */}
                    <div className='flex gap-3 items-center'>
                        <label htmlFor='content' className='text-2xl'>Content</label>
                        <input
                            id='content'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className='flex-grow text-black bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                        />
                        <button 
                            onClick={async () => {
                                if (content.length) {
                                    addTodo.mutate(content);
                                    setContent('');
                                }
                            }}                        
                            className='ml-2 px-4 py-2 bg-blue-500 text-white font-bold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                        >Add Todo</button>
            </div>
                </pre>
            </div>
        </Container>
    )
}