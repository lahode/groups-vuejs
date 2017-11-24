import * as express from 'express';
import { UsersRoutes }  from "../api/users/users.routes";
import { GroupsRoutes }  from "../api/groups/groups.routes";
import { Authentication } from '../authentication';

const app = express();

export class APIRoutes {

    routes() {
      app.post("/login", UsersRoutes.loginRoute);
      app.post("/signup", UsersRoutes.signUpRoute);
      app.post("/retrieve-password", UsersRoutes.getPswRoute);
      app.use("/api", Authentication.authenticatedRoute);
      app.get("/api/groups/all/:from?/:to?", GroupsRoutes.getAllGroupsRoute);
      app.get("/api/groups/get/:id", GroupsRoutes.getGroupByIDRoute);
      app.get("/api/groups/delete/:id", GroupsRoutes.deleteGroupRoute);
      app.post("/api/groups/save", GroupsRoutes.saveGroupRoute);
      app.get("/api/check-auth", UsersRoutes.checkAuth);
      return app;
    }

}
