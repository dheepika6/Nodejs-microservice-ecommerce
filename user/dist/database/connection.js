"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../utils/logger"));
const config_1 = __importDefault(require("../config"));
function connection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("connecting");
            yield mongoose_1.default.connect(config_1.default.MONGO_URL);
            console.log("conencted");
            logger_1.default.info("The database is connected now.");
        }
        catch (err) {
            console.log(err);
            logger_1.default.error(`error connecting databsase`, { error: JSON.stringify(err) });
            process.exit(1);
        }
    });
}
exports.connection = connection;
