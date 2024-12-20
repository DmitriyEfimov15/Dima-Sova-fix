import { FC } from "react";
import classes from './WorkerNameBox.module.css'
import { Link } from "react-router-dom";

interface WorkerNameBoxProps {
    name: string,
    id: number
}

const WorkerNameBox: FC<WorkerNameBoxProps> = ({name, id}) => {
    return (
        <Link className={classes.container} to={`worker/${id}`}>{name}</Link>
    )
}

export default WorkerNameBox;