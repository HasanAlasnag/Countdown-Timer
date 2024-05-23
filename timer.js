$(document).ready(function () {
    let timer;
    let timeLeft = 25 * 60; // Default 25 minutes
    let running = false;

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function updateTimer() {
        $('#timer').text(formatTime(timeLeft));
    }

    function startTimer(duration) {
        clearInterval(timer);
        timeLeft = duration;
        running = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimer();
            } else {
                clearInterval(timer);
                $('#alarm-sound')[0].play();
                running = false;
            }
        }, 1000);
    }

    $('#start-btn').click(function () {
        if (!running) {
            const customTime = parseInt($('#custom-time').val());
            const duration = customTime ? customTime * 60 : 25 * 60;
            startTimer(duration);
        }
    });

    $('#reset-btn').click(function () {
        clearInterval(timer);
        timeLeft = 25 * 60;
        updateTimer();
        running = false;
    });

    updateTimer();
});