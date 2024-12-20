import { TaskObject } from "../types/Iworker";


export const countPlanTasks = (taskArr: TaskObject[], type: 'true' | 'other' | 'false') => {
    let count = 0

    for (let i = 0; i < taskArr.length; i++) {
        for (let j = 0; j < taskArr[i].plan.length; j++) {
            if (taskArr[i].plan[j].done == type) {
                count +=1
            }
        }
    }

    return count;
}