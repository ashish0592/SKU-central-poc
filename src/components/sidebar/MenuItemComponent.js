import React from 'react';
import { bool, func, string } from 'prop-types';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
    activeBar: {
        height: 36,
        width: 4,
        backgroundColor: '#DDE2FF',
        position: 'absolute',
        left: 0
    },
    activeContainer: {
        backgroundColor: 'rgba(221,226,255, 0.08)'
    },
    activeTitle: {
        color: 'White'
    },
    container: {
        height: 36,
        cursor: 'pointer',
        ':hover': {
            backgroundColor: 'rgba(221,226,255, 0.08)'
        },
        paddingLeft: 12,
        paddingRight: 12,
    },
    title: {
        fontFamily: 'Muli',
        fontSize: 12,
        letterSpacing: '0.2px',
        color: '#DDE2FF',
        marginLeft: 24
    }
});

function MenuItemComponent(props) {
    const { active, icon, title, ...otherProps } = props;
    return (
        <Row className={css(styles.container, active && styles.activeContainer)} vertical="center" {...otherProps}>
            {active && <div className={css(styles.activeBar)}></div>}
            <span className={css(styles.title, active && styles.activeTitle)}>{title}</span>
        </Row>
    );
}

MenuItemComponent.propTypes = {
    active: bool,
    icon: func,
    title: string
};

export default MenuItemComponent;
