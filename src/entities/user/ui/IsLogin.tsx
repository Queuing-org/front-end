import { useMe } from "../hooks/useMe";

export default function IsLogin() {
  const { data: me, isError, error, isLoading } = useMe();

  return (
    <div className=" text-black">
      {isLoading && <div>me 로딩중...</div>}

      {isError && (
        <div className="text-sm text-red-600">
          me 실패: ({error.status}) {error.message}
        </div>
      )}

      {me && <pre>{JSON.stringify(me, null, 2)}</pre>}

      {me === null && <div>로그인 필요</div>}
    </div>
  );
}
