import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import { ReactElement } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './styles.module.scss';

export function Header(): ReactElement {
  const { isDark, toggleDarkMode } = useTheme();
  const currentDate = format(new Date(), `EEEEEE, d MMMM`, {
    locale: ptBR,
  });

  return (
    <header className={styles.headerContainer}>
      <img src={isDark ? `/dark-logo.svg` : `/logo.svg`} alt="Podcastr" />
      <div>
        <p>O melhor para você ouvir, sempre</p>
        <div className={styles.dateContainer}>
          <button onClick={toggleDarkMode} type="button">
            {isDark ? <FaMoon /> : <FaSun />}
          </button>
          <span>{currentDate}</span>
        </div>
      </div>
    </header>
  );
}
