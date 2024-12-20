import { FC, HTMLAttributes } from "react";
import classes from './MyButton.module.css'
import { Link } from "react-router-dom";

interface MyButtonProps extends HTMLAttributes<HTMLButtonElement> {
    link: string,
    text: string
}

const MyButton: FC<MyButtonProps> = ({link, text}) => {
    return (
        <Link className={classes.button} to={link}>
            <button>{text}</button>
        </Link>
    )
}

export default MyButton;