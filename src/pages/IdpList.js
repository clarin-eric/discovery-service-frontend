import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Accordion from 'react-bootstrap/Accordion';
import Idp from './Idp';
import { useCookies, withCookies, Cookies } from 'react-cookie';
import { log_debug } from '../logging';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTh, faThList } from '@fortawesome/free-solid-svg-icons'
import PropTypes from "prop-types";
import { VIEW_LIST, VIEW_GRID } from '../Constants';
import {filterOnCountry, filterOnText, setView} from "../actions/FilterActions";
import {idpClick, selectIdp} from "../actions";

const applyFilter = (list, filter) => {
    const filtered = [];
    list.forEach(item => {
        let include = true;

        if(include) {
            if (filter.text !== null && filter.text.length >= 2) {
                const filterText = filter.text.toLowerCase();
                item.titles.forEach(title => {
                    const val = title.value ? title.value.toLowerCase() : "";
                    if(!val.includes(filterText)) {
                        include = false;
                    }
                });
            }
        }

        if(include) {
            if (filter.country !== "*" && filter.country !== item.country) {
                include = false;
            }
        }

        if(include) {
            filtered.push(item);
        }
    });
    return filtered;
}

const IdpGridOrListContainer = (props) => {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.filter);
    const [index, setIndex] = useState(0);
    const [show, setShow] = useState(50);
    const [cookies, setCookie, removeCookie] = useCookies(['entityid']);

    if(props.data.isFetching) {
        return (
            <Col md={s.md} sm={s.sm} xs={s.xs} className="minimal-padding">
                <span>Loading idp data...</span>)
            </Col>
        );
    }

    const filtered = props.data;

    const total = filtered.length;

    const items = [];
    for(let i = index; i < filtered.length && i < show; i++) {
        const idp = filtered[i];
        if(idp !== null) {
            items.push(
                <Col lg={props.bootstrap_grid.lg} md={props.bootstrap_grid.md} sm={props.bootstrap_grid.sm}
                     xs={props.bootstrap_grid.xs} key={idp.entityID} className="minimal-padding">
                    <Idp entityID={idp.entityID}
                         digest={idp.digest}
                         digestIndex={idp.digest_index}
                         name={idp.display_title} country_code={idp.country_code}
                         country_label={idp.country_label} icon={idp.icon} layout={props.layout}/>
                </Col>
            );
        } else {
            console.log("Idp is null, index="+i+", filtered=". filtered);
        }
    }

    return (
        <>
            <Row>
                <FiltersSection />
            </Row>
            <Row className="g-2 my-3">
                { items }
            </Row>
            <Row>
                <ShowMoreSection pagination={{index: index, total: total, show: show}} setIndex={setIndex} setShow={setShow} />
            </Row>
        </>
    );
}

IdpGridOrListContainer.propTypes = {
    data: PropTypes.array.isRequired,
    layout: PropTypes.number.isRequired
};

const ShowMoreSection = (props) => {
    const total = props.pagination.total
    let shown = props.pagination.index+props.pagination.show;
    if (shown > total) {
        shown = total;
    }
    let btn = null;
    if (shown < total) {
        btn = (
            <Button onClick={e => props.setShow(props.pagination.show+50)}  variant="primary">
                Results limited to {shown} out of {total} total - show more...
            </Button>
        );
    }
    return (<Col md={{span: 6, offset: 3}} xs={{span: 12, offset: 0}} className="minimal-padding">{btn}</Col>)
}

ShowMoreSection.propTypes = {
    pagination: PropTypes.shape({
        index: PropTypes.number.isRequired,
        show: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
    }).isRequired,
};

ShowMoreSection.defaultProps = {
    pagination: {
        index: 0,
        total: 0,
        show: 50
    },
};

const IdpPanel = (props) => {
    return (
        <Card className="my-2">
            <Card.Header>
                <Card.Title xs={12}>{props.title}</Card.Title>
            </Card.Header>
            <Card.Body className="no-horizonal-padding container panel-body">
                <Row className="g-2 panel-body overflow-hidden">
                    <Col xs={12}>
                        {props.element}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

const CollapsibleIdpPanel = (props) => {
    return (
        <Accordion defaultActiveKey="-1" className="my-2">
            <Accordion.Item eventKey="0">
                <Accordion.Header>{props.title}</Accordion.Header>
                <Accordion.Body className="no-horizonal-padding container">
                    <Row className="g-2 panel-body overflow-hidden">
                        <Col xs={12}>
                            {props.element}
                        </Col>
                    </Row>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

const FiltersSection = () => {
    const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(['layout']);

    const filter = useSelector((state) => state.filter);
    const country_list = useSelector((state) => state.idp_list.countries);

    const country_label = "";
    //Suffering from Scrollbar jitter on render of popovers and tooltips
    //See: https://github.com/react-bootstrap/react-bootstrap/issues/6563#issuecomment-1435500271
    //Side effect that first tooltip is always shown on first page load
    const tt_showTriggerEvents = ['hover', 'focus'];
    const tt_Style = {position: "fixed"};
    const tooltipSearchPattern = (<Tooltip id="tooltip" style={tt_Style}>Search for a specific identity provider</Tooltip>)
    const tooltipSearchCountry = (<Tooltip id="tooltip" style={tt_Style}>Filter identity providers by country</Tooltip>)
    const tooltipToggleGridView = (<Tooltip id="tooltip" style={tt_Style}>Switch to grid view</Tooltip>)
    const tooltipToggleListView = (<Tooltip id="tooltip" style={tt_Style}>Switch to list view</Tooltip>)

    return (
        <Col xs={12} className="minimal-padding filter">
            <Row>
                <Col md={{span: 7, offset: 0}} sm={{span: 6, offset: 0}}>
                    <InputGroup>
                        <InputGroup.Text><FontAwesomeIcon size="lg" icon={faSearch} /></InputGroup.Text>
                        <OverlayTrigger placement="bottom" overlay={tooltipSearchPattern} trigger={tt_showTriggerEvents}>
                            <FormControl
                                type="text"
                                value={filter.text ? filter.text : ""}
                                placeholder="Search for your home organisation..."
                                onChange={e => {dispatch(filterOnText(e.target.value))}}
                                autoFocus />
                        </OverlayTrigger>
                    </InputGroup>
                </Col>
                <Col md={3} sm={4}>
                    {country_label}
                    <OverlayTrigger placement="bottom" overlay={tooltipSearchCountry} trigger={tt_showTriggerEvents}>
                        <FormControl as="select" value={filter.country} placeholder="Filter by country" onChange={e => { dispatch(filterOnCountry(e.target.value)) }} >
                            <option value="*" key="all">All countries</option>
                            { country_list.map(country => <option value={country.code} key={country.code}>{country.label}</option>) }
                        </FormControl>
                    </OverlayTrigger>
                </Col>
                <Col md={{span: 2, offset: 0}} sm={{span: 2, offset: 0}} xs={false} className="text-right">

                    <ButtonGroup name="layout" size="sm">
                        <OverlayTrigger placement="bottom" overlay={tooltipToggleGridView} trigger={tt_showTriggerEvents}>
                            <Button variant={filter.view === VIEW_GRID ? "primary" : "outline-primary"}
                                    onClick={e => {setCookie("layout", VIEW_GRID, { path: '/' } ); dispatch(setView(VIEW_GRID))} }>
                                <FontAwesomeIcon size="lg" icon={faTh} />
                            </Button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" overlay={tooltipToggleListView} trigger={tt_showTriggerEvents}>
                            <Button variant={filter.view === VIEW_LIST ? "primary" : "outline-primary"}
                                    onClick={e => {setCookie("layout", VIEW_LIST, { path: '/' } ); dispatch(setView(VIEW_LIST))} }>
                                <FontAwesomeIcon size="lg" icon={faThList} />
                            </Button>
                        </OverlayTrigger>
                    </ButtonGroup>

                </Col>
            </Row>
        </Col>
    )
}

const FiltersSection2 = () => {
    const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(['layout']);

    const filter = useSelector((state) => state.filter);
    const country_list = useSelector((state) => state.idp_list.countries);

    const country_label = "";

    return (
        <Col xs={12} className="minimal-padding filter">
            <Row>
                <Col md={{span: 7, offset: 0}} sm={{span: 6, offset: 0}}>
                    <InputGroup>
                        <InputGroup.Text><FontAwesomeIcon size="lg" icon={faSearch} /></InputGroup.Text>
                        <FormControl
                                type="text"
                                value={filter.text ? filter.text : ""}
                                placeholder="Search for your home organisation..."
                                onChange={e => {dispatch(filterOnText(e.target.value))}}
                                autoFocus />
                    </InputGroup>
                </Col>
                <Col md={3} sm={4}>
                    {country_label}
                        <FormControl as="select" value={filter.country} placeholder="Filter by country" onChange={e => { dispatch(filterOnCountry(e.target.value)) }} >
                            <option value="*" key="all">All countries</option>
                            { country_list.map(country => <option value={country.code} key={country.code}>{country.label}</option>) }
                        </FormControl>
                </Col>
                <Col md={{span: 2, offset: 0}} sm={{span: 2, offset: 0}} xs={false} className="text-right">

                    <ButtonGroup name="layout" size="sm">
                            <Button variant={filter.view === VIEW_GRID ? "primary" : "outline-primary"}
                                    onClick={e => {setCookie("layout", VIEW_GRID, { path: '/' } ); dispatch(setView(VIEW_GRID))} }>
                                <FontAwesomeIcon size="lg" icon={faTh} />
                            </Button>
                            <Button variant={filter.view === VIEW_LIST ? "primary" : "outline-primary"}
                                    onClick={e => {setCookie("layout", VIEW_LIST, { path: '/' } ); dispatch(setView(VIEW_LIST))} }>
                                <FontAwesomeIcon size="lg" icon={faThList} />
                            </Button>
                    </ButtonGroup>

                </Col>
            </Row>
        </Col>
    )
}

const ErrorsSection = (props) => {
    let error_list = props.errors;
    let errors = [];

    let showUrlQueryParamErrorMsg = false;
    for(var i = 0; i < error_list.length; i++) {
        var err = error_list[i];
        if (err.code === "ERROR_NO_RETURN_URL") {
            showUrlQueryParamErrorMsg = true;
            console.error("Error regarding URL query parameters: ", err)
        } else if (err.code === "ERROR_NO_SP_ENTITY_ID") {
            showUrlQueryParamErrorMsg = true;
            console.error("Error regarding URL query parameters: ", err)
        }
    }

    if(showUrlQueryParamErrorMsg) {
        errors.push(
            <p key={err.code+"_"+i} className="text-small text-center error">
                Warning: It appears as if you visited this page directly, this will not work. Please
                login <a href="https://www.clarin.eu/content/easy-access-protected-resources">via the service</a> you
                are trying to access.
            </p>
        )
    }

    return errors;
}

const IdpView = (props)  => {
    const dispatch = useDispatch();
    const idps = useSelector((state) => state.idp_list);
    const filter = useSelector((state) => state.filter);
    const layout = filter.view;
    const [height, setHeight] = useState(500);
    const [cookies, setCookie, removeCookie] = useCookies(['layout', 'entityid']);

    //Update layout if the value loaded from cookie differs from the current value
    if(cookies.layout && cookies.layout != layout) {
        dispatch(setView(parseInt(cookies.layout)));
    }

    //Update selected entityID if the value loaded from cookie differs from the current value
    if(cookies.entityid && cookies.entityid != idps.selected_entityId) {
        dispatch(selectIdp(cookies.entityid));
    }

    React.useEffect(() => {
        window.addEventListener("resize", resizeThrottler, false);
        window.addEventListener("keydown", handleUserKeyPress);
        return () => {
            window.removeEventListener("resize", resizeThrottler);
            window.removeEventListener("keydown", handleUserKeyPress);
        };
    }, []);

    let resizeTimeout;
    const resizeThrottler = () => {
        // ignore resize events as long as an actualResizeHandler execution is in the queue
        if ( !resizeTimeout ) {
            resizeTimeout = setTimeout(function() {
                resizeTimeout = null;
                actualResizeHandler();
                // The actualResizeHandler will execute at a rate of 15fps
            }, 66);
        }
    }

    const actualResizeHandler = () => {
        setHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0));
    }

    const handleUserKeyPress = ( keydown ) => {
        if ( keydown ) {
            if (keydown.keyCode === 13) {
                const selected_idp = idps.selected_idp;
                if (selected_idp) {
                    log_debug("Enter pressed, redirecting to:"+selected_idp.entityID);
                    dispatch(idpClick({}, selected_idp.entityID));
                }
            }
        }
    }

    const main_colums =
        layout === VIEW_GRID ?
            {
                lg: {span: 12, offset: 0}
            } : {
                lg: {span: 8, offset: 2}
            };

    const s =
        layout === VIEW_GRID ?
            {
                lg: {span: 4, offset: 0},
                md: {span: 4, offset: 0},
                sm: {span: 6, offset: 0},
                xs: {span: 12, offset: 0}
            } : {
                lg: {span: 10, offset: 1},
                md: {span: 10, offset: 1},
                sm: {span: 12, offset: 0},
                xs: {span: 12, offset: 0}
            };

    const s_selected =
        layout === VIEW_GRID ?
            {
                lg: {span: 6, offset: 3},
                md: {span: 6, offset: 3},
                sm: {span: 8, offset: 2},
                xs: {span: 12, offset: 0}
            } : {
                lg: {span: 10, offset: 1},
                md: {span: 10, offset: 1},
                sm: {span: 12, offset: 0},
                xs: {span: 12, offset: 0}
            };

    log_debug("Height="+height);

    const filtered = idps.filtered;// applyFilter(idps.filtered, filter);
    //console.log("Filtered:", filtered);
    //console.log("Selected:", idps.selected_idp);
    return (
        <div className="idpList">
            <Row>
                <Col lg={main_colums.lg}>
                    <p className="justified">
                        Select your home organisation below. This is usually the organisation where you work or study. Signing in here will allow you to access certain CLARIN resources and services which are only available to users who have logged in.
                        If you cannot find your organisation in the list below, please select the clarin.eu website account and use your CLARIN website credentials. If you don't have such credentials you can register an
                        account <a href={window.config.user_registration_endpoint}>here</a>. For questions please contact <a href={"mailto:"+window.config.support_contact}>{window.config.support_contact}</a>.
                    </p>
                    <ErrorsSection errors={idps.errors} />
                </Col>
            </Row>

            <Row>
                <Col lg={main_colums.lg}>
                    {
                        idps.selected_idp == null ? null : <IdpPanel
                            title="Previously chosen home organisation"
                            layout={s_selected}
                            element={<Idp
                                entityID={idps.selected_idp.entityID}
                                digest={idps.selected_idp.digest}
                                digestIndex={idps.selected_idp.digest_index}
                                name={idps.selected_idp.display_title}
                                country_code={idps.selected_idp.country_code}
                                country_label={idps.selected_idp.country_label}
                                icon={idps.selected_idp.icon}
                                layout={layout}
                            />}
                        />
                    }
                </Col>
            </Row>

            <Row>
                <Col lg={main_colums.lg}>
                    {
                        height >= 500 ?
                            <IdpPanel
                                title="Home organisation list"
                                layout={s}
                                element={
                                    <IdpGridOrListContainer
                                        data={filtered}
                                        bootstrap_grid={s}
                                        layout={layout} />
                                }
                            /> :
                            <CollapsibleIdpPanel
                                title="Home organisation list"
                                layout={s}
                                element={
                                    <IdpGridOrListContainer
                                        data={filtered}
                                        bootstrap_grid={s}
                                        layout={layout} />
                                }
                            />
                    }
                </Col>
            </Row>
        </div>
    );
}

/*
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
*/
export default withCookies(IdpView);