import style from './Header.module.scss';

function Header() {
  return (
    <header className={style.header}>
      <h1>buidbox</h1>
      <span>WEB CHALLENGE</span>
    </header>
  );
}

export default Header;
