// Title och theme selector
document.addEventListener('DOMContentLoaded', function() {
    // Custom title
    const title = "RatarInvo";
    const titleLength = title.length;
    let index = 0;
    let direction = 1;

    function update_title() {
        if (index != 0) {
            document.title = title.substring(0, index);
        } else {
            document.title = '\u200E';
        }

        if (direction === 1) {
            index++;
            if (index > titleLength) {
                index = titleLength;
                direction = -1;
            }
        } else {
            index--;
            if (index < 0) {
                index = 0;
                direction = 1;
            }
        }
    }

    setInterval(update_title, 400);

    var theme_toggle = document.getElementById('theme');
    var icon = theme_toggle.querySelector('i');
    var root = document.documentElement;

    function update_filter() {
        if (root.classList.contains('dark-theme')) {
            root.style.setProperty('--filter', '1');
        } else if (root.classList.contains('light-theme')) {
            root.style.setProperty('--filter', '0');
        }
    }

    function detect_color_scheme() {
        const is_dark_mode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const is_light_mode = window.matchMedia('(prefers-color-scheme: light)').matches;

        if (is_dark_mode) {
            return 'dark';
        } else if (is_light_mode) {
            return 'light';
        } else {
            return 'no-preference';
        }
    }

    var saved_theme = localStorage.getItem('theme');
    
    if (saved_theme === 'light') {
        root.classList.add('light-theme');
        root.classList.remove('dark-theme');
        icon.className = 'bi bi-brightness-high';
    } else if (saved_theme === 'dark') {
        root.classList.add('dark-theme');
        root.classList.remove('light-theme');
        icon.className = 'bi bi-moon-stars';
    } else {
        var userPreference = detect_color_scheme();
        if (userPreference === 'dark') {
            root.classList.add('dark-theme');
            root.classList.remove('light-theme');
            icon.className = 'bi bi-moon-stars';
        } else {
            root.classList.add('light-theme');
            root.classList.remove('dark-theme');
            icon.className = 'bi bi-brightness-high';
        }
    }

    update_filter();

    theme_toggle.addEventListener('click', function() {
        if (root.classList.contains('light-theme')) {
            root.classList.remove('light-theme');
            root.classList.add('dark-theme');
            icon.className = 'bi bi-moon-stars';
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark-theme');
            root.classList.add('light-theme');
            icon.className = 'bi bi-brightness-high';
            localStorage.setItem('theme', 'light');
        }
        update_filter();
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
        if (event.matches) {
            root.classList.add('dark-theme');
            root.classList.remove('light-theme');
            icon.className = 'bi bi-moon-stars';
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.add('light-theme');
            root.classList.remove('dark-theme');
            icon.className = 'bi bi-brightness-high';
            localStorage.setItem('theme', 'light');
        }
    });

    function display_time() {
        const current_time = new Date();
        const hours = current_time.getHours().toString().padStart(2, '0');
        const minutes = current_time.getMinutes().toString().padStart(2, '0');
        const seconds = current_time.getSeconds().toString().padStart(2, '0');
        const time_string = `${hours}:${minutes}:${seconds}`;

        document.getElementById("display_time").innerText = time_string;
    }

    setInterval(display_time, 400);

    window.onload = display_time;
});

//animation
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.about_me_info_1, .about_me_info_2, .Interests');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    });

    elements.forEach(element => {
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
});