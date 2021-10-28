function changeTheme() {
    let portfolioCardClassList = document.querySelector("#portfolio-card").classList;
    portfolioCardClassList.toggle("dark-theme");
    portfolioCardClassList.toggle("light-theme");
}

document.querySelector("#portfolio-card-theme-switcher").addEventListener('click', changeTheme);
