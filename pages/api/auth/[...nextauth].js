import Providers from "next-auth/providers";
import NextAuth, { User as NextAuthUser } from 'next-auth';

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        } as NextAuthUserWithStringId
      },
    }),
  ],
  secret: process.env.SECRET,
  session: {
    jwt: true
  },
  jwt: {
  // A secret to use for key generation - you should set this explicitly
  // Defaults to NextAuth.js secret if not explicitly specified.
  // This is used to generate the actual signingKey and produces a warning
  // message if not defined explicitly.
  secret: process.env.SECRET,
  // You can generate a signing key using `jose newkey -s 512 -t oct -a HS512`
  // This gives you direct knowledge of the key used to sign the token so you can use it
  // to authenticate indirectly (eg. to a database driver)
  signingKey: {"kty":"oct","kid":"70QWdXe9gG-nwvZdmNyr_94ONoLRmGq_X45z1Cune88","alg":"HS512","k":"NRNYrTJLRQEtiOx2NxoqDYuvWIXqvdtwi3lZ8eZYv8KnG0Ph3WwNgqqLqdzI9BviYUIXRFAqkm4v-mpl08qudg"},
}
};

export default (req, res) => NextAuth(req, res, options);
