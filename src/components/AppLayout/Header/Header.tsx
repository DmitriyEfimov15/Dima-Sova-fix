import { FC } from "react";
import classes from './Header.module.css'
import MyButton from "../../UI/MyButton/MyButton";
import logo from '../../../assets/logo.png'

const Header: FC = () => {
    return (
        <header className={classes.header}>
            <div className={classes.name}>
                <div className={classes.name__content}>
                    <div className={classes.text}>
                        <p className={classes.name__head}>ЭФОР</p>
                        <p className={classes.name__text}>управляющая компания</p>
                    </div>

                    <div className={classes.name__button}>
                        <MyButton text="Меню" link='/workers'/>
                    </div>
                </div>
            </div>

            <div className={classes.logo}>
                <div className={classes.logo__content}>
                    <div className={classes.logo__img}>
                        <img src={logo} alt="LOGO"/>
                    </div>

                    <div className={classes.logo__text}>
                        SOVA-FIX - система управления ремонтом, эксплуатацией и техническим <br/> обслуживанием оборудования и помещений
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;