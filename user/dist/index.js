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
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const logger_1 = __importDefault(require("./utils/logger"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = require("./routes");
const database_1 = require("./database");
const passport_1 = __importDefault(require("./passport"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const path_1 = __importDefault(require("path"));
const redis_1 = require("redis");
const error_handlers_1 = require("./middlewares/error-handlers");
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    let redisClient = (0, redis_1.createClient)();
    redisClient.connect().catch(console.error);
    let RedisStore = new connect_redis_1.default({ client: redisClient });
    let app = (0, express_1.default)();
    app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
    app.use((0, cookie_parser_1.default)(config_1.default.COOKIE_SECRET));
    app.use((0, express_session_1.default)({
        secret: config_1.default.COOKIE_SECRET,
        saveUninitialized: true,
        resave: true,
        store: RedisStore,
        cookie: { maxAge: 60 * 60 * 24 * 1000 },
    }));
    app.use((0, helmet_1.default)());
    app.use(passport_1.default.initialize());
    // app.use(passport.authenticate("session"));
    app.use(passport_1.default.session());
    app.use(express_1.default.urlencoded({ extended: true }));
    yield (0, database_1.db_connection)();
    (0, routes_1.user)(app);
    app.use(error_handlers_1.serverError);
    app.use(error_handlers_1.notFound);
    logger_1.default.info(`Server running on PORT: ${config_1.default.PORT}`);
    app.listen(config_1.default.PORT);
});
startServer();
