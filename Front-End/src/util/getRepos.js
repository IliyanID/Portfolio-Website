const getRepos = async () => {
    let headers = new Headers();

    

    var CryptoJS = require("crypto-js");


        var bytes  = CryptoJS.AES.decrypt("U2FsdGVkX1/k+Orjfh69RJU2zSJPngZuikVOBmBG7c8r9nC2XeuIJqD/MqDFTgIkPTsiep1gpbKpVnxMKM132Q==", 'password');
        var token = bytes.toString(CryptoJS.enc.Utf8);
 
        


    headers.set('Authorization', "token " + token);

    

    let url = "https://api.github.com/users/iliyanid/repos";
    let response = await fetch(url,{method: 'GET', headers:headers});
    let rawData = await response.json();
    let data = [];

    if(rawData.length === undefined){
      headers = new Headers();

     
      

      url = "https://api.github.com/users/iliyanid/repos";
      response = await fetch(url,{method: 'GET', headers:headers});
      rawData = await response.json();
      data = [];
      console.log("Failed to use authentication key")
        if(rawData.length === undefined){
          return
        }
        
    }
      

    for(let i = rawData.length - 1; i >=0; i--){
      response = await fetch (rawData[i].languages_url,{method: 'GET', headers:headers})
      let JSONlanguages = await response.json();
      let languages = "";
      for(let [key] of Object.entries(JSONlanguages)) 
        languages += " " + key
      data.push({name:rawData[i].name,link:rawData[i].html_url,description:rawData[i].description,languages:languages,size:rawData[i].size});
    }


    data.sort((obj1, obj2)=>{return( obj2.size - obj1.size)});



    return {repos:data};
  }

  export default getRepos;