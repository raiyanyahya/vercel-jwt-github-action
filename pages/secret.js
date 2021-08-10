import { useState, useEffect } from "react";
import { signOut,signIn, useSession } from "next-auth/client";

export default function Secret({user, json}) {
  return (
    <main>
      <div>
        <h1> Protected Page</h1>
        {user && (
          <>
            <button onClick={signOut}>sign out</button>
          </>
        )}
        <p><pre>{JSON.stringify(json, undefined, 2)}</pre></p>
        <h3>User Data:</h3>
        <p><pre>{JSON.stringify(user, undefined, 2)}</pre></p>
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if(!session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  let json;

  try {
    const res = await fetch("/api/secret");
    json = await res.json();

    if (json) {
      console.log("got the data", json);
    }
  } catch(err) {
    console.log("something went wrong fetching the secret", err)
  }

  return {
    props: { user: session.user, json }
  }
}
