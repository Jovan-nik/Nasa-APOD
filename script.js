

const API_KEY = "o2YmAs3EdoHYVXhvh2Gnh1JfiuHXRYwOqfqWWGKz";
function CalendarControl() {
  const danas=new Date();
    const calendar = new Date();
    const calendarControl = {
      localDate: new Date(),
      prevMonthLastDate: null,
      calWeekDays: ["Ned", "Pon", "Uto", "Sre", "Cet", "Pet", "Sub"],
      calMonthName: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Maj",
        "Jun",
        "Jul",
        "Avg",
        "Sep",
        "Okt",
        "Nov",
        "Dec"
      ],
      daysInMonth: function (month, year) {
        return new Date(year, month, 0).getDate();
      },
      firstDay: function () {
        return new Date(calendar.getFullYear(), calendar.getMonth(), 1);
      },
      lastDay: function () {
        return new Date(calendar.getFullYear(), calendar.getMonth() + 1, 0);
      },
      firstDayNumber: function () {
        return calendarControl.firstDay().getDay() + 1;
      },
      lastDayNumber: function () {
        return calendarControl.lastDay().getDay() + 1;
      },
      getPreviousMonthLastDate: function () {
        let lastDate = new Date(
          calendar.getFullYear(),
          calendar.getMonth(),
          0
        ).getDate();
        return lastDate;
      },
      navigateToPreviousMonth: function () {
        calendar.setMonth(calendar.getMonth() - 1);
        calendarControl.attachEventsOnNextPrev();
        
      },
      navigateToNextMonth: function () {
        calendar.setMonth(calendar.getMonth() + 1);
        calendarControl.attachEventsOnNextPrev();
       
      },
      navigateToPreviousYear: function () {
        calendar.setYear(calendar.getFullYear() - 1);
        calendarControl.attachEventsOnNextPrev();
      },
      navigateToNextYear: function () {
        calendar.setYear(calendar.getFullYear() + 1);
        calendarControl.attachEventsOnNextPrev();
      },
      navigateToCurrentMonth: function () {
        let currentMonth = calendarControl.localDate.getMonth();
        let currentYear = calendarControl.localDate.getFullYear();
        calendar.setMonth(currentMonth);
        calendar.setYear(currentYear);
        calendarControl.attachEventsOnNextPrev();
      },
      displayYear: function () {
        let yearLabel = document.querySelector(".calendar .calendar-year-label");
        yearLabel.innerHTML = calendar.getFullYear();
        
      },
      displayMonth: function () {
        let monthLabel = document.querySelector(
          ".calendar .calendar-month-label"
        );
        monthLabel.innerHTML = calendarControl.calMonthName[calendar.getMonth()];
      },
      selectDate: function (e) {
        console.log(
          `${e.target.textContent} ${
            calendar.getMonth()+1
          } ${calendar.getFullYear()}`
        ); 
        /*funckija za gresku-nesto tu ne valja ne gledaj kod nesto sam isprobavao 
         if(e.target.textContent>danas.getDate() && calendar.getFullYear()>=danas.getFullYear() && calendar.getMonth()>=danas.getMonth()){
          document.getElementById("greska").innerHTML="Sorry can't see into future";
        }
        else if(e.target.textContent>danas.getDate() && calendar.getFullYear()>=danas.getFullYear() &&calendar.getMonth()<=danas.getMonth()){
          document.getElementById("greska").innerHTML="Sorry can't see into future";
        }
        else if(e.target.textContent>danas.getDate() && calendar.getFullYear()>=danas.getFullYear() &&calendar.getMonth()<=danas.getMonth()){
          document.getElementById("greska").innerHTML="Sorry can't see into future";
        }
        else if(e.target.textContent>danas.getDate() && calendar.getFullYear()>danas.getFullYear() &&calendar.getMonth()<=danas.getMonth()){
          document.getElementById("greska").innerHTML="Sorry can't see into future";
        }
       else if(e.target.textContent>danas.getDate() && calendar.getFullYear()==danas.getFullYear() && calendar.getMonth()>=danas.getMonth()){
          document.getElementById("greska").innerHTML="Sorry can't see into future";
        }
        else if(e.target.textContent>=danas.getDate() && calendar.getFullYear()==danas.getFullYear() && calendar.getMonth()<=danas.getMonth()){
          document.getElementById("greska").innerHTML="";
        }
        else if(e.target.textContent<=danas.getDate() && calendar.getFullYear()==danas.getFullYear() && calendar.getMonth()<=danas.getMonth()){
          document.getElementById("greska").innerHTML="";
        }
        else if(e.target.textContent<=danas.getDate() && calendar.getFullYear()>danas.getFullYear() && calendar.getMonth()<=danas.getMonth()){
          document.getElementById("greska").innerHTML="";
        }
        else if(e.target.textContent>=danas.getDate() && calendar.getFullYear()>danas.getFullYear() && calendar.getMonth()<=danas.getMonth()){
          document.getElementById("greska").innerHTML="";
        }
        else{
          document.getElementById("greska").innerHTML="";
        }
        */
        
        const day =e.target.textContent;
        const month=(calendar.getMonth()+1)
        const year = calendar.getFullYear();
      console.log((`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&&thumbs=true&date=${year}-${month}-${day}`))
	    APICall(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&&thumbs=true&date=${year}-${month}-${day}`);
      },
      plotSelectors: function () {
        document.querySelector(
          ".calendar"
        ).innerHTML += `<div class="calendar-inner">
        <div class="calendar-controls">
        
          <div class="calendar-year-month">
          <div class="calendar-prev"><p><</p></div>
          <div class="calendar-month-label"></div>
          <div class="calendar-next"><p >></p></div>
          
          <div class="year-prev"><p><</p></div>
          <div class="calendar-year-label"></div>
          <div class="year-next"><p>></p></div>
          </div>
          
          
          </div>
          <div class="calendar-today-date">Today: 
            ${calendarControl.calWeekDays[calendarControl.localDate.getDay()]}, 
            ${calendarControl.localDate.getDate()}, 
            ${calendarControl.calMonthName[calendarControl.localDate.getMonth()]} 
            ${calendarControl.localDate.getFullYear()}
          </div>
          <div class="calendar-body"></div></div>`;
      },
      plotDayNames: function () {
        for (let i = 0; i < calendarControl.calWeekDays.length; i++) {
          document.querySelector(
            ".calendar .calendar-body"
          ).innerHTML += `<div>${calendarControl.calWeekDays[i]}</div>`;
        }
      },
      plotDates: function () {
        document.querySelector(".calendar .calendar-body").innerHTML = "";
        calendarControl.plotDayNames();
        calendarControl.displayMonth();
        calendarControl.displayYear();
        let count = 1;
        let prevDateCount = 0;
  
        calendarControl.prevMonthLastDate = calendarControl.getPreviousMonthLastDate();
        let prevMonthDatesArray = [];
        let calendarDays = calendarControl.daysInMonth(
          calendar.getMonth() + 1,
          calendar.getFullYear()
        );
        // dates of current month
        for (let i = 1; i < calendarDays; i++) {
          if (i < calendarControl.firstDayNumber()) {
            prevDateCount += 1;
            document.querySelector(
              ".calendar .calendar-body"
            ).innerHTML += `<div class="prev-dates"></div>`;
            prevMonthDatesArray.push(calendarControl.prevMonthLastDate--);
          } else {
            document.querySelector(
              ".calendar .calendar-body"
            ).innerHTML += `<div class="number-item" data-num=${count}><p class="dateNumber" >${count++}</p></div>`;
          }
        }
        //remaining dates after month dates
        for (let j = 0; j < prevDateCount + 1; j++) {
          document.querySelector(
            ".calendar .calendar-body"
          ).innerHTML += `<div class="number-item" data-num=${count}><p class="dateNumber" >${count++}</p></div>`;
        }
        calendarControl.highlightToday();
        calendarControl.plotPrevMonthDates(prevMonthDatesArray);
        calendarControl.plotNextMonthDates();
      },
      attachEvents: function () {
        let prevBtn = document.querySelector(".calendar .calendar-prev p");
        let nextBtn = document.querySelector(".calendar .calendar-next p");
        let prevYr = document.querySelector(".calendar .year-prev p");
        let nextYr = document.querySelector(".calendar .year-next p");
        let todayDate = document.querySelector(".calendar .calendar-today-date");
        let dateNumber = document.querySelectorAll(".calendar .dateNumber");
        prevYr.addEventListener(
          "click",
          
          calendarControl.navigateToPreviousYear
        );
        nextYr.addEventListener(
          "click", 

        calendarControl.navigateToNextYear);

        prevBtn.addEventListener(
          "click",
          calendarControl.navigateToPreviousMonth,
        );
        nextBtn.addEventListener("click", calendarControl.navigateToNextMonth);
        todayDate.addEventListener(
          "click",
          calendarControl.navigateToCurrentMonth
        );
        for (var i = 0; i < dateNumber.length; i++) {
            dateNumber[i].addEventListener(
              "click",
              calendarControl.selectDate,
              false
            );
        }
      },
      highlightToday: function () {
        let currentMonth = calendarControl.localDate.getMonth() + 1;
        let changedMonth = calendar.getMonth() + 1;
        let currentYear = calendarControl.localDate.getFullYear();
        let changedYear = calendar.getFullYear();
        if (
          currentYear === changedYear &&
          currentMonth === changedMonth &&
          document.querySelectorAll(".number-item")
        ) {
          document
            .querySelectorAll(".number-item")
            [calendar.getDate() - 1].classList.add("calendar-today");
        }
      },
      plotPrevMonthDates: function(dates){
        dates.reverse();
        for(let i=0;i<dates.length;i++) {
            if(document.querySelectorAll(".prev-dates")) {
                document.querySelectorAll(".prev-dates")[i].textContent = dates[i];
            }
        }
      },
      plotNextMonthDates: function(){
       let childElemCount = document.querySelector('.calendar-body').childElementCount;
       //7 lines
       if(childElemCount > 42 ) {
           let diff = 49 - childElemCount;
           calendarControl.loopThroughNextDays(diff);
       }

       //6 lines
       if(childElemCount > 35 && childElemCount <= 42 ) {
        let diff = 42 - childElemCount;
        calendarControl.loopThroughNextDays(42 - childElemCount);
       }

      },
      loopThroughNextDays: function(count) {
        if(count > 0) {
            for(let i=1;i<=count;i++) {
                document.querySelector('.calendar-body').innerHTML += `<div class="next-dates">${i}</div>`;
            }
        }
      },
      attachEventsOnNextPrev: function () {
        calendarControl.plotDates();
        calendarControl.attachEvents();
      },
      init: function () {
        calendarControl.plotSelectors();
        calendarControl.plotDates();
        calendarControl.attachEvents();
      }
    };
    calendarControl.init();
  }
  
  const calendarControl = new CalendarControl();


async function APICall(URL) { // makes an API request and changes the image
    try
    {
        const res = await fetch(URL);
        if(!res.ok) throw new Error("Error while gathering data");

        const data = await res.json();
        const image = document.getElementById("slika")
        const src = data.media_type === "video" ? data.thumbnail_url : data.hdurl || data.url;
        image.src = src;
    }
    catch(error)
    {
        document.getElementById("slika").src = "./nasa.png";
        console.log(error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    APICall(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&&thumbs=true`);
	console.log(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&&thumbs=true`);
})



