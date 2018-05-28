import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import PropTypes from 'prop-types';
import {Panel, Row, Col, Button, ButtonGroup, InputGroup, FormControl, ToggleButtonGroup, ToggleButton, Glyphicon, Tooltip, OverlayTrigger} from 'react-bootstrap';
import Idp from './Idp';
import { withCookies, Cookies } from 'react-cookie';
import keydown from 'react-keydown';

class IdpList extends Component {

    constructor(props) {
        super(props);
        /*
        layout:
            1 = grid view
            2 = list view
         */
        this.state = {
            layout: 2,
        }
        this.handleLayoutChange = this.handleLayoutChange.bind(this);
        this.hideGrid = this.hideGrid.bind(this);
        this.showGrid = this.showGrid.bind(this);
    }

    componentWillReceiveProps( { keydown } ) {
        if ( keydown.event ) {
            if (keydown.event.which === 13) {
                const selected_idp = this.props.idps.selected_idp;
                if (selected_idp) {
                    console.log("Enter pressed, redirecting to:"+selected_idp.entityID);
                    this.props.idpClick(this.props.cookies, selected_idp.entityID);
                }
            }
        }
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

    hideGrid() {
        var state = this.state;
        state.show_grid=false;
        this.setState(state);
    }

    showGrid() {
        var state = this.state;
        state.show_grid=true;
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
        const country_label = "";
        //const country_label = "Countries:"
        const tooltipSearchPattern = (<Tooltip id="tooltip">Search for a specific identity provider</Tooltip>)
        const tooltipSearchCountry = (<Tooltip id="tooltip">Filter identity providers by country</Tooltip>)
        const tooltipToggleGridView = (<Tooltip id="tooltip">Switch to grid or list view</Tooltip>)
        return (
            <Col xs={12}>
                <Col md={7} mdOffset={0} sm={6} smOffset={0}>
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
                <Col md={3} sm={4}>
                    {country_label}
                    <OverlayTrigger placement="bottom" overlay={tooltipSearchCountry}>
                        <FormControl componentClass="select" placeholder="Filter by country" onChange={e => {e.preventDefault(); this.props.countryChange(e.target.value)}}>
                            <option value="*" key="all">All countries</option>
                            {countries}
                        </FormControl>
                    </OverlayTrigger>
                </Col>
                <Col md={2} sm={2} mdOffset={0} smOffset={0} xsHidden>
                    <OverlayTrigger placement="bottom" overlay={tooltipToggleGridView}>
                    <ToggleButtonGroup type="radio" value={this.state.layout} onChange={this.handleLayoutChange} name="layout" defaultValue={1}>
                        <ToggleButton value={1}><Glyphicon glyph="th" /></ToggleButton>
                        <ToggleButton value={2}><Glyphicon glyph="th-list" /></ToggleButton>
                    </ToggleButtonGroup>
                    </OverlayTrigger>
                </Col>
            </Col>
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
        const total = this.props.idps.total
        var shown = this.props.idps.index+this.props.idps.show;
        if (shown > total) {
            shown = total;
        }
        let btn = null;
        if (shown < total) {
            btn = (
                <Button onClick={e => {e.preventDefault(); this.props.showMoreClick()}}  bsStyle="primary">
                    Results limited to {shown} out of {total} total - show more...
                </Button>
            );
        }
        return (<Col xs={6} xsOffset={3}>{btn}</Col>)
    }

    createErrorsSection() {
        let error_list = this.props.idps.errors;
        let error = [];
        for(var i = 0; i < error_list.length; i++) {
            var err = error_list[i];
            if (err.code === "ERROR_NO_RETURN_URL") {
                error.push(
                    <p key={err.code} className="text-small text-center error">
                        Warning: It appears as if you visited this page directly, this will not work. Please
                        login <a href="https://www.clarin.eu/content/easy-access-protected-resources">via the service</a> you
                        are trying to access.
                    </p>)
            }
//            console.log("Error: " + err.code + ", message=" + err.message);
        }
        return error;
    }

    createIdpRows(s) {
        const layout = this.state.layout;
        const idps = this.props.idps.items;
        const { isFetching } = this.props;

        //Generate IDP list
        let rows = null;
        if(isFetching) {
            rows = (
                <Col md={s.md.size} mdOffset={s.md.offset} sm={s.sm.size} smOffset={s.sm.offset} xs={s.xs.size}>
                    <span>Loading idp data...</span>)
                </Col>
            );
        } else {
            //Generate grid layout
            rows = idps.map(idp => (
                <Col md={s.md.size} mdOffset={s.md.offset} sm={s.sm.size} smOffset={s.sm.offset} xs={s.xs.size} onClick={e => {
                    e.preventDefault();
                    this.props.idpClick(this.props.cookies, idp.entityID)
                }} key={idp.entityID}>
                    <Idp name={idp.titles[0].value} country_code={idp.country_code} country_label={idp.country_label} icon={idp.icon} layout={layout}/>
                </Col>
            ))
        }
        return (<Col xs={12} className="idp-grid">{rows}</Col>);
    }

    createGridSection(layout, main_colums) {
        const selected_idp = this.props.idps.selected_idp;

        let expanded = false;
        if (!selected_idp || this.state.show_grid) {
            expanded = true;
        }

        //Adjust main layout based on grid or column settings

        let s = {
            md: {size: 4, offset: 0},
            sm: {size: 6, offset: 0},
            xs: {size: 12, offset: 0},
        }
        if (layout === 2) {
            s.md.size = 10;
            s.md.offset = 1;
            s.sm.size = 12;
            s.sm.offset = 0;
            s.xs.size = 12;
            s.xs.offset = 0;
        }

        let s_selected = {
            md: {size: 6, offset: 3},
            sm: {size: 8, offset: 2},
            xs: {size: 12, offset: 0},
        }

        if (layout=== 2) {
            s_selected = {
                md: {size: 10, offset: 1},
                sm: {size: 10, offset: 1},
                xs: {size: 12, offset: 0},
            }
        }

        //Create an element for the selected idp, only if the selected_idp is set
        let selected = null;
        if (selected_idp) {
            selected = (
                <Panel>
                    <Panel.Heading><Panel.Title>Previously chosen home organization</Panel.Title></Panel.Heading>
                    <Panel.Body >
                        <Col md={s_selected.md.size} mdOffset={s_selected.md.offset} sm={s_selected.sm.size} smOffset={s_selected.sm.offset} xs={s_selected.xs.size} onClick={e => {
                            e.preventDefault();
                            this.props.idpClick(this.props.cookies, selected_idp.entityID)
                        }}>
                            <Idp
                                name={selected_idp.titles[0].value}
                                country_code={selected_idp.country_code}
                                country_label={selected_idp.country_label}
                                icon={selected_idp.icon}
                                layout={layout}
                            />
                        </Col>

                        </Panel.Body>
                </Panel>
            );
        }

        return (
            <Row>
                <Col lg={main_colums.lg.size} lgOffset={main_colums.lg.offset}>
                    {selected}
                </Col>
                <Col lg={main_colums.lg.size} lgOffset={main_colums.lg.offset}>
                    <Panel id="collapsible-panel-example-2" defaultExpanded={expanded}>
                        <Panel.Heading>
                            <Panel.Title toggle>Home organization list</Panel.Title>
                        </Panel.Heading>
                        <Panel.Collapse>
                            <Panel.Body>
                                {this.createFilterSection()}
                                {this.createIdpRows(s)}
                                {this.createShowMoreSection()}
                            </Panel.Body>
                        </Panel.Collapse>
                    </Panel>
                </Col>
            </Row>
        )

    }

    render() {
        const layout = this.state.layout;
        let main_colums = {
            lg: {size: 12, offset: 0}
        }
        if (layout === 2) {
            main_colums.lg.size = 8;
            main_colums.lg.offset = 2;
        }

        return (
            <div className="idpList">
                <Row>
                    <Col lg={main_colums.lg.size} lgOffset={main_colums.lg.offset}>
                        <p className="text-small">
                            Select your identity provider below. This is usually the institution where you work or study. Signing in here will allow you to access certain CLARIN resources and services which are only available to users who have logged in.
                            If you cannot find your institution in the list below, please select the clarin.eu website account and use your CLARIN website credentials. If you don't have such credentials you can register an
                            account <a href="https://user.clarin.eu/register">here</a>. For questions please contact <a href="mailto:spf@clarin.eu">spf@clarin.eu</a>.
                        </p>
                        {this.createErrorsSection()}
                    </Col>
                </Row>
                {this.createGridSection(layout, main_colums)}
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

export default withCookies(keydown( 'enter' )(IdpList));