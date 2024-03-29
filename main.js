"use strict"

let isMouseEntered = false

const noBtnStatic = document.getElementById("no-btn-static")
const noBtnDynamic = document.getElementById("no-btn-dynamic")

function handleFirstMouseEnter(e) {
    isMouseEntered = true
    e.target.setAttribute("style", "opacity: 0;")

    noBtnStatic.removeEventListener("mouseenter", handleFirstMouseEnter)
    noBtnStatic.removeEventListener("click", handleNo)

    // Show button.
    const { x, y } = noBtnStatic.getBoundingClientRect()
    noBtnDynamic.setAttribute(
        "style",
        `position: absolute; top: ${y}px; left: ${x}px; transition: top 0.25s, left 0.25s;`,
    )
    noBtnDynamic.addEventListener("mouseenter", moveAway)
}

noBtnStatic.addEventListener("mouseenter", handleFirstMouseEnter)

function moveAway(e) {
    console.log("TOUCHED")
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

    const style = `top: ${newY}px; left: ${newX}px; transition: top 0.25s, left 0.25s;`

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
    if (!isMouseEntered) {
        const { x, y } = noBtnStatic.getBoundingClientRect()
        noBtnDynamic.setAttribute(
            "style",
            `top: ${y}px; left: ${x}px; z-index: -1;`,
        )

        return
    }

    const { x, y, width, height } = noBtnDynamic.getBoundingClientRect()
    const { innerHeight: wh, innerWidth: ww } = window
    const isOverlapViewportRight = Math.round(x + width) >= ww
    const isOverlapViewportBottom = Math.round(y + height) >= wh

    if (!isOverlapViewportBottom && !isOverlapViewportRight) {
        return
    }

    noBtnDynamic.dispatchEvent(new MouseEvent("mouseenter"))
}

window.addEventListener("resize", moveButtonOnResize)
