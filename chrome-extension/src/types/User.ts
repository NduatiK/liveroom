export type UserType = "client" | "admin";

export type User<T extends UserType = UserType> = {
  type: T;
  id: string;
  room_id: string;
  phx_ref: string;
  phx_ref_prev: string;
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
  hovered_elements: Object;
  focused_elements: Object;
  inputs: Object;
};
