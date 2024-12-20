export interface IWorker {
    id: number,
    name: string
    tasks: TaskObject[] | []
}

export interface TaskObject {
    date: string,
    fact: FactWorker[]
    plan: PlanWorker[]
}

interface FactWorker {
    num: number | ''
}

export interface PlanWorker {
    num: number | '',
    done: "true" | "false" | "other" | "null"
}

export interface DayWeekYear {
    day: string,
    month: string,
    year: number
}