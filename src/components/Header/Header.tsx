import {FC} from "react";
import css from './Header.module.css'
import {useAppSelector} from "../../hook";

const Header: FC = () => {
    const date = useAppSelector(state => state.todos.date);
    const current = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;

    return (
        <header className={css.header}>
            <img className={css.logo} src={require('../../images/logo.png')} alt="Logo" />
            <p className={css.date}>Today: {current}</p>
        </header>
    )
}

export default Header;