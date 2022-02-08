/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_API_KEY || 'xPL61bEK8JXO49JzCXzXhg==ukDqPAl4ZnfZQm8W';

export function getFact() {
  if (apiKey) {
    return axios.get('https://api.api-ninjas.com/v1/facts?limit=10', { headers: { 'X-Api-Key': apiKey } })
      .then((res) => res)
      .catch((err) => console.log(err));
  } console.error('no api key!');
}
