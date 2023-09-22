document.addEventListener('DOMContentLoaded', function() {
    const radarButton = document.getElementById('radarButton');
    const resultContainer = document.getElementById('resultContainer');
    const resultElement = document.getElementById('result');
    const circleContainer = document.getElementById('circleContainer');

    const targetNumbers = [ 1.14, 3.43, 1.27]; // Задайте желаемые целевые числа здесь
    let currentIndex = 0;

    radarButton.addEventListener('click', function() {
        resultElement.textContent = '0.00';
        resultContainer.style.display = 'block';
        circleContainer.innerHTML = '';

        simulateRadarSearch(targetNumbers[currentIndex]);
        currentIndex = (currentIndex + 1) % targetNumbers.length; // Переход к следующему числу в массиве
    });

    function simulateRadarSearch(targetNumber) {
        let currentNumber = 0;
        const interval = setInterval(function() {
            resultElement.textContent = currentNumber.toFixed(2);
            currentNumber += 0.09;

            if (currentNumber > targetNumber) {
                clearInterval(interval);
                resultElement.textContent = targetNumber.toFixed(2);
                circleContainer.innerHTML = '';
            } else {
                createCircle();
            }
        }, 100);
    }

    function createCircle() {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        circle.style.left = radarButton.offsetLeft + radarButton.offsetWidth / 2 + 'px';
        circle.style.top = radarButton.offsetTop + radarButton.offsetHeight / 2 + 'px';
        circleContainer.appendChild(circle);
    }
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
}
