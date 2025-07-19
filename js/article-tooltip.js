const $ = selector => document.querySelector(selector);
let hasAttachedTooltipListener = false;

/**
 * Determines if the current screen is mobile or desktop
 * @returns {Boolean} 'true' if the screen size is mobile screen, otherwise false
 */
const isMobileScreen = () => window.innerWidth <= 768;

/**
 * Sets the aria attributes based on the element's visibility
 * @param {HTMLElement} selector - The element to update the the Aria attributes
 * @param {Boolean} isVisible - Wether the element is visible
 * @return {void} 
 */
const setAriaVisibility = (selector, isVisible) => {
    selector.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
    selector.setAttribute('aria-expanded', isVisible ? 'true' : 'false');
}

/**
 * Update the element's class and Aria attributes
 * based on the element's visibility and screen size
 * @param {HTMLElement} tooltipDesk - The desktop tooltip element
 * @param {HTMLElement} tooltipMob - The mobile tooltip element
 * @returns {void}
 */
const toggleTooltip = (tooltipDesk, tooltipMob) => {
    if (!tooltipDesk || !tooltipMob) {
        return;
    }

    if (!isMobileScreen()) {
        tooltipMob.classList.remove('show');
        tooltipDesk.classList.toggle('show');
    } else {
        tooltipDesk.classList.remove('show');
        tooltipMob.classList.toggle('show');
    }

    const isDesktopVisible = tooltipDesk.classList.contains('show');
    const isMobileVisible = tooltipMob.classList.contains('show');

    tooltipMob.setAttribute('data-is-open', isMobileVisible ? 'true' : 'false');
    setAriaVisibility(tooltipMob, isMobileVisible);
    setAriaVisibility(tooltipDesk, isDesktopVisible);
}

/**
 * Adds click events listener to the given selectors to toggle the tooltip visibility
 * @param {String} selector - Array of css selectors to attach the event handlers
 * @param {HTMLElement} tooltipDesk - The desktop tooltip element
 * @param {HTMLElement} tooltipMob - The mobile tooltip element
 * @returns 
 */
const addEventHandlers = (selectors, tooltipDesk, tooltipMob) => {
    if (!selectors) {
        return;
    }

    selectors.forEach(btn => {
        const sharingBtn = $(btn);
        if (sharingBtn) {
            sharingBtn.addEventListener('click', e => {
                e.preventDefault();
                toggleTooltip(tooltipDesk, tooltipMob);
            })
        }
    });
}

/**
 * Initialises a click event on the document to handle closing of tooltips
 * when clicking out of the targeted element
 * @param {HTMLElement} tooltipDesk - The desktop tooltip element
 * @param {HTMLElement} tooltipMob - The mobile tooltip element
 * @param {HTMLElement} shareButton - The sharing button element that triggers the tooltip
 * @returns {void}
 */
const reInitEventHandlers = (tooltipDesk, tooltipMob, shareButton) => {
    if (hasAttachedTooltipListener) {
        return;
    }

    hasAttachedTooltipListener = true;

    if (!tooltipDesk || !tooltipMob || !shareButton) return;

    document.addEventListener('click', e => {
        const isShareButtonClicked = shareButton.contains(e.target);
        const isClickedInsideDesktop = tooltipDesk.contains(e.target) || isShareButtonClicked;
        if (!isClickedInsideDesktop) {
            tooltipDesk.classList.remove('show');
            setAriaVisibility(tooltipDesk, false);
        }

        const isClickedInsideMobileContainer = tooltipMob.contains(e.target);
        if (isMobileScreen()) {
            if (!isClickedInsideMobileContainer && !isShareButtonClicked) {
                tooltipMob.classList.remove('show');
                tooltipMob.setAttribute('data-is-open', 'false');
                setAriaVisibility(tooltipMob, false);
            }
        }
    });
}

/**
 * Ensures the tooltip class and aria attributes are updated on mobile and desktop
 * based on the element visibility and hidden status
 * @param {HTMLElement} tooltipDesk - The desktop tooltip element
 * @param {HTMLElement} tooltipMob - The mobile tooltip element
 * @returns {void}
 */
const hideTooltips = (tooltipDesk, tooltipMob) => {
    if (!tooltipDesk || !tooltipMob) {
        return;
    }

    tooltipDesk.classList.remove('show');
    setAriaVisibility(tooltipDesk, false);

    tooltipMob.classList.remove('show');
    tooltipMob.setAttribute('data-is-open', 'false');
    setAriaVisibility(tooltipMob, false);
}

/**
 * Initialises the tooltip element
 * @return {void}
 */
const initSharingTooltip = () => {
    const tooltipDesk = $('.sharing-tooltip');
    const tooltipMob = $('.article-sharing-wrapper-mobile');
    const shareButton = $('.share-button');
    const sharingButtonsSelectors = ['.share-button', '.share-button-mobile'];
    addEventHandlers(sharingButtonsSelectors, tooltipDesk, tooltipMob);
    reInitEventHandlers(tooltipDesk, tooltipMob, shareButton);

    let timer;
    window.addEventListener('resize', () => {
        clearTimeout(timer);
        timer = setTimeout(() => hideTooltips(tooltipDesk, tooltipMob), 100);
    });
}

/**
 * Fetches and append the current date to the DOM element
 * in the following format (day / month / year)
 * @returns {void}
 */
const getArticleTodaysDate = () => {
    const timeStamp = $('.article-time-stamp');
    if (!timeStamp) return;

    const date = new Date();
    const dateOptions = {day: 'numeric', month: 'long', year: 'numeric'};
    timeStamp.innerHTML = date.toLocaleDateString('en-US', dateOptions);
}

export { initSharingTooltip, getArticleTodaysDate };
