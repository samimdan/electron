"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAzanMaghreb = exports.getAzanZohr = exports.getAzanSobh = exports.getDay = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const url = 'https://www.bahesab.ir/time/hamedan/';
const getDay = async () => {
    const dayPromise = new Promise((resolve, reject) => {
        axios_1.default
            .get(url)
            .then(res => {
            const $ = cheerio.load(res.data);
            const day = $('#date').text();
            resolve(day);
        })
            .catch(error => {
            reject(error);
        });
    });
    return dayPromise;
};
exports.getDay = getDay;
const getAzanSobh = async () => {
    const azanSobhPromise = new Promise((resolve, rejects) => {
        axios_1.default
            .get(url)
            .then(res => {
            const $ = cheerio.load(res.data);
            const azanSobh = $('div#timer').text();
            resolve(azanSobh);
        })
            .catch(error => {
            rejects(error);
        });
    });
    return azanSobhPromise;
};
exports.getAzanSobh = getAzanSobh;
const getAzanZohr = async () => {
    const azanZohrPromise = new Promise((resolve, reject) => {
        axios_1.default
            .get(url)
            .then(res => {
            const $ = cheerio.load(res.data);
            const azanZohr = $('#azan-time3').text();
            resolve(azanZohr);
        })
            .catch(error => {
            reject(error);
        });
    });
    return azanZohrPromise;
};
exports.getAzanZohr = getAzanZohr;
const getAzanMaghreb = async () => {
    const azanZohrPromise = new Promise((resolve, reject) => {
        axios_1.default
            .get(url)
            .then(res => {
            const $ = cheerio.load(res.data);
            const azanZohr = $('#azan-time5').text();
            resolve(azanZohr);
        })
            .catch(error => {
            reject(error);
        });
    });
    return azanZohrPromise;
};
exports.getAzanMaghreb = getAzanMaghreb;
