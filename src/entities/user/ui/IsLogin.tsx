import { useMe } from "../hooks/useMe";

export default function IsLogin() {
  const { data: me, isError, error, isLoading } = useMe();

  return (
    <div className="border p-3">
      {isLoading && <div>me 로딩중...</div>}

      {isError && <div>me 실패: {String((error as Error)?.message)}</div>}

      {me && <pre>{JSON.stringify(me, null, 2)}</pre>}

      {me === null && <div>로그인 필요</div>}
    </div>
  );
}
