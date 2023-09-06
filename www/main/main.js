/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);
/**
 * Wait to Cordova Load Up, then start MainManager
 */
function onDeviceReady() {
    return __awaiter(this, void 0, void 0, function* () {
        MainManager.getMainManager();
        document.addEventListener("mainManagerLoadedUp", onAppReady);
    });
}
/**
 * Wait until MainManger is loaded
 */
function onAppReady() {
    return __awaiter(this, void 0, void 0, function* () {
        const mainManager = MainManager.getMainManager();
        let screenElement = document.getElementById("app-screens");
        mainManager.createScreenManager(screenElement);
        const screenManager = mainManager.screenManager;
        yield screenManager.fetchScreenIntoList("/screens/statistics/statistics.html");
        yield screenManager.fetchScreenIntoList("/screens/calender/calender.html");
        yield screenManager.fetchScreenIntoList("/screens/settings/settings.html");
        yield screenManager.fetchScreenIntoList("/screens/settings/subpages/configureSubjects/configureSubjects.html");
        yield screenManager.fetchScreenIntoList("/screens/settings/subpages/configureSubject/configureSubject.html");
        yield screenManager.changeScreen(1);
        document.getElementById("app-navbar").addEventListener("pageSwitch", onPageNavigation);
    });
}
function onPageNavigation(e) {
    const mainManager = MainManager.getMainManager();
    const screenManager = mainManager.screenManager;
    screenManager.changeScreen(e.detail.page).then(r => { });
}
//# sourceMappingURL=main.js.map