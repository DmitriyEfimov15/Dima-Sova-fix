import { FC, ReactNode } from "react";
import classes from './AppLayout.module.css'
import Header from "./Header/Header";

interface AppLayoutProps {
    children: ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({children}) => {
    return(
        <div className={classes.container}>
            <Header/>

            <main className={classes.main}>
                {children}
            </main>
        </div>
    )
}

export default AppLayout;