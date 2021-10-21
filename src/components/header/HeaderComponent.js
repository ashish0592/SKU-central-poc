import React from 'react';
import { string } from 'prop-types';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import getResourceListing from './../../redux/selectors/resource'
import {connect} from 'react-redux';
import getLoggedInUserdata from '../../redux/actions/getLoggedInUserdata';


const styles = StyleSheet.create({
    container: {
        height: 40,
        borderBottom: '1px solid #DFE0EB'
    },
    cursorPointer: {
        cursor: 'pointer'
    },
    name: {
        fontFamily: 'Muli',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 14,
        lineHeight: '20px',
        textAlign: 'right',
        letterSpacing: 0.2,
        '@media (max-width: 768px)': {
            display: 'none'
        }
    },
    separator: {
        borderLeft: '1px solid #DFE0EB',
        marginLeft: 32,
        marginRight: 32,
        height: 32,
        width: 2,
        '@media (max-width: 768px)': {
            marginLeft: 12,
            marginRight: 12
        }
    },
    title: {
        fontFamily: 'Muli',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: '30px',
        letterSpacing: 0.3,
        '@media (max-width: 768px)': {
            marginLeft: 36
        },
        '@media (max-width: 468px)': {
            fontSize: 20
        }
    }
});

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        //this.props.dispatch(getLoggedInUserdata())
        
    }
    render(){
    return (
        <Row className={css(styles.container)} vertical="center" horizontal="space-between" {...this.props.otherProps}>
            <span className={css(styles.title)}>{this.props.title}</span>
            {/* <Row vertical="center">
                <div className={css(styles.separator)}></div>
                <Row vertical="center">
                    <span className={css(styles.name, styles.cursorPointer)}>{this.props.loggedInUserData.name}</span>
                </Row>
            </Row> */}
        </Row>
        
    );
}
}

HeaderComponent.propTypes = {
    title: string
};

export default connect(state => getResourceListing(state))(HeaderComponent);
