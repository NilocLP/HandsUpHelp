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

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

document.addEventListener('deviceready', onDeviceReady, false);


/**
 * Wait to Cordova Load Up, then start MainManager
 */
async function onDeviceReady() {
    MainManager.getMainManager();
    document.addEventListener("mainManagerLoadedUp", onAppReady);
    document.addEventListener('pause', onPause, false);
}

function onPause() {
    const mainManager = MainManager.getMainManager();
    mainManager.saveManager.updateCalender(mainManager.mainCalender.toJSON()).then(() => {});

}

/**
 * Wait until MainManger is loaded
 */
async function onAppReady(){
    const mainManager = MainManager.getMainManager();
    let screenElement = document.getElementById("app-screens");
    mainManager.createScreenManager(screenElement)
    const screenManager = mainManager.screenManager;

    await screenManager.fetchScreenIntoList("/screens/statistics/statistics.html")
    await screenManager.fetchScreenIntoList("/screens/calender/calender.html")
    await screenManager.fetchScreenIntoList("/screens/settings/settings.html")
    await screenManager.fetchScreenIntoList("/screens/settings/subpages/configureSubjects/configureSubjects.html")
    await screenManager.fetchScreenIntoList("/screens/settings/subpages/configureSubject/configureSubject.html")

    await screenManager.changeScreen(1);

    document.getElementById("app-navbar").addEventListener("pageSwitch", onPageNavigation);

}

function onPageNavigation(e){
    const mainManager = MainManager.getMainManager();
    const screenManager = mainManager.screenManager;
    screenManager.changeScreen(e.detail.page).then(r => {});
}


