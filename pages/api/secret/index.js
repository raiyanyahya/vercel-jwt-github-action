import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    const resu = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const data = await resu.json()

    res.send({
      content: data,
    });
  } else {
    res.send({
      error: "You need to be signed in.",
    });
  }
};
