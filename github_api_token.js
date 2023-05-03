import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

async function test_auth() {
    // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
    let token = prompt("Please enter your github personal access token");
    const octokit = new Octokit({ auth: token });

    const response = await octokit.request("GET /orgs/{org}/repos", {
        org: "octokit",
        type: "private",
    });
    console.log('response.json()',response.json());
}

test_auth();