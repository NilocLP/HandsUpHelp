pageInit();
function pageInit() {
    let navbar = document.getElementsByTagName("hu-navbar")[0];
    navbar.addEventListener("navbarused", handleNavbar);
}
function handleNavbar(e) {
    switch (e.detail.id) {
        case "navbar_stats":
            window.location.href = "../statistics/statistics.html";
            break;
        case "navbar_calender":
            window.location.href = "../calender/calender.html";
    }
}
//# sourceMappingURL=settings.js.map