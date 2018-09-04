import axios from 'axios'

export function getCountry() {
    return (query) => {
        return axios.post('http://localhost:47102/Home/Country_List', { CountryStatus: 1 })
            .then(function (response) {
                let options = response.data.map(item => ({ value: item.CountryID, label: item.CountryTitle }));
                console.log(options);
                return { options };
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}