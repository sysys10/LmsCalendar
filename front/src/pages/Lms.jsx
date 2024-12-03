import axios from "axios";
import { useState } from "react";

export default function Lms() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleLmsCroll(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/${id}/${pw}`);
      setData(response.data);
    } catch (err) {
      console.log(err);
      alert("로그인에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4">
      <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-lg shadow-border shadow-lg mt-20">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-copy-primary">
            LMS 로그인
          </h2>
          <p className="mt-2 text-center text-sm text-copy-secondary">
            학번과 비밀번호를 입력해주세요
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLmsCroll}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="id" className="sr-only">
                학번
              </label>
              <input
                id="id"
                name="id"
                type="text"
                required
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-border/50 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="학번"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="비밀번호"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {loading ? "로딩 중..." : "로그인"}
            </button>
          </div>
        </form>

        {data && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              조회 결과
            </h3>
            <pre className="text-sm text-gray-600 overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
