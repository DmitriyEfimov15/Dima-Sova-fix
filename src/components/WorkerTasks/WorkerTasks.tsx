import { FC, useEffect, useMemo, useState } from "react";
import classes from './WorkerTasks.module.css'
import AppLayout from "../AppLayout/AppLayout";
import { useParams } from "react-router-dom";
import { workerAPI } from "../../services/WorkersServices";
import Loader from "../UI/Loader/Loader";
import { countPlanTasks } from "../../utils/countTasks";
import LeftArrow from '../../assets/left.png'
import RightArrow from '../../assets/right.png'
import { getCurrentWeek, getNextWeek, getPreviousWeek, getTodayDate, monthsFunc } from "../../utils/monthAndWeekday";
import { CurrentYearAndMonth, Today } from "../../types/ITable";
import TableTask from "../TableTask/TableTask";
import { DayWeekYear } from "../../types/Iworker";

const WorkerTasks: FC = () => {
    const {id} = useParams<string>()
    const {data: workers, isLoading} = workerAPI.useFetchAllWorkersQuery(0)
    const [currentWeekTable, setCurrentWeekTable] = useState<DayWeekYear[]>([])
    const [todayDate, setTodayDate] = useState<Today>({})
    const [currentYearAndMonth, setCurrentYearAndMonth] = useState<CurrentYearAndMonth>({})

    useEffect(() => {
        setTodayDate(getTodayDate())
    }, [])    

    useMemo(() => {
        todayDate.day && todayDate.year && todayDate.month && setCurrentWeekTable(getCurrentWeek(todayDate.day, todayDate.year, monthsFunc(todayDate.month)))
        todayDate.month && setCurrentYearAndMonth({year: todayDate.year, month: monthsFunc(todayDate.month)})
    }, [todayDate])
    
    const previousWeek = () => {
        
        currentYearAndMonth.month
        && currentYearAndMonth.year
        && setCurrentWeekTable(getPreviousWeek(currentWeekTable, currentYearAndMonth.year).previousWeek)

        currentYearAndMonth.month
        && currentYearAndMonth.year
        && setCurrentYearAndMonth(
            {
                month: getPreviousWeek(currentWeekTable, currentYearAndMonth.year).currentMonth, 
                year: getPreviousWeek(currentWeekTable, currentYearAndMonth.year).currentYear
            })
    }

    const nextWeek = () => {
        currentYearAndMonth.month
        && currentYearAndMonth.year
        && setCurrentWeekTable(getNextWeek(currentWeekTable, currentYearAndMonth.year).nextWeek)

        currentYearAndMonth.month
        && currentYearAndMonth.year
        && setCurrentYearAndMonth(
            {
                month: getNextWeek(currentWeekTable, currentYearAndMonth.year).currentMonth,
                year: getNextWeek(currentWeekTable, currentYearAndMonth.year).currentYear
            }
        )
    }

    const today = () => {
        todayDate.day && todayDate.year && todayDate.month && setCurrentWeekTable(getCurrentWeek(todayDate.day, todayDate.year, monthsFunc(todayDate.month)))
        todayDate.month && todayDate.year && (setCurrentYearAndMonth({year: todayDate.year, month: monthsFunc(todayDate.month)}))
    }

    return (
        <AppLayout>
            {isLoading
                ? <div className={classes.loader__container}><Loader/></div>
                : 
                <div className={classes.content__container}>
                    <div className={classes.text}>
                        <p>План-факт по техникам</p>
                        <p>Календарь {workers && id && workers[parseInt(id) - 1].name}</p>
                    </div>

                    <div className={classes.info__container}>
                        <div className={classes.indicators}>
                            <div className={classes.done}>сделаны по плану ({workers && id && countPlanTasks(workers[parseInt(id) - 1].tasks, 'true')})</div>
                            <div className={classes.other__day}>сделаны в другой день ({workers && id && countPlanTasks(workers[parseInt(id) - 1].tasks, 'other')})</div>
                            <div className={classes.not__done}>не сделаны ({workers && id && countPlanTasks(workers[parseInt(id) - 1].tasks, 'false')})</div>
                        </div>

                        <div className={classes.toggle}>
                            <button className={classes.yellowButton} onClick={previousWeek}><img src={LeftArrow} alt="left"/></button>
                            <button className={classes.yellowButton} onClick={today}>Cегодня</button>
                            <button className={classes.yellowButton} onClick={nextWeek}><img src={RightArrow} alt="right"/></button>
                        </div>
                    </div>

                    {currentYearAndMonth.month
                    && workers
                    && id
                    && currentYearAndMonth.year
                    && currentWeekTable
                    && <TableTask month={currentYearAndMonth.month} currentWeek={currentWeekTable} currentYear={currentYearAndMonth.year} workerTasks={workers[parseInt(id) - 1].tasks}/>}
                </div>
            }
        </AppLayout>
    )
}

export default WorkerTasks;