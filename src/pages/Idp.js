import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Col, Image} from 'react-bootstrap';

class Idp extends Component {

    render() {
        const country_code = this.props.country_code.toUpperCase()
        const country_label = this.props.country_label;

        const type="svg"; //png
        const dir="rectangle"; //rounded
        const image_name="/images/flags/"+dir+"/"+country_code.toLowerCase()+"."+type;
        const image_width=25
        const image_height=25

        var logo = null;
        if(this.props.icon !== null && this.props.icon !== undefined && this.props.icon.url !== "") {
            logo =  <Image src={this.props.icon.url} className="logo" alt="Logo" onError={(event)=>event.target.style.display='none'} />
        }

        var classname = "idp";
        var logo_container_classname = "logo-container";
        if (this.props.layout === 2) {
            //wide layout
            classname += " idp-wide";
            logo_container_classname += " logo-container-wide";
        } else {
            //box layout
            classname += " idp-box";
            logo_container_classname += " logo-container-box";
        }

        return (
            <div className={classname}>
                <Col xs={8}>
                    <div className="idp-title">{this.props.name}</div>
                    <div className="idp-country">
                        <Image src={image_name} alt={"Flag "+this.props.country} width={image_width} height={image_height}/>
                        {country_label}
                    </div>
                </Col>
                <Col xs={4} className={logo_container_classname}>
                    {logo}
                </Col>
            </div>
        );
    }
}

Idp.propTypes = {
    name: PropTypes.string.isRequired,
    country_code: PropTypes.string.isRequired,
    country_label: PropTypes.string.isRequired,
    icon: PropTypes.shape({
        url: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
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