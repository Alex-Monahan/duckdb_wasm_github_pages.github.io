import { createCallbackAuth } from "https://cdn.pika.dev/@octokit/auth-callback";

async function github_auth() {
    let token;

    const auth = createCallbackAuth({ callback: () => token });
    await auth();
    // {
    //   type: 'unauthenticated'
    // }
    token = "secret123";
    await auth();
    // {
    //   type: 'token',
    //   token: 'secret123',
    //   tokenType: 'oauth'
    // }

    console.log(token);
}
github_auth();