export type UserType = "client" | "admin";

export type User<T extends UserType = UserType> = {
  id: string;
  room_id: string;
  phx_ref: string;
  phx_ref_prev: string;
  type: T;
  name: string;
  color: string;
  joined_at: string;
  current_url: string;
  inner_width: string;
  inner_height: string;
  x: string;
  y: string;
  msg: string;
  is_mouse_down: boolean;
  is_shift_key_down: boolean;
  hovered_elements: Record<string, boolean>;
  focused_elements: Record<string, boolean>;
  inputs: Record<string, { type: "text"; value: string }>;
};
