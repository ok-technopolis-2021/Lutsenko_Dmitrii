document.addEventListener("DOMContentLoaded", function(event) {
    document.querySelector("#portfolio-card-theme-switcher").addEventListener('click', changeTheme);
});

function changeTheme() {
    const bodyCardClassList = document.querySelector("body").classList;
    bodyCardClassList.toggle("dark-theme");
    bodyCardClassList.toggle("light-theme");
}
