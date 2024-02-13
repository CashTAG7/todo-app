import styles from './checkBox.module.css';

type Todo = {
  id: string;
  title: string;
  description: string;
  priority: '' | 'low' | 'medium' | 'high';
  completed: boolean;
};

type Props = { todo: Todo; handleCheckboxChange: Function };

const CheckBox = ({ todo, handleCheckboxChange }: Props) => {
  return (
    <label className={styles.container}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => handleCheckboxChange(todo.id)}
      />
      <span className={styles.checkmark}></span>
    </label>
  );
};

export default CheckBox;
