export type CreateRoomPayload = {
  title: string;
  password?: string;
  tags?: string[];
};

export type CreateRoomResult = {
  slug: string;
};
