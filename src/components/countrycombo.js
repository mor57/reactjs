import React, { PropTypes } from 'react'

import Select from 'react-select'
import { myapi } from '../repository/apiclass'

class countrycombo extends React.Component {
  // function getCountry() {
  //   return (query) => {
  //       return axios.post('http://localhost:47102/Home/Country_List', { CountryStatus: 1 })
  //           .then(function (response) {
  //               let options = response.data.map(item => ({ value: item.CountryID, label: item.CountryTitle }));
  //               console.log(options);
  //               return { options };
  //           })
  //           .catch(function (error) {
  //               console.log(error);
  //           })
  //   }
  getList(input) {
    if (!input) {
      return Promise.resolve({ options: [] });
    }
      return axios.get(`http://localhost:4000/api/v1/search?search=${input}`)
      .then(response => {
        this.setState({
          searchedOptions: response.data.ideas
        })
        return { options: response.data.ideas };
      })
    }
  
  
  
  render () {
    return (
      <Select.Async
        closeOnSelect={false}
        onSelectResetsInput={false}
        backspaceRemoves={true}
        value={this.state.value}
        onChange={this.onChange}
        onValueClick={this.gotoItem}
        valueKey="id"
        labelKey="title"
        loadOptions={this.getList}
        noResultsText={'No result found :('}
        cache={false}
        />
    )
  }
}