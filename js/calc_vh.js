let current_zoom_level = 1;
let is_touch_screen = false;

function is_mobile_or_tablet_device() {
    // First check if it's an iPad specifically
    if (/iPad/i.test(navigator.userAgent) || 
        // Check for iPad in desktop mode which reports as Mac
        (/Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 0)) {
        return true;
    }
    // Then check other mobile/tablet devices
    return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function calculate_zoom_level() {
    if (is_touch_screen || is_mobile_or_tablet_device()) {
        return 1;
    }

    const zoom_factor = window.devicePixelRatio;
    return Math.round(zoom_factor * 100) / 100;
}

function update_zoom_level() {
    is_touch_screen = "ontouchstart" in document.documentElement;
    
    const new_zoom_level = calculate_zoom_level();
    if (new_zoom_level !== current_zoom_level) {
        current_zoom_level = new_zoom_level;
        calculate_vh();
        console.log(`Zoom level: ${current_zoom_level}`);
    }
}

function calculate_vh() {
    const viewport_height = current_zoom_level >= 1 ? window.outerHeight <= window.innerHeight ? window.outerHeight : window.innerHeight : window.innerHeight;
    const viewport_width = current_zoom_level >= 1 ? window.outerWidth <= window.innerWidth ? window.outerWidth : window.innerWidth : window.innerWidth;
  
    const is_landscape_small_device = window.matchMedia("(orientation: landscape) and (max-width: 1000px)").matches;
  
    const base_dimension = !is_landscape_small_device ? viewport_height : viewport_width;

    const adjusted_dimension = (base_dimension * 0.01) * ((is_touch_screen || is_mobile_or_tablet_device()) ? 1 : current_zoom_level);
    document.documentElement.style.setProperty('--vh', adjusted_dimension + 'px');
}

is_touch_screen = "ontouchstart" in document.documentElement;

update_zoom_level();
calculate_vh();

window.addEventListener('resize', () => {
    update_zoom_level();
    calculate_vh();
});

window.addEventListener('orientationchange', () => {
    update_zoom_level();
    calculate_vh();
});