import axios from 'axios';
let baseQuery ="https://api.github.com/";

export function baseAxios(method,url,data) {
  return axios.request({
    method:method,
    url:(baseQuery + url),
    //headers:{'Authorization': "Bearer " +localStorage.getItem('token') },
    params: (data['params'] ? data['params'] : ""),
    data: (data['data'] ? data['data'] :""),
  }).then(result => result)
    .catch(console.log);
}
export function searchUsers(params){
  return baseAxios('GET','search/users',{params})
    .then(result => result);
}
export function getUsersRepositories(username,page){
  return baseAxios('GET',`users/${username}/repos`,{'params':{page}})
    .then(result => result);
}
