import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    const res1 = await fetch("https://vercel-python-action.vercel.app/api",{
  method: 'POST',
  credentials: 'include'
});
      const json1 = await res1.json();
    res.send({
      content: json1
    });
  } else {
    res.send({
      error: "You need to be signed in.",
    });
  }
};
