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
Object.defineProperty(exports, "__esModule", { value: true });
require("./config");
const createApp_1 = require("./utils/createApp");
const PORT = process.env.PORT || 3001;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const app = (0, createApp_1.createApp)();
            app.listen(PORT, () => {
                console.log("Running on port ", PORT);
            });
        }
        catch (err) {
            console.log("there was an error");
        }
    });
}
main();
