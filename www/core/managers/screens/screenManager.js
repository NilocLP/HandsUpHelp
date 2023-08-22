var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class ScreenManager {
    constructor(screenElement) {
        this._screens = [];
        this._screenElement = screenElement;
        this._activScreen = -1;
    }
    fetchScreenIntoList(htmlFileUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            let elementInArray = -1;
            //Fetch url to htmlContent
            yield fetch(htmlFileUrl).then(r => r.text())
                .then(htmlContent => {
                //Extract HTML Content into Data
                let screenEntry = {
                    body: null,
                    styles: null,
                    scripts: null,
                    title: ""
                };
                let element = document.createElement("div");
                element.innerHTML = htmlContent;
                //Extract Body
                screenEntry.body = element.getElementsByTagName("main")[0];
                //Extract Head Styles
                screenEntry.styles = element.querySelectorAll("link[rel='stylesheet']");
                //Extract Head Scripts
                screenEntry.scripts = element.querySelectorAll("script[src]");
                //Extract Title
                screenEntry.title = element.querySelector("title").innerText;
                elementInArray = this._screens.length;
                this._screens.push(screenEntry);
            });
            return elementInArray;
        });
    }
    ;
    changeScreen(screenNumber) {
        //Check if screen exists
        if (!(screenNumber >= 0 && screenNumber < this._screens.length)) {
            return false;
        }
        //Grab Elements to change and clear
        let headElement = document.querySelector("head title");
        let stylesheetElements = document.querySelectorAll("head link[rel='stylesheet'][class~='screenElement']");
        let scriptElements = document.querySelectorAll("head script[src][class~='screenElement']");
        this._activScreen = screenNumber;
        let screenElement = this._screens[screenNumber];
        this._screenElement.classList.add("hiddenScreen");
        //Clear Skripts
        scriptElements.forEach((element) => {
            element.remove();
        });
        //Clear styles
        stylesheetElements.forEach((element) => {
            element.remove();
        });
        //Because of async loading, some elements(custom tags, styles, fonts, scripts) load after this function ends.
        // To keep track in the load events, how many elements remain, this Variable is used
        let elementsToLoad = 0;
        //Keep track if fonts are currently loading
        let fontsLoaded = false;
        //Set Page scripts, load them and execute the init function
        screenElement.scripts.forEach((element) => {
            let scriptElement = document.createElement("script");
            scriptElement.src = element.getAttribute("src");
            scriptElement.classList.add("screenElement");
            scriptElement.type = "text/javascript";
            elementsToLoad++;
            scriptElement.addEventListener("load", () => {
                console.log("loaded script" + scriptElement.getAttribute("src"));
                elementsToLoad--;
                this.showScreenIfRendered(elementsToLoad, fontsLoaded);
                init();
            });
            document.head.appendChild(scriptElement);
        });
        //Add Body to Page
        this._screenElement.innerHTML = screenElement.body.innerHTML;
        //Set Page Title
        headElement.innerHTML = screenElement.title;
        //Wait until the custom elements are loaded.
        let elements = this._screenElement.querySelectorAll('*');
        elements.forEach((element) => {
            let isCustomElement = customElements.get(element.localName) !== undefined;
            if (!isCustomElement)
                return;
            // @ts-ignore
            let isRendered = element.rendered;
            if (isRendered)
                return;
            console.info("current status: ");
            console.info(element);
            // @ts-ignore
            console.info("rendered:" + isRendered);
            elementsToLoad++;
            element.addEventListener("objectRendered", () => {
                // @ts-ignore
                console.info("rendered:" + element.rendered + " on " + element);
                elementsToLoad--;
                console.info(elementsToLoad + " elements left");
                this.showScreenIfRendered(elementsToLoad, fontsLoaded);
            });
        });
        //Set Page style
        screenElement.styles.forEach((element) => {
            let styleElement = document.createElement("link");
            styleElement.setAttribute("rel", "stylesheet");
            styleElement.classList.add("screenElement");
            styleElement.setAttribute("href", element.getAttribute("href"));
            elementsToLoad++;
            styleElement.addEventListener("load", () => {
                console.log("loaded style" + styleElement.getAttribute("href"));
                elementsToLoad--;
                this.showScreenIfRendered(elementsToLoad, fontsLoaded);
                //Wait until fonts are loaded
                document.fonts.ready.then(() => {
                    fontsLoaded = true;
                    this.showScreenIfRendered(elementsToLoad, fontsLoaded);
                });
            });
            document.head.appendChild(styleElement);
        });
        if (elementsToLoad == 0) {
            this._screenElement.classList.remove("hiddenScreen");
        }
        return true;
    }
    /**
     * Show the screen, if all elements and fonts of it are rendered
     * @param elementsToRender
     * @param fontsRenderd
     * @private
     */
    showScreenIfRendered(elementsToRender, fontsRenderd) {
        if (elementsToRender > 0)
            return;
        if (!fontsRenderd)
            return;
        setTimeout(() => {
            this._screenElement.classList.remove("hiddenScreen");
        }, 20);
    }
    getActiveScreen() {
        return this._activScreen;
    }
}
//# sourceMappingURL=screenManager.js.map