function changeTheme() {
    let mainClassList = document.querySelector("#portfolio-card").classList
    mainClassList.toggle("dark-theme")
    mainClassList.toggle("light-theme")
}