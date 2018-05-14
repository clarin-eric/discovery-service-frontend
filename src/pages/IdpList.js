import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import PropTypes from 'prop-types';
import {Grid, Row, Col, Button, ButtonGroup, InputGroup, FormControl, ToggleButtonGroup, ToggleButton, Glyphicon, Tooltip, OverlayTrigger} from 'react-bootstrap';
import Idp from './Idp';
import { withCookies, Cookies } from 'react-cookie';

class IdpList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            layout: 1
        }
        this.handleLayoutChange = this.handleLayoutChange.bind(this);
    }

    componentWillMount() {
        const { cookies } = this.props;

        //Set the selected idp entity id if a cookie with a valid value exists
        var entityId = cookies.get('entityid')
        if (entityId) {
            this.props.setSelectedIdp(entityId)
        } else {
            console.log("No selected entityId found");
        }
    }

    handleLayoutChange(event) {
        var state = this.state;
        state.layout=event;
        this.setState(state);
    }

    createFilterSection() {
        const country_list = this.props.idps.countries;
        //Generate country filter options
        let countries = null;
        if(country_list) {
            countries = country_list.map(country => (
                <option value={country.code} key={country.code}>{country.label}</option>
            ));
        }

        const tooltipSearchPattern = (<Tooltip id="tooltip">Search for a specific identity provider</Tooltip>)
        const tooltipSearchCountry = (<Tooltip id="tooltip">Filter identity providers by country</Tooltip>)
        const tooltipToggleGridView = (<Tooltip id="tooltip">Switch to grid or list view</Tooltip>)
        return (
            <Row>
                <Col md={4} mdOffset={3} sm={6} smOffset={0}>
                    <InputGroup>
                        <InputGroup.Addon><i className="fas fa-search"></i></InputGroup.Addon>
                        <OverlayTrigger placement="bottom" overlay={tooltipSearchPattern}>
                            <FormControl
                                type="text"
                                defaultValue=""
                                placeholder="Search for your home organization..."
                                onChange={e => {e.preventDefault(); this.props.patternChange(e.target.value)}} />
                        </OverlayTrigger>
                    </InputGroup>
                </Col>
                <Col md={2} sm={4}>
                    <OverlayTrigger placement="bottom" overlay={tooltipSearchCountry}>
                        <FormControl componentClass="select" placeholder="Filter by country" onChange={e => {e.preventDefault(); this.props.countryChange(e.target.value)}}>
                            <option value="*" key="all">All</option>
                            {countries}
                        </FormControl>
                    </OverlayTrigger>
                </Col>
                <Col sm={2}>
                    <OverlayTrigger placement="bottom" overlay={tooltipToggleGridView}>
                    <ToggleButtonGroup type="radio" value={this.state.layout} onChange={this.handleLayoutChange} name="layout" defaultValue={1}>
                        <ToggleButton value={1}><Glyphicon glyph="th" /></ToggleButton>
                        <ToggleButton value={2}><Glyphicon glyph="th-list" /></ToggleButton>
                    </ToggleButtonGroup>
                    </OverlayTrigger>
                </Col>
            </Row>
        )
    }

    createPaginationSection() {
        return (
            <Col xs={6} xsOffset={3}>
                <Row>
                    <Col xs={4}>
                        <ButtonGroup>
                            <Button onClick={e => {e.preventDefault(); this.props.previousPageClick()}}>
                                <i className="fa fas fa-angle-left"></i>
                            </Button>
                            <Button onClick={e => {e.preventDefault(); this.props.firstPageClick()}}>
                                <i className="fa fas fa-angle-double-left"></i>
                            </Button>
                        </ButtonGroup>
                    </Col>
                    <Col xs={4} className="stats">
                        <span>{this.props.idps.index+1} to {this.props.idps.index+this.props.idps.show} out of {this.props.idps.total} total.</span>
                    </Col>
                    <Col xs={4}>
                        <ButtonGroup>
                            <Button onClick={e => {e.preventDefault(); this.props.lastPageClick()}}>
                                <i className="fa fas fa-angle-double-right"></i>
                            </Button>
                            <Button onClick={e => {e.preventDefault(); this.props.nextPageClick()}}>
                                <i className="fa fas fa-angle-right"></i>
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </Col>
        )
    }

    createShowMoreSection() {
        return (
            <Col xs={6} xsOffset={3} onClick={e => {e.preventDefault(); this.props.showMoreClick()}}>
                    <a href="#" >
                        Results limited to {this.props.idps.index+this.props.idps.show} out of {this.props.idps.total} total - show more...
                    </a>
            </Col>
        )
    }

    render() {
        var i = 0;
        const { isFetching } = this.props;
        let idps = this.props.idps.items;
        let selected_idp = this.props.idps.selected_idp;

        let error_list = this.props.idps.errors;
        const layout = this.state.layout;

        //Create an element for the selected idp, only if the selected_idp is set
        let selected = null;
        if(selected_idp) {
            selected = (<Row className="previous-selected-idp"
                             onClick={e => {e.preventDefault(); this.props.idpClick(this.props.cookies, selected_idp.entityID)}}>
                <Col md={4} mdOffset={4} sm={6} smOffset={3} xs={12}>
                    <Idp
                        name={selected_idp.titles[0].value}
                        country={selected_idp.country}
                        icon={selected_idp.icon}
                        layout={layout}
                    />
                </Col>
            </Row>);
        }

        //Generate IDP list
        let rows = null;
        if(isFetching) {
            rows = (
                <Row>
                    <Col md={4} mdOffset={4} sm={6} smOffset={3} xs={12}>
                        <span>Loading idp data...</span>)
                    </Col>
                </Row>
            );
        } else {

            if(layout === 2) {
                //Generate list layout
                rows = idps.map(idp => (
                    <Col sm={6} smOffset={3} xs={12} onClick={e => {e.preventDefault(); this.props.idpClick(this.props.cookies, idp.entityID)}} key={idp.entityID}>
                        <Idp name={idp.titles[0].value} country={idp.country} icon={idp.icon} layout={layout}/>
                    </Col>
                ))

            } else {
                //Generate grid layout
                rows = idps.map(idp => (
                    <Col md={4} sm={6} xs={12} onClick={e => {
                        e.preventDefault();
                        this.props.idpClick(this.props.cookies, idp.entityID)
                    }} key={idp.entityID}>
                        <Idp name={idp.titles[0].value} country={idp.country} icon={idp.icon} layout={layout}/>
                    </Col>
                ))
            }
        }

        //Manage errors
        let error = [];
        for(i = 0; i < error_list.length; i++) {
            var err = error_list[i];
            if (err.code === "ERROR_NO_RETURN_URL") {
                error.push(
                    <p key={err.code} className="small error">
                        Warning: It appears as if you visited this page directly, this will not work. Please
                        login <a href="https://www.clarin.eu/content/easy-access-protected-resources">via the service</a> you
                        are trying to access.
                    </p>)
            }
            console.log("Error: " + err.code + ", message=" + err.message);
        }

        //Return UI
        return (
            <div className="idpList">
                <Row>
                    <Col xs={12} lgOffset={0}>
                        <h3>Sign in via the CLARIN Service Provider Federation</h3>
                        <p className="small">
                            Select your identity provider below. This is usually the institution where you work or study. Signing in here will allow you to access certain CLARIN resources and services which are only available to users who have logged in.
                            If you cannot find your institution in the list below, please select the clarin.eu website account and use your CLARIN website credentials. If you don't have such credentials you can register an
                            account <a href="https://user.clarin.eu/register">here</a>. For questions please contact <a href="mailto:spf@clarin.eu">spf@clarin.eu</a>.
                        </p>
                        {error}
                    </Col>
                </Row>
                <Grid>{selected}</Grid>
                {this.createFilterSection()}
                <Grid className="grid-margin">{rows}</Grid>
                <Row>
                    {this.createShowMoreSection()}
                </Row>
            </div>
        );
    }
}

IdpList.propTypes = {
    cookies: instanceOf(Cookies).isRequired,
    idps: PropTypes.shape({
        isFetching: PropTypes.bool.isRequired,
        index: PropTypes.number.isRequired,
        show: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
        items: PropTypes.array.isRequired,
        selected_entityId: PropTypes.string,
        selected_idp: PropTypes.shape({}),
        countries: PropTypes.array.isRequired,
        errors: PropTypes.array.isRequired,
    }).isRequired,
    previousPageClick: PropTypes.func.isRequired,
    nextPageClick: PropTypes.func.isRequired,
    firstPageClick: PropTypes.func.isRequired,
    lastPageClick: PropTypes.func.isRequired,
    showMoreClick: PropTypes.func.isRequired,
    patternChange: PropTypes.func.isRequired,
    countryChange: PropTypes.func.isRequired,
    idpClick: PropTypes.func.isRequired,
    setSelectedIdp: PropTypes.func.isRequired,
};

IdpList.defaultProps = {
    idps:[],
};

export default withCookies(IdpList);