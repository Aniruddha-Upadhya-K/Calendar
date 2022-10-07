//ANALOG CLOCK

var secHand = document.querySelector(".second")
var minHand = document.querySelector(".minute")
var hourHand = document.querySelector(".hour")

var secAngle = 0, minAngle = 0, hourAngle = 0, secMul = 1, minMul = 1, hourMul = 1

function analogAnimation(date) {
    var hour, min, sec
    date = new Date()
    
    sec = date.getSeconds()
    min = date.getMinutes()
    hour = date.getHours()
        
    if(sec == 0)
    secMul += 4
    if(min == 0 && sec==0)
    minMul += 4
    if(hour == 0 && min==0 && sec==0)
    hourMul += 4
    
    secAngle = ((sec / 60) * 360) + (90 * secMul)
    minAngle = ((min / 60) * 360) + (90 * minMul)
    hourAngle = (((hour * 60 * 60) + (min * 60) + sec ) / 120) + (90 * hourMul)
    
    secHand.style.transform = `rotate(${secAngle}deg)`
    minHand.style.transform = `rotate(${minAngle}deg)`
    hourHand.style.transform = `rotate(${hourAngle}deg)`
}

while(true)
{
    let date = new Date()
    if(date.getMilliseconds() == 100)
    {
        setInterval(analogAnimation, 1000, date)
        break
    }
}

const border = document.querySelector(".border")

var dashGap = (2 * Math.PI * 140 / 60)

var dashArray = (2 * Math.PI * 140 / 12) - dashGap

border.style.stroke = "white"
border.style.strokeDasharray = `${dashArray}px,${dashGap}px`
border.style.strokeDashoffset = "0px"

// DIGITAL CLOCK

while(true)
{
    let d = new Date()
    let milli = d.getMilliseconds()
    if(milli == 100)
    {
        setInterval(animation, 1000, d)
        break
    }
}

var prevSec, prevMin, prevHour
prevSec = undefined
prevMin = undefined
prevHour = undefined

function animation(date) {
    date = new Date()

    var sec = document.querySelectorAll(".sec")
    var min = document.querySelectorAll(".min")
    var hr = document.querySelectorAll(".hr")


    prevSec = time(date.getSeconds() ,sec, prevSec)
    prevMin = time(date.getMinutes(), min, prevMin)
    prevHour = time(date.getHours(), hr, prevHour)
}

function time(time, array, prev)
{
    if(prev != undefined)
    {
        if(prev != time)
            animator(array, time)
    }
    else if(prev == undefined)
        animator(array, time)

    function animator(array, time) {
        for(let i=0; i<array.length; i++)
        {
            if(array[i].classList[3] == "focus")
            {
                array[i].classList.remove("focus")
                array[i].classList.add("up")
            }
            else if(array[i].classList[3] == "up")
            {
                array[i].classList.remove("up")
                array[i].classList.add("down")
                array[i].classList.add("noTransition")
            }
            else
            {
                array[i].classList.remove("down")
                array[i].classList.add("focus")
                array[i].classList.remove("noTransition")
                setTimeout(function () {
                array[i].textContent = time
                },  0)
            }
        }
    }

    prev = time
    return prev
}

// Calendar

var cd = new Date()

var monthName = document.querySelector(".monthName")
var year = document.querySelector(".year")
var days = document.querySelector(".dates")


var months = ["January", "february", "march", "april", "may", "june", "july", "august", "septembar", "octobar", "novembar", "decembar"]

var monthNo = cd.getMonth()
var yearNo = cd.getFullYear()

calendar()

function calendar() {

    days.innerHTML=""

    monthName.innerHTML = months[monthNo]
    year.innerHTML = yearNo

    var lastDate = new Date(yearNo ,monthNo+1, 0).getDate()
    var lastDay = new Date(yearNo ,monthNo+1, 0).getDay()
    var lastDatePrevMonth = new Date(yearNo, monthNo, 0).getDate()
    var firstDay = new Date(yearNo, monthNo, 1).getDay()


    for(let i=lastDatePrevMonth-firstDay+1; i<=lastDatePrevMonth; i++)
    {
        let dates = `<div class="prevDates">${i}</div>`
        days.innerHTML += dates
    }

    for(let i = 1; i<=lastDate; i++)
    {
        let dates = `<div class="currentDates">${i}</div>`
        days.innerHTML += dates
    }

    for(let i = lastDay + 1, j=1; i<=6; i++, j++)
    {
        let dates = `<div class="nextDates">${j}</div>`
        days.innerHTML += dates
    }

    if(year.textContent == cd.getFullYear())
    {
        if(monthName.textContent == months[cd.getMonth()])
        {
            let today = document.querySelectorAll(".currentDates")
            today[cd.getDate()-1].classList.add("today")
        }
    }
}

function next() {
    if(monthNo < 11)
    {
        monthNo ++
    }
    else 
    {
        monthNo = 0
        yearNo ++
    }
    calendar()
}

function prev() {
    if(monthNo > 0)
    {
        monthNo -- 
    }
    else 
    {
        monthNo = 11
        yearNo --
    }
    calendar()
}

window.addEventListener("load", () => {
    let inst1 = document.querySelector(".instruction1")
    let inst2 = document.querySelector(".instruction2")

    instruction(inst1, inst2)
})

function instruction(inst1, inst2) {
    let observer1, observer2
    let page1 = document.querySelector(".page1")
    let page2 = document.querySelector(".page2")

    function optionConstructor(page) {
        this.root = page
        this.rootMargin =  "0px"
        this.threshold = 1
    }

    observer1 = new IntersectionObserver(handleIntersect, () => {
        return optionConstructor(page1)
    })

    observer2 = new IntersectionObserver(handleIntersect, () => {
        return optionConstructor(page2)
    })

    observer1.observe(inst1)
    observer2.observe(inst2)
}

function handleIntersect(entries) {
    entries.forEach(entry => {

        if(entry.isIntersecting)
        {
            entry.target.classList.add("animation")
        }
        else
        {
            if(entry.target.classList.length > 1)
            {
                entry.target.classList.remove("animation")
            }
        }
    });
}

