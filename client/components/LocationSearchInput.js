import React, {Component} from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

class LocationSearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      name: '',
      placeId: '',
      latLng: '',
      streetAdd: '',
      selected: false
    };
  }

  handleChange = address => {
    this.setState({
      address
    });
  };

  handleSelect = async address => {
    const add = address.split(', ');
    const name = add[0];
    const streetAdd = `${add[1]}, `;
    const extraAdd = add.slice(2).join(', ');
    const addressInfo = await geocodeByAddress(address);
    const placeId = addressInfo[0].place_id;
    const latLng = await getLatLng(addressInfo[0]);
    this.setState({
      placeId,
      latLng: `${latLng.lat},${latLng.lng}`,
      name,
      streetAdd: `${streetAdd}${extraAdd}`,
      address: name,
<<<<<<< HEAD
      selected: true
    });
    this.props.handleSearch(this.state.name, this.state.streetAdd);
=======
      selected: true,
    })
    this.props.handleSearch(this.state.name, this.state.streetAdd, this.state.latLng, this.state.placeId);
>>>>>>> master
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div >
            <div   className="accommo-form-search-container">
              <label
                htmlFor="search"
                className="accommo-form-search-label"
              >
                Search:
              </label>
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />
            </div>
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                // {console.log('suggest props', getInputProps(suggestion))}
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? {
                      backgroundColor: '#ff0f83',
                      color: 'white',
                      cursor: 'pointer'
                    }
                  : {backgroundColor: '#ffffff', cursor: 'pointer'};
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;
