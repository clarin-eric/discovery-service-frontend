import React, { Component } from 'react';
import './Home.css';
import VisibleIdpList from '../containers/IdpListContainer.js';
import { CookiesProvider } from 'react-cookie';
import * as qs from 'query-string';
import PropTypes from 'prop-types';

class Home extends Component {
    componentWillMount() {
        var query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
        this.props.setQueryParameters(query.entityID, query.return)
    }

    render() {
        return (<CookiesProvider><VisibleIdpList id={this.props.match.params.id}  /></CookiesProvider>);
    }
}

Home.propTypes = {
    setQueryParameters: PropTypes.func.isRequired,
};

export default Home;