import React from 'react';
import './Banner.css';
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

function Banner() {
    return (
        <div className="header">
                <img className="header__logo" src="https://thebernardgroup.com/wp-content/themes/tbg2019/assets/images/the-bernard-group-logo.png"/>
            {/* <div className="header__search">
                <input className="header__searchInput" type="text"/>
                <SearchIcon className="header__searchIcon"/>
            </div> */}
            <div className="header__title">
                <h1>SKU CENTRAL</h1>
            </div>
        </div>
    )
}

export default Banner
