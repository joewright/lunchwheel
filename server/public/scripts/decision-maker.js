(function() {
    var pickerClicker = document.getElementById('picker-clicker');
    var pickerContainer = document.getElementById('pick-container');
    var pickInput = document.getElementById('latest-pick-input');
    var listContainer = document.getElementById('choices');
    var latestPick = document.getElementById('latest-pick');
    var choices = [];
    var timer;

    for (let x = 0; x < listContainer.children.length; x++) {
        choices.push(listContainer.children[x].getAttribute('data-val'));
    }
    pickerClicker.addEventListener('click', pickAWinner);

    function pickAWinner() {
        var choice = choices[Math.floor(Math.random() * choices.length)];
        pickInput.setAttribute('value', choice);
        latestPick.className = '';
        pickerContainer.className = '';
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function() {
            latestPick.innerText = choice;
            latestPick.className = 'animated lightSpeedIn';
        }, 10);
    }
})();