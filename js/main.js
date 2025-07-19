import { initSharingTooltip, getArticleTodaysDate } from "./article-tooltip.js";

/**
 * Initialise the tooltip social sharing component
 * @returns {void}
 */
 const init = () => {
    initSharingTooltip();
    getArticleTodaysDate();
}

document.addEventListener('DOMContentLoaded', init);
