"use client";

import GoogleLoginButton from "@/src/features/auth/login-with-google/ui/googleLoginButton";
import LogoutButton from "@/src/features/auth/logout/ui/logoutButton";
import NicknameEditForm from "@/src/features/user-profile/ui/NicknameEditForm";
import { useRouter } from "next/navigation";
import IsLogin from "@/src/entities/user/ui/IsLogin";
import RoomTags from "@/src/entities/room/ui/RoomTags";
import CreateRoomTest from "@/src/features/room/create/ui/CreateRoomTest";
import RoomsListTest from "@/src/entities/room/ui/RoomListTest";

export default function TestPage() {
  const router = useRouter();

  return (
    <div className="bg-white p-4 space-y-4">
      <GoogleLoginButton />
      <LogoutButton />
      <NicknameEditForm />
      <IsLogin />
      <RoomTags />
      <CreateRoomTest />
      <RoomsListTest />

      <button
        onClick={() => router.push("/home")}
        className="border cursor-pointer"
      >
        go to home page
      </button>
    </div>
  );
}
