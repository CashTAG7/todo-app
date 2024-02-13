import Link from 'next/link';
import styles from './navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.container}>
      <Link className={styles.logo} href={'/'}>
        TODO
      </Link>
    </div>
  );
};

export default Navbar;
