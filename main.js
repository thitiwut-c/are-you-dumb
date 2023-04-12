"use strict"

const noBtnStatic = document.getElementById("no-btn-static")
const noBtnDynamic = document.getElementById("no-btn-dynamic")

function hide(e) {
    e.target.setAttribute("style", "opacity: 0;")

    noBtnStatic.removeEventListener("mouseenter", hide)
    noBtnStatic.removeEventListener("click", handleNo)

    // Show button.
    noBtnDynamic.setAttribute("style", "")
    noBtnDynamic.addEventListener("mouseenter", moveAway)
    noBtnDynamic.dispatchEvent(new MouseEvent("mouseenter"))
}

noBtnStatic.addEventListener("mouseenter", hide)

function moveAway(e) {
    const { top: oldY, left: oldX } = e.target.getBoundingClientRect()
    const { offsetHeight: btnH, offsetWidth: btnW } = e.target
    const { innerHeight: wh, innerWidth: ww } = window
    const maxH = wh - btnH
    const maxW = ww - btnW

    let newX, newY

    for (let isOverlap = true; isOverlap; ) {
        newX = Math.random() * (maxW + 1)
        newY = Math.random() * (maxH + 1)

        const isLeftOverlap = newX + btnW >= oldX && oldX >= newX
        const isRightOverlap = newX <= oldX + btnW && newX >= oldX
        const isTopOverlap = newY + btnH >= oldY && oldY >= newY
        const isBottomOverlap = newY <= oldY + btnH && newY >= oldY

        const isOverlapX = isLeftOverlap || isRightOverlap
        const isOverlapY = isTopOverlap || isBottomOverlap

        isOverlap = isOverlapX && isOverlapY
    }

    const style = `position: absolute; top: ${newY}px; left: ${newX}px;`

    e.target.setAttribute("style", style)
}

function handleNo() {
    alert("Either you are not dumb 👍 or you are a mobile phone user 👎.")
}

noBtnStatic.addEventListener("click", handleNo)
noBtnDynamic.addEventListener("click", handleNo)

function handleYes() {
    alert("Yes, you are dumb. 🤣")
}

document.getElementById("yes-btn").addEventListener("click", handleYes)

function moveButtonOnResize() {
    noBtnDynamic.dispatchEvent(new MouseEvent("mouseenter"))
}

window.addEventListener("resize", moveButtonOnResize)
