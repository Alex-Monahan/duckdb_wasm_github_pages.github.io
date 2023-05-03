import { Octokit } from "https://cdn.skypack.dev/@octokit/core";
import * as duckdb from '/node_modules/@duckdb/duckdb-wasm';
import * as arrow from '/node_modules/apache-arrow';

async function authorize_github() {
    // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
    let token = prompt("Please enter your github personal access token");
    return new Octokit({ auth: token });    
}

async function get_github_files(octokit) {
    let owner = window.location.host.replace('.github.io','');
    let repo = window.location.pathname.replace(/\//g,'');
    
    let response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: owner,
        repo: repo,
        path: undefined,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      })
    console.log('response',response);
    console.log('response.data',response.data);
    return response.data;
}

async function initialize_duckdb() {
    const MANUAL_BUNDLES = {
        mvp: {
            mainModule: '/node_modules/@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm',
            mainWorker:  '/node_modules/@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js',
        },
        eh: {
            mainModule: '/node_modules/@duckdb/duckdb-wasm/dist/duckdb-eh.wasm',
            mainWorker: '/node_modules/@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js',
        },
    };
    // Select a bundle based on browser checks
    const bundle = await duckdb.selectBundle(MANUAL_BUNDLES);
    // Instantiate the asynchronus version of DuckDB-wasm
    const worker = new Worker(bundle.mainWorker);
    let logger = new duckdb.ConsoleLogger();
    let db = new duckdb.AsyncDuckDB(logger, worker);
  
    await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
  
    //Bigints are not well handled in JavaScript, so we want them to come back as doubles
    let dbOpen = await db.open({
      query: {
        castBigIntToDouble: true
      }
    });
    
    return await db.connect();

}

async function run_duckdb_query(conn, sql) { //Wrapper to make it easier to parameterize in the future

    return conn.query(sql);
    
}


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

    /*
      Now that I have the file locations I want to:
      Pull a JSON file named based on the repo path / repo name (so there are no merge conflicts when cloned)
      Have an editor pop up to manipulate that JSON
      Push that JSON back to Github

      Pull in DuckDB Wasm
      Execute each SQL Statement defined in that workflow
      Then render it in a grid / chart

    */



}

async function main_function() {
    let octokit = await authorize_github();
    let files = await get_github_files(octokit);
    
}

main_function();