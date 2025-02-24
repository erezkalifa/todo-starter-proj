import { userService } from "../../services/user.service.js";

export const SET_USER = "SET_USER";

const initialState = {
  loggedInUser: userService.getLoggedinUser(),
};
