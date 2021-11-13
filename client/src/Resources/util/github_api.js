import api_key from './api_key.json'

const packageAll = () =>{
  let headers = new Headers();
  const token = api_key.key
  const all_repos_url = 'https://api.github.com/users/iliyanid/repos'
  headers.set('Authorization', "token " + token);

  const allPackages = {
    headers:headers,token:token,url:all_repos_url
  }

  return allPackages;
}

const use_private_key = (allPackages) =>{
  allPackages.headers = new Headers()
  allPackages.headers.set('Authorization', "token " + allPackages.token);
}

const use_public_key = (allPackages) =>{
  allPackages.headers = new Headers();
}

const sleep = async(duration) =>{
  await new Promise(r => setTimeout(r, duration));
}

const send_api_call = async(allPackages) => {
  let response = await fetch(allPackages.url,{method: 'GET', headers:allPackages.headers});

  if(response.ok){
    return response.json();
  }
  else{
    use_public_key(allPackages);
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

    use_private_key(allPackages);
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


  result_data.sort((repo1, repo2)=>{return( repo2.size - repo1.size)});

  return {repos:result_data};
}

  export default github_api;