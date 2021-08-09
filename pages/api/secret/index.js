import { getSession } from "next-auth/client";
//import Cookies from 'cookies'

export default async (req, res) => {
  const session = await getSession({ req });
//const cookies = new Cookies(req, res)
    // Get a cookie
    //console.log("my cokokie is",cookies.get('__Secure-next-auth.session-token'))
  if (session) {
    const res1 = await fetch("https://vercel-python-action.vercel.app/api",{
  method: 'POST',
  credentials: 'include',
//headers: { Cookie: req.headers['cookie'] }
});
      const json1 = await res1.json();
    res.send(json1);
  } else {
    res.send({
      error: "You need to be signed in dude.",
    });
  }
};
