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
            <h2>Test Tool v1.0</h2>
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

