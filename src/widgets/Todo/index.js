import React from 'react';
import Todo from './TodoW';
import TodoForm from './TodoForm';
import { CheckCircle } from 'react-feather';

export default {
    type: 'todo',
    name: 'To Do',
    icon: <CheckCircle />,
    form: <TodoForm />,
    el: <Todo />,
}