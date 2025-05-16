'use client';

import { useState } from 'react';

import {trpc} from '@/app/_trpc/client';
import Container from '@/components/Container';

export default function Dashboard() {
    const todosQuery = trpc.getTodos.useQuery();
    const addTodoMutation = trpc.addTodo.useMutation({
        onSuccess: () => {
            todosQuery.refetch();
        }
    });
    const toggleTodoMutation = trpc.toggleTodo.useMutation({
        onSuccess: () => {
            todosQuery.refetch();
        }
    });
    
    const [content, setContent] = useState('');
    
    const handleAddTodo = async () => {
        if (content.trim().length) {
            addTodoMutation.mutate(content);
            setContent('');
        }
    };
    
    const handleToggleTodo = (id: number) => {
        toggleTodoMutation.mutate({ id });
    };
    
    return (
        <Container className="flex flex-col items-center justify-center min-h-screen py-10">
            <h2 className='mb-8 text-4xl font-bold text-center'>To-do List</h2>
            <div className='p-6 bg-white rounded-lg shadow-md w-full max-w-2xl'>
                <div className='mb-6'>
                    <div className='flex gap-3 items-center'>
                        <label htmlFor='content' className='text-lg font-medium'>Add New Todo:</label>
                        <input
                            id='content'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className='flex-grow text-black bg-white border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleAddTodo();
                                }
                            }}
                        />
                        <button 
                            onClick={handleAddTodo}                      
                            className='ml-2 px-4 py-2 bg-blue-500 text-white font-bold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                            disabled={addTodoMutation.isLoading}
                        >
                            {addTodoMutation.isLoading ? 'Adding...' : 'Add Todo'}
                        </button>
                    </div>
                </div>
                
                <div className='mt-8'>
                    <h3 className='text-xl font-semibold mb-4'>Your Todos</h3>
                    
                    {todosQuery.isLoading ? (
                        <div className='text-center py-4'>Loading your todos...</div>
                    ) : todosQuery.error ? (
                        <div className='text-red-500 py-4'>Error loading todos: {todosQuery.error.message}</div>
                    ) : todosQuery.data?.length === 0 ? (
                        <div className='text-center py-4 text-gray-500'>You have no todos yet. Add one above!</div>
                    ) : (
                        <ul className='space-y-3'>
                            {todosQuery.data?.map((todo) => (
                                <li key={todo.id} className='flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50'>
                                    <input 
                                        type="checkbox" 
                                        checked={todo.done} 
                                        onChange={() => handleToggleTodo(todo.id)}
                                        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className={`flex-grow ${todo.done ? 'line-through text-gray-400' : ''}`}>
                                        {todo.content}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </Container>
    );
}