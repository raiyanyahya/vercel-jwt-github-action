import Providers from "next-auth/providers";
import NextAuth from 'next-auth';
import jwt from "jsonwebtoken";
const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  session: {
    jwt: true
  },
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    secret: process.env.SECRET,
    encode: async ({ secret, token, maxAge }) => {
      const jwtClaims = {
        "sub": token.toString() ,
        "name": token.name ,
        "email": token.email,
        "iat": Date.now() / 1000,
        "exp": Math.floor(Date.now() / 1000) + (24*60*60),
      };
      const encodedToken = jwt.sign(jwtClaims, secret, { algorithm: 'HS512'});
      return encodedToken;
    },
    decode: async ({ secret, token, maxAge }) => {
      const decodedToken = jwt.verify(token, secret, { algorithms: ['HS512']});
      return decodedToken;
    },
  },
  callbacks: {
    // async signIn(user, account, profile) { return true },
    // async redirect(url, baseUrl) { return baseUrl },
    async session(session, token) { 
      const encodedToken = jwt.sign(token, process.env.SECRET, { algorithm: 'HS512'});
      session.id = token.id;
      session.token = encodedToken;
      return Promise.resolve(session);
    },
    async jwt(token, user, account, profile, isNewUser) { 
      //const isUserSignedIn = user ? true : false;
      // make a http call to our graphql api
      // store this in postgres
      console.log("user is ", user);
      console.log("token is ", token);
      //if(isUserSignedIn) {
      //  token.id = user.id;
      //}
      return Promise.resolve(token);
    }
  },
  debug: true,
  //signingKey: {"kty":"oct","kid":"70QWdXe9gG-nwvZdmNyr_94ONoLRmGq_X45z1Cune88","alg":"HS512","k":"NRNYrTJLRQEtiOx2NxoqDYuvWIXqvdtwi3lZ8eZYv8KnG0Ph3WwNgqqLqdzI9BviYUIXRFAqkm4v-mpl08qudg"},
};

export default (req, res) => NextAuth(req, res, options);
