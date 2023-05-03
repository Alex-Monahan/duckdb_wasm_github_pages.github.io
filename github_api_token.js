import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

async function test_auth() {
    // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
    let token = prompt("Please enter your github personal access token");
    const octokit = new Octokit({ auth: token });

    let response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: 'Alex-Monahan',
        repo: 'duckdb_wasm_github_pages.github.io',
        path: undefined,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      })
    console.log('response',response);
    console.log('response.data',response.data);

}

test_auth();