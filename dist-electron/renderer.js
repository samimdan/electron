"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getDayAndSend(data) {
    console.log(data);
}
window.dayApi.onCallFunction((data) => {
    getDayAndSend(data);
});
