import axios from "axios";
import { cookies } from "next/headers";

const getData = async () => {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  console.log("cokiee__", sessionCookie);
  console.log("cokieestore__", cookieStore);

  if (!sessionCookie) {
    console.error("Session cookie is undefined");
    return null;
  }

  try {
    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: {
          Host: "ticketing.dev",
          Cookie: `session=${sessionCookie}`, // Pass the session cookie in the Cookie header
        },
      }
    );
    console.log("first__", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const Page = async () => {
  const data = await getData();
  console.log("second__", data);

  return (
    <div>
      {data?.currentUser ? (
        <h1>You are signed in</h1>
      ) : (
        <h1>You are signed out</h1>
      )}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

export default Page;
