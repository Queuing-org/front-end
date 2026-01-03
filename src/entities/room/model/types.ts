export type RoomTag = {
  slug: string;
  name: string;
};

export type Room = {
  id: number;
  slug: string;
  title: string;
  isPrivate: boolean;
  createAt: string;
  tags: RoomTag[];
};

export type RoomsResponse = {
  rooms: Room[];
  hasNext: boolean;
};
