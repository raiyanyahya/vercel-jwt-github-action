import { useState, useEffect } from "react";
import { signOut,signIn, useSession } from "next-auth/client";



export default function Secret() {
  const [session, loading] = useSession();
  const [content, setContent] = useState();
  
  useEffect(() => {
    const fetchData = async () => {

      try {

        const res = await fetch("/api/secret");
        const json = await res.json();
  
        if (json) {
          console.log("got the data", json);
          setContent(json);
        }
      } catch(err) {
        console.log("something went wrong fetching the secret", err)
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
      {!session && (
          <>
            <button onClick={signIn}>sign in</button>
          </>
        )}
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
        <p><pre>{JSON.stringify(content, undefined, 2)}</pre></p>
      </div>
    </main>
  );
}
