import React from 'react';
const _ = require('lodash');
import axios from 'axios';
import {debounce} from 'lodash';
const {compose, withProps, lifecycle} = require('recompose');
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} = require('react-google-maps');
const {
  SearchBox
} = require('react-google-maps/lib/components/places/SearchBox');
import {fetchCoordinates} from '../../store/map';
import {connect} from 'react-redux';

const MapWithASearchBox = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyD4jSOU0XG9zooC14hIs9G_zTNkEQ6zd_g&libraries=geometry,drawing,places',
    loadingElement: <div style={{height: `100%`}} />,
    containerElement: <div style={{height: `500px`}} />,
    mapElement: <div style={{height: `100%`, zIndex: 0}} />
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};
      this.setState({
        bounds: null,
        center: {
          lat: this.props.startLat ? this.props.startLat : 40.7049,
          lng: this.props.startLng ? this.props.startLng : -74.0092
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: debounce(
          () => {
            this.setState({
              bounds: refs.map.getBounds(),
              center: refs.map.getCenter()
            });
            let {onBoundsChange} = this.props;
            if (onBoundsChange) {
              onBoundsChange(refs.map);
            }
          },
          Infinity,
          {maxWait: 500}
        ),
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          const newObj = {
            coordinates:
              places[0].geometry.location.lat() +
              ',' +
              places[0].geometry.location.lng(),
            place: places[0]
          };
          if (places.length === 1) {
            this.props.fetchCoordinates(newObj);
            this.props.add(places[0]);
          }

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
            icon: place.icon,
            info: place
          }));
          const nextCenter = _.get(
            nextMarkers,
            '0.position',
            this.state.center
          );

          this.setState({
            center: nextCenter,
            markers: nextMarkers
          });
          // refs.map.fitBounds(bounds);
        },
        componentDidUpdate() {
          this.setState({markers: []});
          //console.log('hello')
        }
      });
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={14}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
    onClick={async () => {
      let elem = await document.getElementsByClassName('gm-style-iw');
      let link = elem[0].getElementsByTagName('a')[0].href;
      //console.log(link.slice(link.indexOf('=')+1, link.indexOf('&')) );
      const title = await document.getElementsByClassName('title')[0].innerText;
      let address = await document.getElementsByClassName('address')[0]
        .innerText;
      //console.log(elem[0].getElementsByTagName('a'))
      let id = link.slice(link.indexOf('&cid=') + 5);

      let newObj = {
        coordinates: link.slice(link.indexOf('=') + 1, link.indexOf('&')),
        place: {
          name: title,
          formatted_address: address,
          place_id: '',
          id: 'hi'
        }
      };
      props.fetchCoordinates(newObj);
      props.add(newObj.place);
      //console.log(newObj.place.name + ' ' + newObj.coordinates)

      //console.log(`${title}\n${address}\n${newObj.coordinates}\n${id}`)

      //40.709357,-74.011487 //opening page
      //40.709357,-74.011487 //off box
      //40.7050758,-74.00916039999998
      //key AIzaSyD4jSOU0XG9zooC14hIs9G

      const {data: result} = await axios.get(`/api/${id}`);
      console.log(result);
    }} //gm-style-iw
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Search for a location"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          marginTop: `13px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`
        }}
      />
    </SearchBox>
    {!props.clear
      ? props.markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            clickable={true}
            onClick={() => {
              const newObj = {
                coordinates:
                  marker.position.lat() + ',' + marker.position.lng(),
                place: marker.info
              };
              props.fetchCoordinates(newObj);
              props.add(marker.info);
            }}
          />
        ))
      : ''}

    {props.coords.map(coord => (
      <Marker
        key={`mapAct${coord.id}`}
        position={coord.position}
        title={coord.name}
        icon="https://www.google.com/mapfiles/marker_green.png"
      />
    ))}
  </GoogleMap>
));

<MapWithASearchBox />;

const mapDispatchToProps = dispatch => ({
  fetchCoordinates: coordinates => dispatch(fetchCoordinates(coordinates))
});

export default connect(null, mapDispatchToProps)(MapWithASearchBox);
