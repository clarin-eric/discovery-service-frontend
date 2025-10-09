import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import {idpClick} from "../actions";
import {useDispatch} from "react-redux";
import {useCookies} from "react-cookie";

const Idp = (props) => {
        const dispatch = useDispatch();
        const [cookies, setCookie, removeCookie] = useCookies(['entityid']);

        const country_code = props.country_code.toUpperCase()
        const country_label = props.country_label;

        const type="svg"; //png
        const dir="rectangle"; //rounded
        const image_name="/images/flags/"+dir+"/"+country_code.toLowerCase()+"."+type;
        const image_width=25
        const image_height=25

        var logo = null;
        if(props.icon && props.icon.url && props.icon.url !== "") {
            logo =  <Image fluid src={props.icon.url} className="logo" alt="Logo" onError={(event)=>event.target.style.display='none'} />
        }

        var classname = "idp";
        var logo_container_classname = "logo-container";
        if (props.layout === 2) {
            //wide layout
            classname += " idp-wide";
            logo_container_classname += " logo-container-wide";
        } else {
            //box layout
            classname += " idp-box";
            logo_container_classname += " logo-container-box";
        }

        return (
            <Row
                className={classname+" d-flex align-items-center"}
                onClick={e => {setCookie("entityid", props.entityID, {path: "/"}); dispatch(idpClick({}, props.entityID, props.digest, props.digestIndex));}}
            >
                <Col xs={8}>
                    <div className="idp-title">{props.name}</div>
                    <div className="idp-country">
                        <Image src={image_name} alt={"Flag "+props.country} width={image_width} height={image_height}/>
                        {country_label}
                    </div>
                </Col>
                <Col xs={4} className={logo_container_classname}>
                    {logo}
                </Col>
            </Row>
        );

}

Idp.propTypes = {
    name: PropTypes.string.isRequired,
    digest: PropTypes.string,
    digestIndex: PropTypes.number,
    country_code: PropTypes.string.isRequired,
    country_label: PropTypes.string.isRequired,
    icon: PropTypes.shape({
        url: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number
    }),
    layout: PropTypes.number.isRequired,
};

Idp.defaultProps = {
    name: 'Undefined identity provider',
    country_code: 'eu',
    country_label: "European Union",
    logo: '',
    layout: 1,
};

export default Idp;