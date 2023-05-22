"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./data-source");
const app_1 = require("./app");
const utils_1 = require("./utils");
const node_cron_1 = __importDefault(require("node-cron"));
data_source_1.AppDataSource.initialize().then(() => {
    console.log('Database connected');
    const PORT = Number(process.env.PORT) || 3000;
    app_1.app.listen(PORT, () => {
        node_cron_1.default.schedule('0 0 * * *', async () => {
            // Executar a cada 24 horas as 00:00:00h
            Promise.all([(0, utils_1.unlockUser)(), (0, utils_1.blockedUserLoan)(), (0, utils_1.availabilityBook)()]);
        });
        console.log('Listening on port ' + PORT);
    });
});
