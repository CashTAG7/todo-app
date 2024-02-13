import { Dispatch, SetStateAction } from 'react';

import styles from './sidebar.module.css';

type Props = {
  setFilter: Dispatch<SetStateAction<string>>;
  filter: string;
};

const radioValues = ['all', 'low', 'medium', 'high'];

const Sidebar = ({ setFilter, filter }: Props) => {
  return (
    <div className={styles.container}>
      {radioValues.map((singleValue, index) => (
        <div key={index}>
          <input
            type="radio"
            id={singleValue}
            name="filter"
            value={singleValue}
            onChange={(e) => setFilter(e.target.value)}
          />

          <label
            className={`${styles.labels} ${
              filter === singleValue ? styles.active : ''
            }`}
            htmlFor={singleValue}
          >
            {' '}
            {singleValue} <span className={styles.extraText}>Tasks</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
