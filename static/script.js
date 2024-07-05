// Set date options

let todayOption = document.getElementById("today")
let tomorrowOption = document.getElementById("tomorrow")
let datOption = document.getElementById("dat")

let currentDate = new Date();
let tomorrowDate = new Date(currentDate);
tomorrowDate.setDate(currentDate.getDate() + 1);

let datDate = new Date(currentDate);
datDate.setDate(datDate.getDate() + 2);
    
let options = { year: 'numeric', month: 'long', day: 'numeric' };
currentDate = currentDate.toLocaleDateString(undefined, options);
tomorrowDate = tomorrowDate.toLocaleDateString(undefined, options);
datDate = datDate.toLocaleDateString(undefined, options);

todayOption.innerHTML = currentDate
tomorrowOption.innerHTML = tomorrowDate
datOption.innerHTML = datDate


// Database for available slots

let todaySlots = [true, false, true, true, true, false, false, true, true, false, true, false]
let tomorrowSlots = [false, false, true, false, true, false, false, true, false, false, false, false]
let datSlots = [false, false, false, true, false, false, false, true, false, false, false, false]
let times = ["11.00-12.00", "12.00-13.00", "13.00-14.00", "14.00-15.00", "15.00-16.00", "16.00-17.00", "17.00-18.00", "18.00-19.00", "20.00-21.00", "21.00-22.00"]


// Function for showing time selections

function timeSelect() {
    let timeForm = document.getElementById("select-time");
    timeForm.style.display = 'block';
    let day = document.getElementById("day").value;
    let slots;

    if (day == "today") {
        slots = todaySlots;
    } else if (day == "tomorrow") {
        slots = tomorrowSlots;
    } else {
        slots = datSlots;
    }

    for (let i = 0; i < slots.length; i++) {
        let el = document.getElementById(`${i + 1}`);
        let label = document.getElementById(`label${i + 1}`);
        el.disabled = !slots[i];
        if (!slots[i]) {
            label.classList.add('disabled-label');
        } else {
            label.classList.remove('disabled-label');
        }
    }
}

function enableReserve() {
    let reserveButton = document.getElementById("reserve");
    reserveButton.style.display = 'block';
}

function reserve(day, time) {
    if (day == "today") {
        date = currentDate
    } else if (day == "tomorrow") {
        date = tomorrowDate
    } else {
        date = datDate;
    }
    alert(`Reserved for ${date}, ${times[time - 1]}`)
}


// Function for reserving 

let reserveButton = document.getElementById("reserve");
reserveButton.addEventListener("click", ()=> {
    let day = document.getElementById("day").value
    let time = document.querySelector('input[name="time"]:checked').value
    reserve(day, time)
    if (day == "today") {
        slots = todaySlots;
    } else if (day == "tomorrow") {
        slots = tomorrowSlots;
    } else {
        slots = datSlots;
    }
    slots[time-1] = false
})



