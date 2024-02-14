'use client';
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from './page.module.css';

import TodoForm from '@/components/todoForm/TodoForm';
import Sidebar from '@/components/sidebar/Sidebar';
import Todos from '@/components/todos/Todos';

type Todo = {
  id: string;
  title: string;
  description: string;
  priority: '' | 'low' | 'medium' | 'high';
  completed: boolean;
};

export default function Home() {
  const [formActive, setFormActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);

  const [todoTitle, setTodoTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [todoPriority, setTodoPriority] = useState<
    '' | 'low' | 'medium' | 'high'
  >('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState('all');

  // Getting saved todos and saved filtered state from localstorage
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    const savedFilter = localStorage.getItem('filter') || 'all';
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
    setFilter(savedFilter);
    setLoading(false);
  }, []);

  // Setting todos to localstorage
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, loading]);

  // Setting saved filtered state to localstorage
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('filter', filter);
    }
  }, [filter, loading]);

  // Focusing to the form input by clicking on create and edit buttons
  useEffect(() => {
    if (formActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [formActive]);

  // Todo poperties change functions
  const handleTodoTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };

  const handleTodoDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoDescription(e.target.value);
  };

  const handleTodoPriority = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (
      value !== '' &&
      (value === 'low' || value === 'medium' || value === 'high')
    ) {
      setTodoPriority(value as 'low' | 'medium' | 'high');
    }
  };

  const handleCheckboxChange = (id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Edit and creation of todo function
  const addTodo = (
    e: React.FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    if (e.target instanceof HTMLFormElement) {
      e.preventDefault();
    }
    if (todoTitle !== '' && todoDescription !== '' && todoPriority !== '') {
      if (editIndex !== null) {
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = {
          id: updatedTodos[editIndex].id,
          title: todoTitle,
          description: todoDescription,
          priority: todoPriority,
          completed: false,
        };
        setTodos(updatedTodos);
        setEditIndex(null);
        setFormActive(false);
      } else {
        const newTodo: Todo = {
          id: uuidv4(),
          title: todoTitle,
          description: todoDescription,
          priority: todoPriority,
          completed: false,
        };
        setTodos([...todos, newTodo]);
        setFormActive(false);
      }
    }

    setTodoTitle('');
    setTodoDescription('');
  };

  // Cancel button handling while editing todo
  const handleCancel = () => {
    setFormActive(false);
    setEditIndex(null);
    setTodoTitle('');
    setTodoDescription('');
    setTodoPriority('');
  };

  // Filtering todos based on todo priority
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'low' || filter === 'medium' || filter === 'high') {
      return todo.priority === filter;
    } else if (filter === 'completed') {
      return todo.completed === true;
    } else {
      return todo.completed === false;
    }
  });

  // handling click outside of the form
  useEffect(() => {
    const handleOutsideClick = (e: Event) => {
      if (
        formRef.current &&
        (e.target as Node) &&
        !formRef.current.contains(e.target as Node)
      ) {
        setFormActive(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [setFormActive]);

  return (
    <div className={styles.container}>
      <div ref={formRef}>
        <div className={styles.createTodoBtn}>
          <button
            onClick={() => {
              setFormActive(!formActive);
              setTodoTitle('');
              setTodoDescription('');
              setEditIndex(null);
            }}
          >
            {formActive ? 'CLOSE TASKBAR' : 'CREATE TASK'}
          </button>
        </div>

        {formActive && (
          <TodoForm
            addTodo={addTodo}
            todoTitle={todoTitle}
            handleTodoTitle={handleTodoTitle}
            inputRef={inputRef}
            todoDescription={todoDescription}
            handleTodoDescription={handleTodoDescription}
            handleTodoPriority={handleTodoPriority}
            editIndex={editIndex}
            handleCancel={handleCancel}
          />
        )}
      </div>

      <div className={styles.todos}>
        <div className={styles.sidebar}>
          <Sidebar setFilter={setFilter} filter={filter} />
        </div>

        <div className={styles.mainbar}>
          <h2 className={styles.counterHeading}>Task Priority: {filter}</h2>
          <p className={styles.counter}>
            {filteredTodos.filter((todo) => todo.completed).length} /{' '}
            {filteredTodos.length} tasks completed
          </p>
          <Todos
            todos={todos}
            filteredTodos={filteredTodos}
            setEditIndex={setEditIndex}
            setTodoTitle={setTodoTitle}
            setTodoDescription={setTodoDescription}
            setTodoPriority={setTodoPriority}
            handleCheckboxChange={handleCheckboxChange}
            setFormActive={setFormActive}
            formActive={formActive}
            setTodos={setTodos}
          />
        </div>
      </div>
    </div>
  );
}
