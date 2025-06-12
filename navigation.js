// Navigation script for KinoDeutsch presentation
const slides = [
    'title_slide.html',
    'vision_mission.html', 
    'founders_team.html',
    'product_overview.html',
    'key_features.html',
    'market_opportunity.html',
    'business_model.html',
    'competitive_advantage.html',
    'financial_projections.html',
    'call_to_action.html'
];

const slideNames = [
    'KinoDeutsch',
    'Vision & Mission',
    'Gründerteam', 
    'Produkt & Dienstleistung',
    'Hauptfunktionen',
    'Marktchancen',
    'Geschäftsmodell',
    'Wettbewerbsvorteile',
    'Finanzprognosen',
    'Nächste Schritte'
];

function getCurrentSlideIndex() {
    const currentPage = window.location.pathname.split('/').pop();
    return slides.indexOf(currentPage);
}

function navigateToSlide(index) {
    if (index >= 0 && index < slides.length) {
        window.location.href = slides[index];
    }
}

function addNavigationElements() {
    const currentIndex = getCurrentSlideIndex();
    if (currentIndex === -1) return; // Not on a slide page
    
    // Add navigation buttons
    const prevButton = document.createElement('button');
    prevButton.className = 'nav-button nav-prev';
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.onclick = () => navigateToSlide(currentIndex - 1);
    prevButton.style.display = currentIndex > 0 ? 'block' : 'none';
    
    const nextButton = document.createElement('button');
    nextButton.className = 'nav-button nav-next';
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.onclick = () => navigateToSlide(currentIndex + 1);
    nextButton.style.display = currentIndex < slides.length - 1 ? 'block' : 'none';
    
    // Add slide counter
    const counter = document.createElement('div');
    counter.className = 'slide-counter';
    counter.innerHTML = `${currentIndex + 1} / ${slides.length} - ${slideNames[currentIndex]}`;
    
    // Add menu
    const menu = document.createElement('div');
    menu.className = 'slide-menu';
    menu.innerHTML = `
        <button class="menu-button" onclick="toggleMenu()">
            <i class="fas fa-bars mr-2"></i>Menu
        </button>
        <div class="menu-dropdown" id="menuDropdown">
            ${slides.map((slide, index) => 
                `<a href="${slide}" class="menu-item ${index === currentIndex ? 'bg-red-600' : ''}">
                    ${index + 1}. ${slideNames[index]}
                </a>`
            ).join('')}
            <hr class="border-gray-600 my-2">
            <a href="index.html" class="menu-item">
                <i class="fas fa-home mr-2"></i>Startseite
            </a>
        </div>
    `;
    
    document.body.appendChild(prevButton);
    document.body.appendChild(nextButton);
    document.body.appendChild(counter);
    document.body.appendChild(menu);
}

function toggleMenu() {
    const dropdown = document.getElementById('menuDropdown');
    dropdown.classList.toggle('show');
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const menu = document.querySelector('.slide-menu');
    const dropdown = document.getElementById('menuDropdown');
    if (dropdown && !menu.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    const currentIndex = getCurrentSlideIndex();
    if (currentIndex === -1) return;
    
    switch(event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
            if (currentIndex > 0) navigateToSlide(currentIndex - 1);
            break;
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ': // Spacebar
            if (currentIndex < slides.length - 1) navigateToSlide(currentIndex + 1);
            break;
        case 'Home':
            navigateToSlide(0);
            break;
        case 'End':
            navigateToSlide(slides.length - 1);
            break;
        case 'Escape':
            window.location.href = 'index.html';
            break;
    }
});

// Initialize navigation when page loads
document.addEventListener('DOMContentLoaded', addNavigationElements);

