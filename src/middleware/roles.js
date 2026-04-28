// src/middleware/roles.js;

import { checkRole } from "./checkRole.js";

export const isUser = checkRole("user", "owner", "admin");
export const isOwner = checkRole("owner", "admin");
export const isAdmin = checkRole("admin");
