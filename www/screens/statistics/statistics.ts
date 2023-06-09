pageInit();

function pageInit() {
    let navbar = document.getElementsByTagName("hu-navbar")[0];
    navbar.addEventListener("navbarused",handleNavbar);
}

function handleNavbar(e){
    switch (e.detail.id){
        case "navbar_calender":
            window.location.href = "../calender/calender.html";
            break;
        case "navbar_settings":
            window.location.href = "../settings/settings.html"
    }
}

