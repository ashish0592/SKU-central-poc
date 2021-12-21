import React, {Component} from 'react';
import { Column, Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import SidebarComponent from './components/sidebar/SidebarComponent';
import HeaderComponent from './components/header/HeaderComponent';
import ContentComponent from './components/content/ContentComponent';
import './App.css';
import BannerComponent from './components/header/BannerComponent';
import {Provider } from 'react-redux';
import store from './redux/store';

const styles = StyleSheet.create({
    container: {
        height: '100%',
        minHeight: '100vh'
    },
    content: {
        // marginTop: 20
    },
    mainBlock: {
        backgroundColor: '#F7F8FC',
        paddingLeft: 30,
        paddingRight:30,
        paddingBottom: 30
    }
});

class App extends Component {
    state = { selectedItem: 'Maintain SKU Listing', login: false };

    setLogin(value){
        this.setState({login: value})
    }
    componentDidMount() {
        window.addEventListener('resize', this.resize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    resize = () => this.forceUpdate();

    render() {
        
        const { selectedItem } = this.state;
        return (
            <Provider store={store}>
                <Column style={{backgroundColor:'#F7F8FC'}}>
                    <Row horizontal="center" >
                         <BannerComponent/>
                    </Row>
                    {/* <Row style={{alignSelf:"center"}}>
                        <SignInComponent setLogin={this.setLogin} login={this.state.login}/>
                    </Row> */}
                    <Row className={css(styles.container)}>
                        <SidebarComponent selectedItem={selectedItem} onChange={(selectedItem) => this.setState({ selectedItem })} />
                        <Column flexGrow={1} className={css(styles.mainBlock)}>
                            <HeaderComponent title={selectedItem} />
                            <div className={css(styles.content)}>
                                <ContentComponent selectedItem={selectedItem}/>
                            </div>
                        </Column>
                    </Row>
                </Column>
            </Provider>
        );
    }
}

export default App;
