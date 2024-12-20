import { FC } from 'react'
import classes from './WorkerList.module.css'
import AppLayout from '../AppLayout/AppLayout';
import { workerAPI } from '../../services/WorkersServices';
import WorkerNameBox from '../WorkerNameBox/WorkerNameBox';

const WorkerList: FC = () => {
    const {data: workers, isLoading, error} = workerAPI.useFetchAllWorkersQuery(0)
    
    return (
        <AppLayout>
            <div className={classes.text}>
                <p>План по техникам</p>
            </div>
            <div className={classes.worker__container}>
                {workers && workers.map(worker => (
                    <WorkerNameBox id={worker.id} name={worker.name} key={worker.id}/>
                ))}
            </div>
        </AppLayout>
    )
}

export default WorkerList;