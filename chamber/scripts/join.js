document.addEventListener("DOMContentLoaded", () => {
    
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        const now = new Date();
        timestampField.value = now.toISOString();
    }

    
    const menuButton = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            const isOpen = !mobileMenu.hasAttribute('hidden');
            if (isOpen) {
                mobileMenu.setAttribute('hidden', '');
                menuButton.setAttribute('aria-expanded', 'false');
            } else {
                mobileMenu.removeAttribute('hidden');
                menuButton.setAttribute('aria-expanded', 'true');
            }
        });
    }

    
    const openButtons = document.querySelectorAll(".open-modal");
    const modals = document.querySelectorAll(".modal");
    const closeButtons = document.querySelectorAll(".close-modal");

    
    openButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.removeAttribute("hidden");
                modal.querySelector(".close-modal").focus();
            }
        });
    });

    
    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest(".modal");
            if (modal) {
                modal.setAttribute("hidden", "");
            }
        });
    });

    
    modals.forEach(modal => {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.setAttribute("hidden", "");
            }
        });
    });

    
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            modals.forEach(modal => {
                if (!modal.hasAttribute("hidden")) {
                    modal.setAttribute("hidden", "");
                }
            });
        }
    });
});
