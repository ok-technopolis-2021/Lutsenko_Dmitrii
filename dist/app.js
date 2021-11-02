function changeTheme() {
    let bodyCardClassList = document.querySelector("body").classList;
    bodyCardClassList.toggle("dark-theme");
    bodyCardClassList.toggle("light-theme");
}

document.addEventListener("DOMContentLoaded",  changeTheme);
document.querySelector("#portfolio-card-theme-switcher").addEventListener('click', changeTheme);
