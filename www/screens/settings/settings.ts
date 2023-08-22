function init() {
    const mainManager = MainManager.getMainManager();

    document.getElementById("settings-setting-infoText-button").addEventListener("click", () => {
        mainManager.screenManager.changeScreen(3)
    })
}


