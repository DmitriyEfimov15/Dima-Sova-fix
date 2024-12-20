import { DayWeekYear } from "../types/Iworker";

export const weekdays = [
    "Вс",
    "Пн",
    "Вт",
    "Ср",
    "Чт",
    "Пт",
    "Сб",
];

export const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
]


// возвращает номер месяца
export const getNumberMonth = (month: string) => {
    return months.indexOf(month) + 1
}

// Определяет название месяца по полученному числу dd.mm.yyyy, где mm = monthIndex
export const monthsFunc = (monthsIndex: string) => {
    if (monthsIndex.length === 2) {
        const monthsIndexArr = monthsIndex.split('')

        if (monthsIndexArr[0] === '0') {
            monthsIndexArr.shift()
        }
        monthsIndex = monthsIndexArr.join('')
    }

    return months[parseInt(monthsIndex) - 1]
}


// возвращает количество дней в месяце, учитывая перемену количества дней в феврале
const countDaysInMonth = (month: string, year: number) => {

    if(month === 'Апрель' || month === 'Июнь' || month === 'Сентябрь' || month === "Ноябрь") {
        return 30;
    }

    else if(month === "Февраль") {
        if (year % 4 === 0 && year % 100 !== 0) {
            return 29;
        }

        if(year % 400 === 0) {
            return 29;
        }

        return 28;
    }

    else {
        return 31;
    }
}

// Определяет название дня недели по дате
export const weekDayFunc = (day: string, month: string, year: number) => {
    if(month.length > 2) {
        month = String(months.indexOf(month)+1)
    }
    
    const date = new Date(year, parseInt(month)-1, parseInt(day))
    const weekday = weekdays[date.getDay()]

    return `${weekday}(${day})`;
}


// Возращает предыдущий месяц
export const getPreviousMonth = (currentMonth: string) => {
    const indexCurrentMonth = months.indexOf(currentMonth)
    let indexPreviousMonth = indexCurrentMonth - 1
    
    if(indexCurrentMonth === 0) {
        indexPreviousMonth = 11
    } 
    
    return `${months[indexPreviousMonth]}`
}

// Возращает следующий месяц
const getNextMonth = (currentMonth: string) => {
    const indexCurrentMonth = months.indexOf(currentMonth)
    let indexNextMonth = indexCurrentMonth + 1

    if(indexCurrentMonth === 11) {
        indexNextMonth = 0
    }

    return `${months[indexNextMonth]}`
}

// Возврашает неделю, которая будет отображаться на странице
export const getCurrentWeek = (day: string, year: number, month: string) => {
    let indexCurrentWeekDay = weekdays.indexOf(weekDayFunc(day, month, year).split('').slice(0, 2).join(''))
    let dayNumber = parseInt(day)
    
    const currentWeek: DayWeekYear[] = []

    if(weekdays[indexCurrentWeekDay] !== 'Пн') {
        while (weekdays[indexCurrentWeekDay] !== 'Пн') {
            indexCurrentWeekDay -= 1
            dayNumber -= 1

            if(dayNumber < 1) {
                dayNumber = countDaysInMonth(getPreviousMonth(month), year)
            }
            
        }
    }

    while (currentWeek.length < 7) {
        currentWeek.push({day: dayNumber.toString(), month: month, year: year})
        indexCurrentWeekDay += 1
        dayNumber += 1        

        if(indexCurrentWeekDay > 6) {
            indexCurrentWeekDay = 0
        }

        if(dayNumber > countDaysInMonth(getPreviousMonth(month), year)) {
            dayNumber = 1
        }
    }

    return currentWeek;    
}

// Получение сегодняшней даты
export const getTodayDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    return({day, month, year})
}

// Получение предыдущей недели
export const getPreviousWeek = (currentWeek: DayWeekYear[], currentYear: number) => {
    const previousWeek: DayWeekYear[] = []
    let dateFirstDayOfCurrentWeek = parseInt(currentWeek[0].day)
    // currentMonth = monthsFunc(currentWeek[0].month)
    let currentMonth = currentWeek[0].month
    

    while(previousWeek.length < 7) {
        dateFirstDayOfCurrentWeek -= 1

        if (currentMonth === 'Январь' && dateFirstDayOfCurrentWeek < 1) {
            currentYear -= 1
            currentMonth = getPreviousMonth(currentMonth)
            dateFirstDayOfCurrentWeek = countDaysInMonth(currentMonth, currentYear)
        }

        if(dateFirstDayOfCurrentWeek < 1) {
            currentMonth = getPreviousMonth(currentMonth)
            dateFirstDayOfCurrentWeek = countDaysInMonth(currentMonth, currentYear)
        }

        if (dateFirstDayOfCurrentWeek > countDaysInMonth(currentMonth, currentYear)) {
            currentMonth = getNextMonth(currentMonth)
        }
        

        previousWeek.unshift({day: dateFirstDayOfCurrentWeek.toString(), month: currentMonth, year: currentYear})
    };
    
    return {previousWeek: previousWeek, currentMonth, currentYear};
}

// Получение следующей недели
export const getNextWeek = (currentWeek: DayWeekYear[], currentYear: number) => {
    const nextWeek: DayWeekYear[] = []
    let dateFirstDayOfCurrentWeek = parseInt(currentWeek[6].day)

    let currentMonth = currentWeek[6].month

    while(nextWeek.length < 7) {
        dateFirstDayOfCurrentWeek += 1
        
        if(currentMonth === 'Декабрь' && dateFirstDayOfCurrentWeek > 31) {
            
            currentMonth = (getNextMonth(currentMonth))
            dateFirstDayOfCurrentWeek = 1
            currentYear += 1
        }

        if(dateFirstDayOfCurrentWeek > countDaysInMonth(currentMonth, currentYear)) {
            currentMonth = getNextMonth(currentMonth)
            dateFirstDayOfCurrentWeek = 1
        }

        nextWeek.push({day: dateFirstDayOfCurrentWeek.toString(), month: currentMonth, year: currentYear})
    }


    return {nextWeek, currentMonth, currentYear}
}

// Возвращает с XX(dd) dd, где XX - название дня недели, dd - число 
export const getDateFromWeekDay = (day: string) =>  {
    if(day.length === 5) {
        return parseInt(day.split('').slice(3, 4).join(''))
    }

    return parseInt(day.split('').slice(3, 5).join(''))
}