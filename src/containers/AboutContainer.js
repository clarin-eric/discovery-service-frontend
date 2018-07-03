import { connect } from 'react-redux'
import About from '../pages/About'

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {}
}

const AboutContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(About)

export default AboutContainer