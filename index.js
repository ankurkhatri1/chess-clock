let timer1, timer2;
let time1 = 0;
let time2 = 0;
let activePlayer = null;
let increment1 = 0;
let increment2 = 0;

function updateTimeDisplay() {
    const displayTime1 = new Date(time1 * 1000).toISOString().substr(14, 5);
    const displayTime2 = new Date(time2 * 1000).toISOString().substr(14, 5);
    document.getElementById('time1').innerText = displayTime1;
    document.getElementById('time2').innerText = displayTime2;
    if (time1 === 0) {
        document.getElementById('timer-container-1').classList.add('timer-zero');
    } else {
        document.getElementById('timer-container-1').classList.remove('timer-zero');
    }

    if (time2 === 0) {
        document.getElementById('timer-container-2').classList.add('timer-zero');
    } else {
        document.getElementById('timer-container-2').classList.remove('timer-zero');
    }
}

function switchTurns() {
    if (activePlayer === 'player1') {
        clearInterval(timer1);
        activePlayer = 'player2';
        document.getElementById('time1').classList.remove('player1-timer');
        document.getElementById('time2').classList.add('player2-timer');
        if (time2 > 0) {
            timer2 = setInterval(function () {
                if (time2 > 0) {
                    time2--;
                    updateTimeDisplay();
                } else {
                    clearInterval(timer2);
                    showResetConfirmation();
                }
            }, 1000);
        }
    } else if (activePlayer === 'player2') {
        clearInterval(timer2);
        activePlayer = 'player1';
        document.getElementById('time2').classList.remove('player2-timer');
        document.getElementById('time1').classList.add('player1-timer');
        if (time1 > 0) {
            timer1 = setInterval(function () {
                if (time1 > 0) {
                    time1--;
                    updateTimeDisplay();
                } else {
                    clearInterval(timer1);
                    showResetConfirmation();
                }
            }, 1000);
        }
    }
    const clickSound = document.getElementById('clickSound');
    clickSound.currentTime = 0; // Reset to the beginning
    clickSound.play();
}

function showResetConfirmation() {
    if (window.confirm('Reset Clock?')) {
        resetClock();
    } else {
        updateTimeDisplay();
    }
}

function startClock(player) {
    if (player === 'player1') {
        if (activePlayer !== 'player1' && time1 > 0) {
            activePlayer = 'player1';
            document.getElementById('time2').classList.remove('player2-timer');
            document.getElementById('time1').classList.add('player1-timer');
            clearInterval(timer2);
            timer1 = setInterval(function () {
                if (time1 > 0) {
                    time1--;
                    updateTimeDisplay();
                } else {
                    clearInterval(timer1);
                    showResetConfirmation();
                }
            }, 1000);
        }
    } else if (player === 'player2') {
        if (activePlayer !== 'player2' && time2 > 0) {
            activePlayer = 'player2';
            document.getElementById('time1').classList.remove('player1-timer');
            document.getElementById('time2').classList.add('player2-timer');
            clearInterval(timer1);
            timer2 = setInterval(function () {
                if (time2 > 0) {
                    time2--;
                    updateTimeDisplay();
                } else {
                    clearInterval(timer2);
                    showResetConfirmation();
                }
            }, 1000);
        }
    }
}

function setCustomTime(player) {
    const minutes = parseInt(document.getElementById(`${player}-minutes`).value) || 0;
    const seconds = parseInt(document.getElementById(`${player}-seconds`).value) || 0;

    let totalSeconds = minutes * 60 + seconds;

    if (player === 'player1') {
        time1 = totalSeconds;
    } else if (player === 'player2') {
        time2 = totalSeconds;
    }

    updateTimeDisplay();
}

function setIncrement(player) {
    const incrementMinutes = parseInt(document.getElementById(`${player}-increment-minutes`).value) || 0;
    const incrementSeconds = parseInt(document.getElementById(`${player}-increment-seconds`).value) || 0;

    let totalIncrementSeconds = incrementMinutes * 60 + incrementSeconds;

    if (player === 'player1') {
        increment1 = totalIncrementSeconds;
    } else if (player === 'player2') {
        increment2 = totalIncrementSeconds;
    }
}

function applyIncrement(player) {
    if (player === 'player1' && time1 > 0) {
        time1 += increment1;
    } else if (player === 'player2' && time2 > 0) {
        time2 += increment2;
    }
}

function resetClock() {
    time1 = 0;
    time2 = 0;
    increment1 = 0;
    increment2 = 0;
    activePlayer = null;
    updateTimeDisplay();
    clearInterval(timer1);
    clearInterval(timer2);
    hideOptions('player1');
    hideOptions('player2');
}

function hideOptions(player) {
    document.getElementById(`${player}-options`).style.display = 'none';
}

function showOptions(player) {
    document.getElementById(`${player}-options`).style.display = 'flex';
}

document.getElementById('player1').addEventListener('click', function () {
    if (activePlayer === 'player1' && time1 === 0) {
        showResetConfirmation();
    } else if (activePlayer === 'player1') {
        switchTurns();
        startClock('player1');
        applyIncrement('player1');
    } else {
        startClock('player1');
        hideOptions('player2');
        showOptions('player1');
    }
});

document.getElementById('player2').addEventListener('click', function () {
    if (activePlayer === 'player2' && time2 === 0) {
        showResetConfirmation();
    } else if (activePlayer === 'player2') {
        switchTurns();
        startClock('player2');
        applyIncrement('player2');
    } else {
        startClock('player2');
        hideOptions('player1');
        showOptions('player2');
    }
});

document.getElementById('setBtn1').addEventListener('click', function () {
    setCustomTime('player1');
    hideOptions('player1');
});

document.getElementById('setBtn2').addEventListener('click', function () {
    setCustomTime('player2');
    hideOptions('player2');
});

document.getElementById('setIncrementBtn1').addEventListener('click', function () {
    setIncrement('player1');
    hideOptions('player1');
});

document.getElementById('setIncrementBtn2').addEventListener('click', function () {
    setIncrement('player2');
    hideOptions('player2');
});

document.getElementById('editBtn1').addEventListener('click', function () {
    toggleOptions('player1');
});

document.getElementById('editBtn2').addEventListener('click', function () {
    toggleOptions('player2');
});

function toggleOptions(player) {
    if (activePlayer === null) {
        const optionsContainer = document.getElementById(`${player}-options`);
        if (optionsContainer.style.display === 'none') {
            optionsContainer.style.display = 'flex';
        } else {
            optionsContainer.style.display = 'none';
        }
    }
}

document.getElementById('time1').addEventListener('click', function () {
    if (activePlayer === 'player1' && time1 === 0) {
        showResetConfirmation();
    } else if (activePlayer === 'player1') {
        switchTurns();
        applyIncrement('player1');
    } else {
        startClock('player1');
        hideOptions('player2');
    }
});

document.getElementById('time2').addEventListener('click', function () {
    if (activePlayer === 'player2' && time2 === 0) {
        showResetConfirmation();
    } else if (activePlayer === 'player2') {
        switchTurns();
        applyIncrement('player2');
    } else {
        startClock('player2');
        hideOptions('player1');
    }
});


// Initialize the clock display
updateTimeDisplay();
