function changeTheme() {
    let portfolioCardClassList = document.querySelector("#portfolio-card").classList
    portfolioCardClassList.toggle("dark-theme")
    portfolioCardClassList.toggle("light-theme")
}