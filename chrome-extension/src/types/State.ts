import type { User } from "./User";

/* LiveState state */
export type State = {
  room_id: string;
  me: User<"admin">;
  users: { [key: User["id"]]: User };
  current_user: CurrentUser;
};

export type CurrentUser = {
  id: string;
  picture_url: string;
  website_url: string;
};
