import { FC, useEffect, useState } from "react";
import classes from './ColumnTask.module.css'
import { PlanWorker, TaskObject } from "../../types/Iworker";
import { getDateFromWeekDay, getNumberMonth, weekDayFunc } from "../../utils/monthAndWeekday";

interface ColumnTaskProps {
    columnContent: TaskObject[],
    day: string,
    month: string,
    year: number
}

const ColumnTask: FC<ColumnTaskProps> = ({columnContent, day, month, year}) => {
    const [currentDate, setCurrentDate] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [content, setContent] = useState<TaskObject>({date: '', plan: [], fact: []})

    const contentClasses = [classes.content, classes.empty]
    useEffect(() => {
        setCurrentDate(`${day}.${getNumberMonth(month)}.${year}`)
    }, [day])

    useEffect(() => {
        for (let i = 0; i < columnContent.length; i++) {
            if(columnContent[i].date === currentDate) {
                setContent({date: columnContent[i].date, fact: columnContent[i].fact, plan: columnContent[i].plan})
            }
        }
    }, [currentDate])
    
    useEffect(() => {
        if (content.date !== '') {
            setIsLoading(false)
        }

        if(content.plan.length < 4) {
            while (content.plan.length < 4) {
                setContent(Object.assign(content, content.plan = [...content.plan, {num: '', done: 'null'}]))
            }
        }

        if(content.fact.length < 4) {
            while(content.fact.length < 4) {
                setContent(Object.assign(content, content.fact = [...content.fact, {num: ''}]))
            }
        }
    }, [content])
    
    const getCellColor = (done: "true" | "false" | "other" | "null") => {

        if(done === 'false') {
            return '#d69a81';
        }

        if (done === 'true') {
            return '#C5E384';
        }

        if (done === 'other') {
            return '#ffe78f'
        }

        return ''
    }

    if (!columnContent) {
        return <div>Задачи отсуствуют!</div>
    }

    return (
        <div className={classes.column__container}>
            {isLoading
                ? <div className={classes.empty__column}>
                    <div className={classes.column__box}>
                        <header className={classes.column__header}>{weekDayFunc(day, month, year)}</header>
                        <div className={classes.column__content}>
                            <div className={classes.plan}>
                                <header className={classes.plan__header}>План</header>
                                <div className={classes.container}>
                                    {content.plan && content.plan.map(task => {
                                        if(task.num === '') return <div className={contentClasses.join(' ')}>{task.num}</div>
                                        return <div style={{backgroundColor: `${getCellColor(task.done)}`}} className={classes.content}>{`№${task.num}`}</div>
                                })}
                                </div>
                            </div>
                            <div className={classes.fact}>
                                <header className={classes.fact__header}>Факт</header>
                                <div className={classes.container}>
                                    {content.fact && content.fact.map(task => {
                                        if(task.num === '') return <div className={contentClasses.join(' ')}>{task.num}</div>
                                        return <div className={classes.content}>{`№${task.num}`}</div>
                                })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




                : <div className={classes.column}>
                    <div className={classes.column__box}>
                        <header className={classes.column__header}>{weekDayFunc(day, month, year)}</header>
                        <div className={classes.column__content}>
                            <div className={classes.plan}>
                                <header className={classes.plan__header}>План</header>
                                <div className={classes.container}>
                                    {content.plan && content.plan.map(task => {
                                        if(task.num === '') return <div className={contentClasses.join(' ')}>{task.num}</div>
                                        return <div style={{backgroundColor: `${getCellColor(task.done)}`}} className={classes.content}>{`№${task.num}`}</div>
                                })}
                                </div>
                            </div>
                            <div className={classes.fact}>
                                <header className={classes.fact__header}>Факт</header>
                                <div className={classes.container}>
                                    {content.fact && content.fact.map(task => {
                                        if(task.num === '') return <div className={contentClasses.join(' ')}>{task.num}</div>
                                        return <div className={classes.content}>{`№${task.num}`}</div>
                                })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ColumnTask;