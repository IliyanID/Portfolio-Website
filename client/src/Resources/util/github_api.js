const packageAll = () =>{
  let headers = new Headers();
  const token = process.env.GITHUB_API_KEY;
  const all_repos_url = 'https://api.github.com/users/iliyanid/repos'

  headers.set('Authorization', "token " + token);

  const use_private_key = () =>{
    headers = new Headers()
    headers.set('Authorization', "token " + token);
  }

  const use_public_key = () =>{
    headers = new Headers();
  }
  return{
    headers:headers,use_private_key:use_private_key,use_public_key:use_public_key,
    token:token, url:all_repos_url
  }
}

const sleep = async(duration) =>{
  await new Promise(r => setTimeout(r, duration));
}

const send_api_call = async(allPackages) => {
  let response = await fetch(allPackages.url,{method: 'GET', headers:allPackages.headers});

  if(response.ok){
    return JSON.parse(response)
  }
  else{
    allPackages.use_public_key();
    await sleep(1000)
    return send_api_call(allPackages)
  }
}

const github_api = async () => {
  let allPackages = packageAll();
  let all_repositories = await send_api_call(allPackages)
      

  let result_data = []
  for(let i = 0; i < all_repositories.length; i++){
    let indiv_repo = all_repositories[i]

    allPackages.use_private_key();
    allPackages.url = indiv_repo.languages_url
    const languages_json = await send_api_call(allPackages)

    let languages_str = "";
    for(let [key] of Object.entries(languages_json)) 
      languages_str += " " + key

    result_data.push(
    {
      name:indiv_repo.name,
      link:indiv_repo.html_url,
      description:indiv_repo.description,
      languages:languages_str,
      size:indiv_repo.size
    });
  }


  result_data.sort((repo1, repo2)=>{return( repo1.size - repo2.size)});

  return {repos:result_data};
}

  export default github_api;