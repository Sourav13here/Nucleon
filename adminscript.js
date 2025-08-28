// Simple JavaScript for interactive elements
document.addEventListener('DOMContentLoaded', function () {
    // Tab selection
    const navItems = document.querySelectorAll('.nav-item a');
    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Simulate loading data
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(number => {
        const target = parseInt(number.textContent);
        let count = 0;
        const duration = 1500; // ms
        const steps = 50;
        const increment = target / steps;
        const stepTime = duration / steps;

        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                number.textContent = target;
                clearInterval(timer);
            } else {
                number.textContent = Math.round(count);
            }
        }, stepTime);
    });
});
