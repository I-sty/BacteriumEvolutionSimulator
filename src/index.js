"use strict";

import * as d3 from "d3";
import { createGridlines } from "./view/gridLayout";
import {
    createBacteriums,
    doIterations,
    toggleMoving
} from "./controller/bacteriumManager";

/**
 * Main entry point
 */
createGridlines(d3.select("#canvas"));
createBacteriums();
doIterations(0);


document
    .getElementById("buttonStop")
    .addEventListener("click", toggleMoving, false);
