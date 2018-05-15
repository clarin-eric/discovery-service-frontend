import { connect } from 'react-redux'
import Footer from '../footer/Footer'

const mapStateToProps = state => {
    return {
        version: state.idp_list.version
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

const FooterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer)

export default FooterContainer