console.log("main run");

import { MainPage } from "./Pages/MainPage.js";

const root = document.getElementById('root');

const mainPage = new MainPage(root);

mainPage.render();