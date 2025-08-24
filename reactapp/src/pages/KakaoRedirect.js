
import { useEffect } from "react";

export default function KakaoRedirect() {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    console.log(code)
    if (code && window.opener) {
      window.opener.postMessage({ code }, window.location.origin);
      window.close();
    }
  }, []);

  return <div>카카오 로그인 처리 중...</div>;
}
