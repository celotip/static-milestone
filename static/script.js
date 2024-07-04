let todaySlots = [true, false, true, true, true, false, false, true, true, false, true, false]
let tomorrowSlots = [false, false, true, false, true, false, false, true, false, false, false, false]
let datSlots = [false, false, false, true, false, false, false, true, false, false, false, false]
let times = ["11.00-12.00", "12.00-13.00", "13.00-14.00", "14.00-15.00", "15.00-16.00", "16.00-17.00", "17.00-18.00", "18.00-19.00", "20.00-21.00", "21.00-22.00"]

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
    alert(`Reserved for ${day}, ${times[time - 1]}`)
}

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



