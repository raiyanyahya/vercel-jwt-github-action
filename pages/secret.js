import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/client";
import { useCookies } from 'react-cookie';




export default function Secret() {
  const [session, loading] = useSession();
  const [content, setContent] = useState();
 const [cookies, setCookie] = useCookies(['name']);
  useEffect(() => {
    const fetchData = async (req) => {
     
      console.log("this is cookie",cookies)
      const res = await fetch("https://vercel-python-action.vercel.app/api",{
  method: 'POST',
  credentials: 'include'
});
      const json = await res.json();

      if (json.title) {
        setContent(json.title);
      }
    };
    fetchData();
  }, [session]);

  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    return (
      <main>
        <div>
          <h1>You aren't signed in, please sign in first</h1>
        </div>
      </main>
    );
  }
  return (
    <main>
      <div>
        <h1> Protected Page</h1>
        {session && (
          <>
            <button onClick={signOut}>sign out</button>
          </>
        )}
        <p>{content}</p>
      </div>
    </main>
  );
}
