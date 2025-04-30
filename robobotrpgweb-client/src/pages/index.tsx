import type { NextPage } from 'next';
import styles from '../utils/styles/home.module.scss';
import { FaDiscord } from "react-icons/fa";
import '../config';
const Home: NextPage = () => {
  const handleLogin = () => {
    window.location.href = `${process.env.API_URL}/api/auth/discord`;
    console.log(process.env.API_URL);
    console.log(`${process.env.API_URL}/api/auth/discord`);
  }
  return (
    <div className="page page-aligned-center">
      <div>
        <button className={styles.button} onClick={handleLogin}>
          <span>Log in with discord</span>
          <FaDiscord size="50" color="#7289DA"></FaDiscord></button>
      </div>
    </div>
  );
}

export default Home;