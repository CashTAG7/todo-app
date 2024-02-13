import { ChangeEventHandler, FormEventHandler, MouseEventHandler } from 'react';
import styles from './todoForm.module.css';

type Props = {
  addTodo: FormEventHandler<HTMLFormElement>;
  todoTitle: string;
  handleTodoTitle: ChangeEventHandler<HTMLInputElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  todoDescription: string;
  handleTodoDescription: ChangeEventHandler<HTMLInputElement>;
  handleTodoPriority: ChangeEventHandler<HTMLSelectElement>;
  editIndex: number | null;
  handleCancel: MouseEventHandler<HTMLButtonElement>;
};

const TodoForm = ({
  addTodo,
  todoTitle,
  handleTodoTitle,
  inputRef,
  todoDescription,
  handleTodoDescription,
  handleTodoPriority,
  editIndex,
  handleCancel,
}: Props) => {
  return (
    <form className={styles.form} onSubmit={addTodo}>
      <input
        type="text"
        placeholder="Title"
        value={todoTitle}
        onChange={handleTodoTitle}
        ref={inputRef}
      />
      <input
        type="text"
        placeholder="Description"
        value={todoDescription}
        onChange={handleTodoDescription}
      />

      <select onChange={handleTodoPriority}>
        <option value={''} hidden>
          Select priority
        </option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {editIndex !== null && <button onClick={handleCancel}>CANCEL</button>}

      <button type="submit">
        {editIndex !== null ? 'SAVE TASK' : 'ADD TASK'}
      </button>
    </form>
  );
};

export default TodoForm;
