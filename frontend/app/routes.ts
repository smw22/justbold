import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/appLayout.tsx", [
    index("routes/home/home.tsx"),

    // Create
    route("create", "routes/create/createLayout.tsx", [
      index("routes/create/create.tsx"),
      route("service", "routes/create/createService.tsx"),
      route("collaboration", "routes/create/createCollaboration.tsx"),
      route("post", "routes/create/createPost.tsx"),
      route("story", "routes/create/createStory.tsx"),
    ]),

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
    route("profile/edit", "routes/account/profileEdit.tsx"),

    // Notifications
    route("notifications", "routes/notifications/notifications.tsx"),

    // Favorites
    route("favorites", "routes/favorites/favorites.tsx"),
  ]),

  // Chat
  route("chats", "routes/chat/chatLayout.tsx", [
    index("routes/chat/threads.tsx"),
    route("groups", "routes/chat/groupThreads.tsx"),
    route("groups/:threadId", "routes/chat/groupChatDetail.tsx"), // Groups BEFORE :threadId
    route(":threadId", "routes/chat/chatDetail.tsx"),

    route("new", "routes/chat/chatNew.tsx"),
  ]),

  // Login / Signup / Onboarding
  route("login", "routes/auth/login.tsx"),
  route("register", "routes/auth/register.tsx"),
  route("onboarding", "routes/onboarding/index.tsx"),
  route("onboarding/steps", "routes/onboarding/steps.tsx"),
  route("log-out", "routes/auth/logOut.tsx"),

  // Search
  route("search", "./routes/search/index.tsx"),
] as unknown as RouteConfig[];
