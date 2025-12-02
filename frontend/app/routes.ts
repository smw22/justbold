import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/appLayout.tsx", [
    index("routes/home/home.tsx"),

    // Create
    route("create", "routes/create/create.tsx"),
    route("create/service", "routes/create/createService.tsx"), //This should be made with a parent route later (Outlet)

    // Collaborations
    route("collaborations", "routes/collaborations/collaborations.tsx"),
    route("collaborations/:collaborationId", "routes/collaborations/collaborationsDetails.tsx"),

    // Posts
    route("posts/:postId", "routes/post/postDetail.tsx"),

    // Services
    route("services", "routes/services/services.tsx"),
    route("services/:serviceId", "routes/services/servicesDetail.tsx"),

    // Account
    route("profile/:profileId", "routes/account/profile.tsx"),
    route("profile/:profileId/edit", "routes/account/profileEdit.tsx"),

    // Favorites
    route("favorites", "routes/favorites/favorites.tsx"),
  ]),

  // Chat
  route("chat", "routes/chat/chatLayout.tsx", [
    index("routes/chat/threads.tsx"),
    route("new", "routes/chat/chatNew.tsx"),
    route(":threadId", "routes/chat/chat.tsx"),
  ]),

  // Login / Signup / Onboarding
  route("login", "routes/auth/login.tsx"),
  route("register", "routes/auth/register.tsx"),
  route("onboarding", "routes/onboarding/index.tsx"),
  route("onboarding/steps", "routes/onboarding/steps.tsx"),

  // Search
  route("search", "./routes/search/index.tsx"),
] as unknown as RouteConfig[];
