import { FC, useEffect } from "react";
import classes from './TableTask.module.css'
import ColumnTask from "../ColumnTask/ColumnTask";
import { DayWeekYear, TaskObject } from "../../types/Iworker";

interface TableTaskProps {
    month: string,
    currentWeek: DayWeekYear[],
    workerTasks: TaskObject[],
    currentYear: number,
}

const TableTask: FC<TableTaskProps> = ({month, currentWeek, workerTasks, currentYear}) => {

    return (
        <div className={classes.table}>
            <header className={classes.table__header}>{month}</header>
            <div className={classes.column__container}>
                {currentWeek.map(day => (
                    <ColumnTask key={day.day} columnContent={workerTasks} day={day.day} month={day.month} year={day.year}/>
                ))}
            </div>
        </div>
    )
}

export default TableTask;