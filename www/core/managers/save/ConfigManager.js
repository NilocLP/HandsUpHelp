class ConfigManager {
    saveConfig() {
    }
    createConfig() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, (fs) => {
            console.log(fs.name);
        });
    }
}
//# sourceMappingURL=ConfigManager.js.map