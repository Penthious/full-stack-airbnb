"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Passport = require("passport");
const passport_twitter_1 = require("passport-twitter");
const uuid_1 = require("uuid");
const Config_1 = require("../Config");
const UserRepository_1 = require("../repositories/UserRepository");
const typescript_ioc_1 = require("typescript-ioc");
const UserService_1 = require("../services/UserService");
const config = typescript_ioc_1.Container.get(Config_1.default);
const userService = typescript_ioc_1.Container.get(UserService_1.default);
exports.twitterPassport = (server) => {
    const userRepository = new UserRepository_1.default();
    Passport.use(new passport_twitter_1.Strategy({
        consumerKey: config.$twitter_consumer_key,
        consumerSecret: config.$twitter_consumer_secret,
        callbackURL: `${config.$express_app_url}/auth/twitter/callback`,
        includeEmail: true,
    }, (_, __, profile, cb) => __awaiter(this, void 0, void 0, function* () {
        const { id, emails } = profile;
        const email = emails ? emails[0].value : undefined;
        let user = yield userService.findWhereIn({
            twitterId: id,
            email,
        });
        if (!user) {
            const password = uuid_1.v4();
            user = yield userService.create({
                twitterId: id,
                password,
                email: email || "updateme@updateme.com",
            });
        }
        else if (!user.twitterId) {
            yield userRepository.update(user.id, { twitterId: id });
        }
        return cb(null, { id: user.id });
    })));
    server.express.get("/auth/twitter", Passport.authenticate("twitter"));
    server.express.get("/auth/twitter/callback", Passport.authenticate("twitter", { session: false }), (req, res) => {
        req.session.userId = req.user.id;
        res.redirect(config.$frontend_host);
    });
    return Passport;
};
//# sourceMappingURL=twitterOauth.js.map