// Calendar
let selectedDateInput = document.getElementById("selectedDateInput")
const calendar = document.querySelector("#calendar_main"),
    input = document.querySelector("#date"),
    calHeader = document.querySelector("#calendar_header"),
    calHeaderTitle = document.querySelector("#calendar_header span"),
    calDays = document.querySelector("#cal_days"),
    days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ],
    months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

let oneDay = 60 * 60 * 24 * 1000;
let todayTimestamp =
    Date.now() -
    (Date.now() % oneDay) +
    new Date().getTimezoneOffset() * 1000 * 60;

let selectedDay = todayTimestamp;

const getNumberOfDays = (year, month) => {
    return 40 - new Date(year, month, 40).getDate();
};

const getDayDetails = (args) => {
    let date = args.index - args.firstDay;
    let day = args.index % 7;
    let prevMonth = args.month - 1;
    let prevYear = args.year;
    if (prevMonth < 0) {
        prevMonth = 11;
        prevYear--;
    }
    let prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);

    let _date =
        (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
    let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
    let timestamp = new Date(args.year, args.month, _date).getTime();
    return {
        date: _date,
        day,
        month,
        timestamp,
        dayString: days[day]
    };
};

const getMonthDetails = (year, month) => {
    let firstDay = new Date(year, month).getDay();
    let numberOfDays = getNumberOfDays(year, month);
    let monthArray = [];
    let rows = 5;
    let currentDay = null;
    let index = 0;
    let cols = 7;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            currentDay = getDayDetails({
                index,
                numberOfDays,
                firstDay,
                year,
                month
            });
            monthArray.push(currentDay);
            index++;
        }
    }
    return monthArray;
};

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let monthDetails = getMonthDetails(year, month);

const isCurrentDay = (day, cell) => {
    if (day.timestamp === todayTimestamp) {
        cell.classList.add("active");
        cell.classList.add("isCurrent");

    }
};

const isSelectedDay = (day, cell) => {
    if (day.timestamp === selectedDay) {
        cell.classList.add("active");
        cell.classList.add("isSelected");
    }
};

const getMonthStr = (month) =>
    months[Math.max(Math.min(11, month), 0)] || "Month";

const setHeaderNav = (offset) => {
    month = month + offset;
    if (month === -1) {
        month = 11;
        year--;
    } else if (month === 12) {
        month = 0;
        year++;
    }
    monthDetails = getMonthDetails(year, month);
    return {
        year,
        month,
        monthDetails
    };
};

const setHeader = (year, month) => {
    calHeaderTitle.innerHTML = getMonthStr(month) + " " + year;
};

setHeader(year, month);

const getDateStringFromTimestamp = (timestamp) => {
    let dateObject = new Date(timestamp);
    let month = dateObject.getMonth();
    let date = dateObject.getDate();
    return `${getMonthStr(month)} ${date}, ${dateObject.getFullYear()}`;
};

const setDateToInput = (timestamp) => {
    let dateObject = new Date(timestamp);
    let day = ("0" + dateObject.getDate()).slice(-2);
    let month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
    let year = dateObject.getFullYear();
    
    let dateStringFormated = `${day}/${month}/${year}`;
    let dateString = getDateStringFromTimestamp(timestamp);
    input.value = dateStringFormated;
    selectedDateInput.value = dateString
};

for (let i = 0; i < days.length; i++) {
    let div = document.createElement("div"),
        span = document.createElement("span");

    div.classList.add("cell_wrapper");
    span.classList.add("cell_item");
    span.innerText = days[i].slice(0, 2);
    div.appendChild(span);
    calDays.appendChild(div);
}

const setCalBody = (monthDetails) => {
    for (let i = 0; i < monthDetails.length; i++) {
        let div = document.createElement("div"),
            span = document.createElement("span");

        div.classList.add("cell_wrapper");
        div.classList.add("cal_date");
        monthDetails[i].month === 0 && div.classList.add("current");
        monthDetails[i].month === 0 && isCurrentDay(monthDetails[i], div);
        span.classList.add("cell_item");

        span.innerText = monthDetails[i].date;

        div.appendChild(span);
        calendar.appendChild(div);
    }
};

setCalBody(monthDetails);

const updateCalendar = (btn) => {
    let newCal, offset;
    if (btn.classList.contains("back")) {
        offset = -1;
    } else if (btn.classList.contains("front")) {
        offset = 1;
    }
    newCal = setHeaderNav(offset);
    setHeader(newCal.year, newCal.month);
    calendar.innerHTML = "";
    setCalBody(newCal.monthDetails);
};

const selectOnClick = () => {
    document.querySelectorAll(".cell_wrapper").forEach((cell) => {
        cell.classList.contains("isSelected") && cell.classList.remove("active");

        if (cell.classList.contains("isCurrent") &&
            !cell.classList.contains("active")) {
            cell.querySelector("span").classList.add("inactive_indicator");
        }
    });
};


const updateInput = () => {
    let currentDay = document.querySelector(".isCurrent");
    document.querySelectorAll(".cell_wrapper").forEach((cell) => {
        if (cell.classList.contains("current")) {
            cell.addEventListener("click", (e) => {
                let cell_date = e.target.textContent;

                currentDay !== null && currentDay.classList.remove("active");

                for (let i = 0; i < monthDetails.length; i++) {
                    if (monthDetails[i].month === 0) {
                        if (monthDetails[i].date.toString() === cell_date) {
                            selectedDay = monthDetails[i].timestamp;
                            setDateToInput(selectedDay);
                            selectOnClick();

                            isSelectedDay(monthDetails[i], cell);

                            cell.querySelector('span').classList.contains('inactive_indicator')
                                && cell.querySelector('span').classList.remove('inactive_indicator');
                        }
                    }
                }
            });
        }
    });
};

updateInput();

document.addEventListener('click', function (e) {
    const calendar = document.querySelector('#date_picker_calendar');
    const input = document.querySelector('#date_picker_input');
    const dateInput = document.querySelector('#date');
    
    if (!calendar.contains(e.target) && !dateInput.contains(e.target)) {
        if (!calendar.classList.contains('hidden')) {
            calendar.classList.toggle('hidden');
            input.classList.toggle('showCal');
            dateInput.classList.toggle('onFocus');
        }
    }
});

document.querySelectorAll(".cal-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        updateCalendar(btn);
        updateInput();
    });
});
input.addEventListener('click', (e) => {
    e.stopPropagation();
    document.querySelector('#date_picker_calendar').classList.toggle('hidden');
    document.querySelector('#date_picker_input').classList.toggle('showCal');
    document.querySelector('#date').classList.toggle('onFocus');
});



// Upload File
const uploadInput = document.getElementById('uploadFile');
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');

uploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    
    if (file) {
        step1.classList.remove('act');
        step2.classList.add('act');
        
        const fileName = step2.querySelector('.file-name');
        const fileSize = step2.querySelector('.file-size');
        const progressCompleted = step2.querySelector('.prog-completed');
        const progressPercentage = step2.querySelector('.progress-percentage');
        
        fileName.textContent = file.name;
        fileSize.textContent = `${Math.round(file.size / 1024)} KB`;
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            progressCompleted.style.width = progress + '%';
            progressPercentage.textContent = progress + '%';
            
            if (progress >= 100) {
                clearInterval(interval);
                step2.classList.remove('act');
                step3.classList.add('act');
                
                const fileNameStep3 = step3.querySelector('.file-name');
                const fileStatus = step3.querySelector('.file-status');
                
                fileNameStep3.textContent = file.name;
                fileStatus.textContent = `${Math.round(file.size / 1024)} KB - 100% uploaded`;
            }
        }, 500);
    }
});



// Sort Data
const leftBoxes = document.querySelectorAll('.sort-left-column .box');
const rightBoxes = document.querySelectorAll('.sort-right-column .box');
const resetBtn = document.getElementById('sort-reset-btn');
const sortCont = document.querySelector('.sort-cont');
const leftColumn = document.querySelector('.sort-left-column');
function checkCompletion() {
    const allFilled = Array.from(rightBoxes).every(box => !box.classList.contains('empty'));
    if (allFilled) {
        sortCont.classList.add('completed');
    }
}
leftBoxes.forEach(box => {
    box.addEventListener('click', function () {
        resetBtn.classList.remove("hide")
        const info = this.innerText;
        for (let i = 0; i < rightBoxes.length; i++) {
            if (rightBoxes[i].classList.contains('empty')) {
                rightBoxes[i].value = info;
                rightBoxes[i].classList.remove('empty');

                this.classList.add('removing');

                setTimeout(() => {
                    this.remove();
                    checkCompletion();
                }, 400);
                break;
            }
        }
    });
});

resetBtn.addEventListener('click', function (e) {
    e.preventDefault();
    resetBtn.classList.add("hide")
    rightBoxes.forEach(box => {
        box.value = '';
        box.classList.add('empty');
    });
    leftColumn.innerHTML = ` 
            <div class="box" data-info="Cost of living">Cost of living</div>
            <div class="box" data-info="Proximity to work or school">Proximity to work or school</div>
            <div class="box" data-info="Safety and crime rate">Safety and crime rate</div>
            <div class="box" data-info="Access to public transportation">Access to public transportation</div>
            <div class="box" data-info="Availability of green spaces/parks">Availability of green spaces/parks</div>
    `;
    const newLeftBoxes = document.querySelectorAll('.sort-left-column .box');
    newLeftBoxes.forEach(box => {
        box.addEventListener('click', function () {
            resetBtn.classList.remove("hide")
            const info = this.innerText;
            for (let i = 0; i < rightBoxes.length; i++) {
                if (rightBoxes[i].classList.contains('empty')) {
                    rightBoxes[i].value = info;
                    rightBoxes[i].classList.remove('empty');
                    this.classList.add('removing');
                    
                    setTimeout(() => {
                        this.remove();
                        checkCompletion();
                    }, 300);
                    
                    break;
                }
            }
        });
    });
    sortCont.classList.remove('completed');
});


// Survey Rows
let radioElements = document.querySelectorAll('.radio-row')
radioElements.forEach(radio => {
    radio.addEventListener('click', function() {
        const currentRow = this.closest('.row');
        const nextRow = currentRow.nextElementSibling;
        if (nextRow && nextRow.classList.contains('bdy')) {
            nextRow.classList.add('visible');
        }
    });
});