import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/app-layout.tsx", [
    index("routes/home.tsx"),

    // Create
    route("create", "routes/create/create.tsx"),

    // Collaborations
    route("collaborations", "routes/collaborations/collaborations.tsx"),
    route(
      "collaborations/:collaborationId",
      "routes/collaborations/collaborations-details.tsx"
    ),

    // Services
    route("services", "routes/services/services.tsx"),
    route("services/:serviceId", "routes/services/services-detail.tsx"),

    // Account
    route("profile/:profileId", "routes/account/profile.tsx"),
    route("profile/:profileId/edit", "routes/account/profile-edit.tsx"),

    // Favorites
    route("favorites", "routes/favorites/favorites.tsx"),
  ]),

  // Chat
  route("chat", "routes/chat/chat-layout.tsx", [
    index("routes/chat/threads.tsx"),
    route("new", "routes/chat/chat-new.tsx"),
    route(":threadId", "routes/chat/chat.tsx"),
  ]),

  // Login / Signup
  route("login", "routes/auth/login.tsx"),
  route("register", "routes/auth/register.tsx"),
] as unknown as RouteConfig[];
