import Header from "@/components/header";
import RoomList from "@/components/room-list";
import CreateRoom from "@/components/topbar/create-room";
import SortButton from "@/components/topbar/sort-button";
import TagBar from "@/components/topbar/tag-bar";

export default function MainPage() {
  return (
    <div className="bg-[#FFFFFF] h-screen p-6 text-[#17171B]">
      <Header />
      <div className="justify-between flex">
        <TagBar />
        <div className="flex gap-2 items-center pt-5 mr-5">
          <SortButton />
          <CreateRoom />
        </div>
      </div>
      <RoomList />
    </div>
  );
}
