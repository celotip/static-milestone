const pics = document.querySelectorAll(".pic")
const pic = document.querySelectorAll(".pic > img")
const numImages = pics.length - 1
const zeroClone = document.querySelector(".zero")
const lastClone = document.querySelector(".last")
const picLast = pic[numImages].cloneNode(true)
const pic0 = pic[0].cloneNode(true)
zeroClone.appendChild(picLast)
lastClone.appendChild(pic0)

const next = document.querySelector(".next")
const prev = document.querySelector(".prev")
const slides = document.querySelector(".slides")

next.addEventListener('click', (e) => {
    e.preventDefault()
    let active = Number(slides.dataset.active)
    const prevSlide = document.querySelector(`.paging li:nth-child(${active}) a`)
    prevSlide.classList.remove("current-page")
    if (active === numImages + 1) {
        active += 1
        slides.style.transition = "0.5s"
        slides.style.transform = `translate3d(${-1000*active}px, 0px, 0px)`
        const currentSlide = document.querySelector(`.paging li:nth-child(1) a`)
        currentSlide.classList.add("current-page")
        next.disabled = true
        let timeout;

        function afterTimeout() {
            timeout = setTimeout(after, 520);
        }

        function after() {
            active = 1
            slides.style.transition = "0s"
            slides.dataset.active = active
            slides.style.transform = `translate3d(${-1000*active}px, 0px, 0px)`
            next.disabled = false
            const currentSlide = document.querySelector(`.paging li:nth-child(${active}) a`)
            currentSlide.classList.add("current-page")
        }

        afterTimeout()
    } else {
        active += 1
        slides.style.transition = "0.5s"
        slides.dataset.active = active
        slides.style.transform = `translate3d(${-1000*active}px, 0px, 0px)`
        const currentSlide = document.querySelector(`.paging li:nth-child(${active}) a`)
        currentSlide.classList.add("current-page")
    }
})

prev.addEventListener('click', (e) => {
    e.preventDefault()
    let active = Number(slides.dataset.active)
    const prevSlide = document.querySelector(`.paging li:nth-child(${active}) a`)
    prevSlide.classList.remove("current-page")
    if (active > 1) {
        active -= 1
        slides.style.transition = "0.5s"
        slides.dataset.active = active
        slides.style.transform = `translate3d(${-1000*active}px, 0px, 0px)`
        const currentSlide = document.querySelector(`.paging li:nth-child(${active}) a`)
        currentSlide.classList.add("current-page")
    } else {
        active -= 1
        slides.style.transition = "0.5s"
        slides.style.transform = `translate3d(${-1000*active}px, 0px, 0px)`
        prev.disabled = true
        const currentSlide = document.querySelector(`.paging li:nth-child(${numImages + 1}) a`)
        currentSlide.classList.add("current-page")
        let timeout;

        function afterTimeout() {
            timeout = setTimeout(after, 520);
        }

        function after() {
            active = numImages + 1
            slides.style.transition = "0s"
            slides.dataset.active = active
            slides.style.transform = `translate3d(${-1000*active}px, 0px, 0px)`
            prev.disabled = false
        }

        afterTimeout()
    }
})

let timeout;

function autoNext() {
    timeout = setTimeout(() => {
        nextPress();
        autoNext();
    }, 5000);
}

function nextPress() {
    next.click()
}

autoNext()

const paging = document.querySelector(".paging")
for (i = 0; i < pic.length; i++) {
    const li = document.createElement("li")
    const a = document.createElement("a")
    a.setAttribute("href", "#")
    a.setAttribute("data-page", i + 1)
    li.appendChild(a)
    paging.appendChild(li)
}

const currentSlide = document.querySelector(`.paging li:nth-child(1) a`)
currentSlide.classList.add("current-page")

const pageSelectors = document.querySelectorAll(`.paging li a`)
pageSelectors.forEach((pageSelector) => {
    pageSelector.addEventListener("click", (e) => {
        e.preventDefault()
        while (true) {
            let currentSlide = document.querySelector(`.current-page`)
            if (Number(pageSelector.dataset.page) < Number(currentSlide.dataset.page)) {
                prev.click()
            } else {
                next.click()
            }
            currentSlide = document.querySelector(`.current-page`)
            if (pageSelector.dataset.page === currentSlide.dataset.page) {
                break
            }
        }
    })  
})