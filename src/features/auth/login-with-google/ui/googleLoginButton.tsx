"use client";

import { redirectToGoogleLogin } from "../api/login";

export default function GoogleLogionButton() {
  return (
    <button className="border" onClick={() => redirectToGoogleLogin()}>
      구글 로그인
    </button>
  );
}
