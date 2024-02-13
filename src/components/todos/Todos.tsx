import styles from './todos.module.css';
import CheckBox from './checkBox/CheckBox';

import { RiEditBoxLine, RiDeleteBin7Line } from 'react-icons/ri';

type Todo = {
  id: string;
  title: string;
  description: string;
  priority: '' | 'low' | 'medium' | 'high';
  completed: boolean;
};

type Props = {
  todos: Todo[];
  filteredTodos: Todo[];
  setEditIndex: (index: number) => void;
  setTodoTitle: (title: string) => void;
  setTodoDescription: (description: string) => void;
  setTodoPriority: (priority: '' | 'low' | 'medium' | 'high') => void;
  handleCheckboxChange: Function;
  setFormActive: (active: boolean) => void;
  formActive: boolean;
  setTodos: (todos: Todo[]) => void;
};

const Todos = ({
  todos,
  filteredTodos,
  setEditIndex,
  setTodoTitle,
  setTodoDescription,
  setTodoPriority,
  handleCheckboxChange,
  setFormActive,
  formActive,
  setTodos,
}: Props) => {
  return (
    <>
      {filteredTodos.map((todo, index) => (
        <div className={styles.todoContainer} key={todo.id}>
          <CheckBox todo={todo} handleCheckboxChange={handleCheckboxChange} />

          <div className={styles.todoMain}>
            <div className={styles.todo}>
              <h3 className={styles.todoTitle}>{todo.title}</h3>
              <p className={styles.todoDes}>{todo.description}</p>
            </div>
            <div className={styles.btns}>
              <p
                className={`${styles.priority} ${
                  todo.priority === 'high'
                    ? styles.high
                    : todo.priority === 'medium'
                    ? styles.mid
                    : styles.low
                }`}
              >
                {todo.priority}
              </p>
              <button
                onClick={() => {
                  setEditIndex(index);
                  setTodoTitle(todo.title);
                  setTodoDescription(todo.description);
                  setTodoPriority(todo.priority);
                  setFormActive(!formActive);
                }}
              >
                <RiEditBoxLine />
              </button>
              <button
                onClick={() => {
                  const updatedTodos = todos.filter((_, i) => i !== index);
                  setTodos(updatedTodos);
                  localStorage.setItem('todos', JSON.stringify(updatedTodos));
                }}
              >
                <RiDeleteBin7Line />
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Todos;
