//Data
const plantData = [
    { plant_id: 1, name: "Aloe Vera", watering_frequency: 7 },
    { plant_id: 2, name: "Peace Lily", watering_frequency: 3 },
    { plant_id: 3, name: "Spider Plant", watering_frequency: 5 },
    { plant_id: 4, name: "Snake Plant", watering_frequency: 14 },
    { plant_id: 5, name: "Fern", watering_frequency: 2 },
    { plant_id: 6, name: "Cactus", watering_frequency: 10 },
    { plant_id: 7, name: "Orchid", watering_frequency: 7 },
    { plant_id: 8, name: "Bamboo", watering_frequency: 4 },
    { plant_id: 9, name: "Money Plant", watering_frequency: 6 },
    { plant_id: 10, name: "Lavender", watering_frequency: 8 }
];
///Arrays
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//Variables
let Plants_To_Water = document.getElementById("Plants");
let date = document.getElementById("date");
let month = document.getElementById("month");
let year = document.getElementById("year");
let day = document.getElementById("day");
let next_date = document.getElementById("day_front");
let previous_date = document.getElementById("day_back");

let currentDate = new Date("2024/10/28");
let wateringSchedule = [];
let days_to_water = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// This function generated a shedule based on the watering frequency.
function generateSchedule() {
    plantData.forEach(plant => {
        let nextWateringDate = new Date(currentDate);
        for (let i = 0; i < 12 * 7; i++) {
            if (days_to_water.includes(weekdays[nextWateringDate.getDay()])) {
                wateringSchedule.push({
                    date: new Date(nextWateringDate),
                    plant: plant.name
                });
            }

            nextWateringDate.setDate(nextWateringDate.getDate() + plant.watering_frequency);
        }
    });
}

// This function refreshes the display to show the plants that need watering for the day
function updateCalendar() {
    let filteredSchedule = wateringSchedule.filter(
        entry => entry.date.toDateString() === currentDate.toDateString()
    );

    // changes the date display based on the currentDate
    date.innerText = currentDate.getDate();
    month.innerText = months[currentDate.getMonth()];
    year.innerText = currentDate.getFullYear();
    day.innerText = weekdays[currentDate.getDay()];

    // This code empties and adds the current days pants to water
    Plants_To_Water.innerHTML = "";
    filteredSchedule.forEach(entry => {
        let plantItem = document.createElement("li");
        plantItem.innerText = entry.plant;
        Plants_To_Water.appendChild(plantItem);
    });
}

// Events for changing the days by 1
next_date.addEventListener("click", () => {
    currentDate.setDate(currentDate.getDate() + 1);
    updateCalendar();
});

previous_date.addEventListener("click", () => {
    currentDate.setDate(currentDate.getDate() - 1);
    updateCalendar();
});

//functions that generate the schedule and updates the calender
generateSchedule();
updateCalendar();
