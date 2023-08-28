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
        return __awaiter(this, void 0, void 0, function* () {
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
            //Add Body to Page
            this._screenElement.innerHTML = screenElement.body.innerHTML;
            //Set Page Title
            headElement.innerHTML = screenElement.title;
            //Load Scripts
            let scriptPromises = [];
            screenElement.scripts.forEach((element) => {
                scriptPromises.push(this.loadScript(element));
            });
            //handle customElement loading
            let customElementPromises = [];
            let elements = this._screenElement.querySelectorAll('*');
            elements.forEach((element) => {
                customElementPromises.push(this.waitUntilCustomElementLoaded(element));
            });
            //Load Page style
            let stylePromises = [];
            screenElement.styles.forEach((element) => {
                stylePromises.push(this.loadStylesheet(element));
            });
            //Wait until scripts, customElements and styles are loaded
            let allPromises = [...scriptPromises, ...customElementPromises, ...stylePromises];
            yield Promise.all(allPromises);
            //Wait until fonts are ready
            yield document.fonts.ready;
            this._screenElement.classList.remove("hiddenScreen");
            return true;
        });
    }
    loadScript(scriptElements) {
        return new Promise((resolve) => {
            let scriptElement = document.createElement("script");
            scriptElement.src = scriptElements.getAttribute("src");
            scriptElement.classList.add("screenElement");
            scriptElement.type = "text/javascript";
            scriptElement.addEventListener("load", () => {
                resolve();
            });
            document.head.appendChild(scriptElement);
        });
    }
    waitUntilCustomElementLoaded(customElement) {
        return new Promise((resolve) => {
            let isCustomElement = customElements.get(customElement.localName) !== undefined;
            if (!isCustomElement)
                resolve();
            // @ts-ignore
            let isRendered = customElement.rendered;
            if (isRendered)
                resolve();
            customElement.addEventListener("objectRendered", () => {
                resolve();
            });
        });
    }
    loadStylesheet(linkElement) {
        return new Promise((resolve) => {
            let styleElement = document.createElement("link");
            styleElement.setAttribute("rel", "stylesheet");
            styleElement.classList.add("screenElement");
            styleElement.setAttribute("href", linkElement.getAttribute("href"));
            styleElement.addEventListener("load", () => {
                resolve();
                /*Wait until fonts are loaded
                document.fonts.ready.then(() => {
                    fontsLoaded = true
                    this.showScreenIfRendered(elementsToLoad,fontsLoaded);
                })*/
            });
            document.head.appendChild(styleElement);
        });
    }
    getActiveScreen() {
        return this._activScreen;
    }
}
//# sourceMappingURL=screenManager.js.map