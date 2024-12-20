import { FC } from "react";
import {Routes, Route, Navigate} from "react-router-dom"
import WorkerList from "../components/WorkersList/WorkerList";
import WorkerTasks from "../components/WorkerTasks/WorkerTasks";

const AppRouter: FC = () => {
    return (
        <Routes>
            <Route path="/workers" element={<WorkerList/>}/>
            <Route path="/workers/worker/:id" element={<WorkerTasks/>}/>
            <Route path="/*" element={<Navigate to={'/workers'}/>}/>
        </Routes>
    )
}

export default AppRouter;