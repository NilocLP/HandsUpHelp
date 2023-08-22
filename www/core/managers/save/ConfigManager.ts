
class ConfigManager{

    public saveConfig(){

    }

    public createConfig(){
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, (fs) => {
            console.log(fs.name)
        });

    }
}




