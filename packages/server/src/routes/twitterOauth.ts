import * as Passport from "passport";
import { GraphQLServer } from "graphql-yoga";
import { Strategy as TwitterStrategy } from "passport-twitter";
import { v4 } from "uuid";

import GraphQLConfig from "../Config";
import UserRepository from "../repositories/UserRepository";
import { Container } from "typescript-ioc";
import UserService from "../services/UserService";

const config: GraphQLConfig = Container.get(GraphQLConfig);
const userService: UserService = Container.get(UserService);

export const twitterPassport = (server: GraphQLServer) => {
  const userRepository = new UserRepository();
  Passport.use(
    new TwitterStrategy(
      {
        consumerKey: config.$twitter_consumer_key,
        consumerSecret: config.$twitter_consumer_secret,
        callbackURL: `${config.$express_app_url}/auth/twitter/callback`,
        includeEmail: true,
      },
      async (_, __, profile, cb) => {
        const { id, emails } = profile;
        const email: string | undefined = emails ? emails[0].value : undefined;

        let user = await userService.findWhereIn({
          twitterId: id,
          email,
        });

        if (!user) {
          const password = v4();
          user = await userService.create({
            twitterId: id,
            password,
            email: email || "updateme@updateme.com",
          })

          // @todo: Send email to user with new account and account reset link
        } else if (!user.twitterId) {
          await userRepository.update(user.id, { twitterId: id });
        }

        return cb(null, { id: user.id });
      },
    ),
  );

  server.express.get("/auth/twitter", Passport.authenticate("twitter"));

  server.express.get(
    "/auth/twitter/callback",
    Passport.authenticate("twitter", { session: false }),
    (req: any, res: any) => {
      req.session.userId = req.user.id;
      res.redirect(config.$frontend_host);
    },
  );
  return Passport;
};
