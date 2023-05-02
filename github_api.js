console.log('In github_api.js');

async function github_auth() {
    let response = await fetch('https://github.com/login/oauth/authorize', {
        // mode: 'no-cors',    
        client_id: '02bae144ed96d86c63f6',
        redirect_uri: 'https://alex-monahan.github.io/duckdb_wasm_github_pages.github.io/',
        state: 'ZYXABC',

    });

    console.log(response.json());
}

github_auth();