import React from "react";
import {connect} from "react-redux";
import clearErrors from '../../redux/actions/clearErrors';

class AboutComponent extends React.Component {  
    constructor(props) {
        super(props)
        this.props.dispatch(clearErrors());                    
    }
    render() {
        return (
            <div>
            <h3>SKU Central v1.0.0</h3>
            <p>iQuadra Technologies Ltd</p>
            </div>
    );
  }
}

const mapStateToProps = (state) => {
    return state;
  };
  const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(AboutComponent);

