import { connect } from 'react-redux'
import About from '../pages/About'

const mapStateToProps = state => {
    return {
        version: state.idp_list.version
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

const AboutContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(About)

export default AboutContainer