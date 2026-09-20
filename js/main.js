/* =========================================================
   LAHEMA LABOUR CONSULTANCY
   GLOBAL JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const primaryNavigation = document.querySelector(".primary-navigation");

    if (menuToggle && primaryNavigation) {
        menuToggle.addEventListener("click", () => {
            const isOpen = primaryNavigation.classList.toggle("is-open");

            menuToggle.classList.toggle("is-open", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );
        });

        /* Close mobile menu after selecting a link */

        const navigationLinks =
            primaryNavigation.querySelectorAll("a");

        navigationLinks.forEach((link) => {
            link.addEventListener("click", () => {
                primaryNavigation.classList.remove("is-open");

                menuToggle.classList.remove("is-open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            });
        });

        /* Close menu when clicking outside */

        document.addEventListener("click", (event) => {
            const clickedInsideNavigation =
                primaryNavigation.contains(event.target);

            const clickedMenuButton =
                menuToggle.contains(event.target);

            if (
                !clickedInsideNavigation &&
                !clickedMenuButton &&
                primaryNavigation.classList.contains("is-open")
            ) {
                primaryNavigation.classList.remove("is-open");

                menuToggle.classList.remove("is-open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            }
        });

        /* Close mobile menu when returning to desktop */

        window.addEventListener("resize", () => {
            if (window.innerWidth > 760) {
                primaryNavigation.classList.remove("is-open");

                menuToggle.classList.remove("is-open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            }
        });
    }


    /* =========================================
       HEADER SCROLL STATE
    ========================================= */

    const header = document.querySelector(".site-header");

    if (header) {
        const updateHeader = () => {
            header.classList.toggle(
                "is-scrolled",
                window.scrollY > 20
            );
        };

        updateHeader();

        window.addEventListener(
            "scroll",
            updateHeader,
            {
                passive: true
            }
        );
    }


    /* =========================================
       CURRENT YEAR
    ========================================= */

    const yearElements =
        document.querySelectorAll("[data-current-year]");

    yearElements.forEach((element) => {
        element.textContent =
            new Date().getFullYear();
    });


    /* =========================================
       SMOOTH ANCHOR SCROLLING
    ========================================= */

    const anchorLinks =
        document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId =
                link.getAttribute("href");

            /*
             * Ignore empty placeholder links.
             * These should be replaced with real destinations
             * in the HTML files.
             */

            if (
                !targetId ||
                targetId === "#" ||
                targetId === "#!"
            ) {
                return;
            }

            let target;

            try {
                target =
                    document.querySelector(targetId);
            } catch {
                return;
            }

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            /*
             * Update the URL without forcing
             * another browser jump.
             */

            if (
                window.history &&
                window.history.pushState
            ) {
                window.history.pushState(
                    null,
                    "",
                    targetId
                );
            }
        });
    });


    /* =========================================
       REVEAL ANIMATIONS
    ========================================= */

    const revealElements =
        document.querySelectorAll("[data-reveal]");

    if (
        "IntersectionObserver" in window &&
        revealElements.length
    ) {
        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    });
                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    }


    /* =========================================
       KEYBOARD ESCAPE
       ========================================= */

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            menuToggle &&
            primaryNavigation &&
            primaryNavigation.classList.contains("is-open")
        ) {
            primaryNavigation.classList.remove(
                "is-open"
            );

            menuToggle.classList.remove("is-open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            menuToggle.focus();
        }
    });
});
