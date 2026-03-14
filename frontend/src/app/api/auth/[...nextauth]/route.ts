import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = { 
    providers: [
        CredentialsProvider(
            { 
                name: "Credentials", 
                credentials: {
                    username: {
                        label: "Username",
                        type: "text" 
                    },
                    password: {
                        label: "Password",
                        type: "password"
                    }
                }, 
                async authorize(credentials) {
                    // バックエンドのログインAPIを呼び出す
                    const res = await fetch("http://localhost:8000/api/auth/login", { 
                        method: "POST",
                        body: JSON.stringify(credentials),
                        headers: { "Content-Type": "application/json" }
                    }); 
                    const user = await res.json();
                    if (res.ok && user) {
                        return user;
                        // ユーザーオブジェクトを返す 
                    }
                    return null;
                }
            }
        )
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.accessToken = user.access_token;
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        }
    }
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };