import React from 'react';
import SkuListingComponent from './SkuListingComponent'
import AboutComponent from './AboutComponent'

class ContentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {"admin": true };
    }
    render() {
        return (
            <div>
                {
                this.props.selectedItem === "Maintain SKU Listing" ? <SkuListingComponent/> : 
                this.props.selectedItem === 'About' ? <AboutComponent/> :
                null}
            </div>
        );
    }
}
export default ContentComponent
