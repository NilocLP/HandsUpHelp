function init() {
    const mainManager = MainManager.getMainManager();
    document.getElementById("subjectList-addButton").addEventListener("click", () => {
        mainManager.screenManager.changeScreen(4);
    });
}
//# sourceMappingURL=configureSubjects.js.map