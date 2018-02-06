import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';

class Idp extends Component {

    render() {
        var countries = {
            'EU': 'European Union',
            'AF': 'Afghanistan',
            'AX': 'Åland Islands',
            'AL': 'Albania',
            'DZ': 'Algeria',
            'AS': 'American Samoa',
            'AD': 'Andorra',
            'AO': 'Angola',
            'AI': 'Anguilla',
            'AQ': 'Antarctica',
            'AG': 'Antigua and Barbuda',
            'AR': 'Argentina',
            'AM': 'Armenia',
            'AW': 'Aruba',
            'AC': 'Ascension Island',
            'AU': 'Australia',
            'AT': 'Austria',
            'AZ': 'Azerbaijan',
            'BS': 'Bahamas', //The Bahamas
            'BH': 'Bahrain',
            'BD': 'Bangladesh',
            'BB': 'Barbados',
            'BY': 'Belarus',
            'BE': 'Belgium',
            'BZ': 'Belize',
            'BJ': 'Benin',
            'BM': 'Bermuda',
            'BT': 'Bhutan',
            'BO': 'Bolivia',
            'BQ': 'Bonaire, Sint Eustatius and Saba', //Caribbean Netherlands
            'BA': 'Bosnia and Herzegovina',
            'BW': 'Botswana',
            'BV': 'Bouvet Island',
            'BR': 'Brazil',
            'IO': 'British Indian Ocean Territory',
            'VG': 'British Virgin Islands', //Virgin Islands, British
            'BN': 'Brunei Darussalam', // Brunei
            'BG': 'Bulgaria',
            'BF': 'Burkina Faso',
            'MM': 'Burma', //Myanmar
            'BI': 'Burundi',
            'KH': 'Cambodia',
            'CM': 'Cameroon',
            'CA': 'Canada',
            'CV': 'Cape Verde',
            'KY': 'Cayman Islands',
            'CF': 'Central African Republic',
            'TD': 'Chad',
            'CL': 'Chile',
            'CN': 'China', //People's Republic of China
            'CX': 'Christmas Island',
            'CC': 'Cocos (Keeling) Islands',
            'CO': 'Colombia',
            'KM': 'Comoros',
            'CD': 'Congo, Democratic Republic of the', //Democratic Republic of the Congo
            'CG': 'Congo, Republic of the', //Republic of the Congo|Congo
            'CK': 'Cook Islands',
            'CR': 'Costa Rica',
            'CI': "Côte d'Ivoire",
            'HR': 'Croatia',
            'CU': 'Cuba',
            'CW': 'Curaçao',
            'CY': 'Cyprus',
            'CZ': 'Czech Republic',
            'DK': 'Denmark',
            'DJ': 'Djibouti',
            'DM': 'Dominica',
            'DO': 'Dominican Republic',
            'EC': 'Ecuador',
            'EG': 'Egypt',
            'SV': 'El Salvador',
            'GQ': 'Equatorial Guinea',
            'ER': 'Eritrea',
            'EE': 'Estonia',
            'ET': 'Ethiopia',
            'FK': 'Falkland Islands', //|Falkland Islands (Malvinas)
            'FO': 'Faroe Islands',
            'FJ': 'Fiji',
            'FI': 'Finland',
            'FR': 'France',
            'GF': 'French Guiana',
            'PF': 'French Polynesia',
            'TF': 'French Southern and Antarctic Lands', //French Southern Territories
            'GA': 'Gabon',
            'GM': 'Gambia', //The Gambia
            'GE': 'Georgia',
            'DE': 'Germany',
            'GH': 'Ghana',
            'GI': 'Gibraltar',
            'GR': 'Greece',
            'GL': 'Greenland',
            'GD': 'Grenada',
            'GP': 'Guadeloupe',
            'GU': 'Guam',
            'GT': 'Guatemala',
            'GG': 'Guernsey',
            'GN': 'Guinea',
            'GW': 'Guinea-Bissau',
            'GY': 'Guyana',
            'HT': 'Haiti',
            'HM': 'Heard Island and McDonald Islands',
            'HN': 'Honduras',
            'HK': 'Hong Kong',
            'HU': 'Hungary',
            'IS': 'Iceland',
            'IN': 'India',
            'ID': 'Indonesia',
            'IR': 'Iran', //Iran, Islamic Republic of
            'IQ': 'Iraq',
            'IE': 'Ireland', //Republic of Ireland
            'IM': 'Isle of Man',
            'IL': 'Israel',
            'IT': 'Italy',
            'JM': 'Jamaica',
            'JP': 'Japan',
            'JE': 'Jersey',
            'JO': 'Jordan',
            'KZ': 'Kazakhstan',
            'KE': 'Kenya',
            'KI': 'Kiribati',
            'KP': 'North Korea', //Korea, Democratic People's Republic of
            'KR': 'South Korea', //Korea, Republic of
            'KW': 'Kuwait',
            'KG': 'Kyrgyzstan',
            'LA': 'Laos', //Lao People's Democratic Republic
            'LV': 'Latvia',
            'LB': 'Lebanon',
            'LS': 'Lesotho',
            'LR': 'Liberia',
            'LY': 'Libya', //Libyan Arab Jamahiriya
            'LI': 'Liechtenstein',
            'LT': 'Lithuania',
            'LU': 'Luxembourg',
            'MO': 'Macau', //Macao|Macao Special Administrative Region of the People's Republic of China
            'MK': 'Macedonia', //Republic of Macedonia|FYR Macedonia|Macedonia, the former Yugoslav Republic of
            'MG': 'Madagascar',
            'MW': 'Malawi',
            'MY': 'Malaysia',
            'MV': 'Maldives',
            'ML': 'Mali',
            'MT': 'Malta',
            'MH': 'Marshall Islands',
            'MQ': 'Martinique',
            'MR': 'Mauritania',
            'MU': 'Mauritius',
            'YT': 'Mayotte',
            'MX': 'Mexico',
            'FM': 'Micronesia, Federated States of', //Federated States of Micronesia
            'MD': 'Moldova', //Moldova, Republic of
            'MC': 'Monaco',
            'MN': 'Mongolia',
            'ME': 'Montenegro',
            'MS': 'Montserrat',
            'MA': 'Morocco',
            'MZ': 'Mozambique',
            'NA': 'Namibia',
            'NR': 'Nauru',
            'NP': 'Nepal',
            'NL': 'Netherlands',
            'NC': 'New Caledonia',
            'NZ': 'New Zealand',
            'NI': 'Nicaragua',
            'NE': 'Niger',
            'NG': 'Nigeria',
            'NU': 'Niue',
            'NF': 'Norfolk Island',
            'MP': 'Northern Mariana Islands',
            'NO': 'Norway',
            'OM': 'Oman',
            'PK': 'Pakistan',
            'PW': 'Palau',
            'PS': 'Palestine', //State of Palestine|Palestinian territories|Palestinian Territory, Occupied
            'PA': 'Panama',
            'PG': 'Papua New Guinea',
            'PY': 'Paraguay',
            'PE': 'Peru',
            'PH': 'Philippines',
            'PN': 'Pitcairn Islands', //Pitcairn
            'PL': 'Poland',
            'PT': 'Portugal',
            'PR': 'Puerto Rico',
            'QA': 'Qatar',
            'RE': 'Réunion',
            'RO': 'Romania',
            'RU': 'Russia', //Russian Federation
            'RW': 'Rwanda',
            'BL': 'Saint Barthélemy',
            'SH': 'Saint Helena, Ascension and Tristan da Cunha',
            'KN': 'Saint Kitts and Nevis',
            'LC': 'Saint Lucia',
            'MF': 'Saint Martin', //Collectivity of Saint Martin|Saint Martin (French part)
            'PM': 'Saint Pierre and Miquelon',
            'VC': 'Saint Vincent and the Grenadines',
            'WS': 'Samoa',
            'SM': 'San Marino',
            'ST': 'São Tomé and Príncipe',
            'SA': 'Saudi Arabia',
            'SN': 'Senegal',
            'RS': 'Serbia',
            'SC': 'Seychelles',
            'SL': 'Sierra Leone',
            'SG': 'Singapore',
            'SX': 'Sint Maarten', //Sint Maarten (Dutch part)
            'SK': 'Slovakia',
            'SI': 'Slovenia',
            'SB': 'Solomon Islands',
            'SO': 'Somalia',
            'ZA': 'South Africa',
            'GS': 'South Georgia and the South Sandwich Islands',
            'ES': 'Spain',
            'LK': 'Sri Lanka',
            'SD': 'Sudan',
            'SR': 'Suriname',
            'SJ': 'Svalbard and Jan Mayen',
            'SZ': 'Swaziland',
            'SE': 'Sweden',
            'CH': 'Switzerland',
            'SY': 'Syria', //Syrian Arab Republic
            'TW': 'Taiwan', //Taiwan, Province of China
            'TJ': 'Tajikistan',
            'TZ': 'Tanzania', //Tanzania, United Republic of
            'TH': 'Thailand',
            'TL': 'Timor-Leste', //East Timor
            'TG': 'Togo',
            'TK': 'Tokelau',
            'TO': 'Tonga',
            'TT': 'Trinidad and Tobago',
            'TN': 'Tunisia',
            'TR': 'Turkey',
            'TM': 'Turkmenistan',
            'TC': 'Turks and Caicos Islands',
            'TV': 'Tuvalu',
            'UG': 'Uganda',
            'UA': 'Ukraine',
            'GB': 'UK', //United Kingdom|United Kingdom of Great Britian and Northern Ireland|Great Britian
            'AE': 'United Arab Emirates',
            'UM': 'United States Minor Outlying Islands',
            'UY': 'Uruguay',
            'US': 'USA', //United States of America|United States
            'UZ': 'Uzbekistan',
            'VU': 'Vanuatu',
            'VA': 'Vatican City', //Holy See (Vatican City State)
            'VE': 'Venezuela', //Venezuela, Bolivarian Republic of
            'VN': 'Viet Nam', //Vietnam,
            'VI': 'Virgin Islands, U.S.', //United States Virgin Islands,
            'WF': 'Wallis and Futuna',
            'EH': 'Western Sahara',
            'YE': 'Yemen',
            'ZM': 'Zambia',
            'ZW': 'Zimbabwe',
            'XX': 'Experimental'
        };

        var country_code = this.props.country.toUpperCase()
        var country_label = countries[country_code];
        var img = country_code.toLowerCase()+".png";
        if( country_code === 'EU' ) {
            img = "europeanunion.png"
        }

        var logo = null;
        if(this.props.icon !== null && this.props.icon !== undefined && this.props.icon.url !== "") {
            logo = (<img className="logo" src={this.props.icon.url} alt="logo"></img>)
        }

        return (
            <Row className="idp">
                <Col lg={8}>
                    <div className="idp-title">{this.props.name}</div>
                    <div className="idp-country"><img src={"/images/flags/"+img} alt={"Flag "+this.props.country}></img>{country_label}</div>
                </Col>
                <Col lg={4}>
                    {logo}
                </Col>
            </Row>
        );
    }
}

Idp.propTypes = {
    name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    icon: PropTypes.shape({
        url: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
    }),
};

Idp.defaultProps = {
    name: 'Undefined identity provider',
    country: 'eu',
    logo: '',
};

export default Idp;