import axios from "axios";
const apiKey = process.env.NEXT_PUBLIC_API_KEY

export function getFact() {
  if (apiKey) {
    return axios.get('https://api.api-ninjas.com/v1/facts?limit=10',{headers: { 'X-Api-Key': apiKey}})
    .then(res => res)
    .catch(err => console.log(err))
  } else {console.error('no api key!')}
}
