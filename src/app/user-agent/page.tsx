import { BackToHome } from "@/components/backToHome/backToHome";
import { UserAgent } from "@/views/userAgent";
import { headers } from "next/headers";

const getUserAgent = async () => {
  const headersList = headers();
  return headersList.get("user-agent") || "";
};

const UserAgentRoot = async () => {
  const userAgent = await getUserAgent();
  return (
    <div>
      <BackToHome />
      {userAgent && (
        <div className="flex font-mono font-semibold text-sm">
          <div className="border p-2">UserAgent</div>

          <div className="border p-2">{userAgent}</div>
        </div>
      )}

      {!userAgent && <div>No user agent</div>}
    </div>
  );
};

export default UserAgentRoot;
