import { Column, Row } from 'simple-flexbox';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import getResourceListing from '../../redux/selectors/resource'
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import clearErrors from '../../redux/actions/clearErrors';

class FilterComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.updateProperty = this.updateProperty.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
    }

    resource = {}
    updateProperty(property, target) {
        this.setState({ enableFilterButton: !!target.value && target.value !== '' ? true : false });
        switch (property) {
            case 'deptNumber':
                this.setState({ deptNumber: target.value });
                break;
            case 'deptName':
                this.setState({ deptName: target.value });
                break;
            case 'subdeptNumber':
                this.setState({ subdeptNumber: target.value });
                break;
            case 'classNumber':
                this.setState({ classNumber: target.value });
                break;
            case 'subclassNumber':
                this.setState({ subclassNumber: target.value });
                break;
            case 'dfmldap':
                this.setState({ dfmldap: target.value });
                break;
            case 'somaldap':
                this.setState({ somaldap: target.value });
                break;
            case 'assocMerchantLdap':
                this.setState({ assocMerchantLdap: target.value });
                break;
            case 'className':
                this.setState({ className: target.value });
                break;
            case 'subclassName':
                this.setState({ subclassName: target.value });
                break;
            case 'subdeptName':
                this.setState({ subdeptName: target.value });
                break;
            case 'businessArea':
                this.setState({ businessArea: target.value });
                break;
            case 'svp':
                this.setState({ svp: target.value });
                break;
            case 'gm':
                this.setState({ gm: target.value });
                break;
            case 'dfm':
                this.setState({ dfm: target.value });
                break;
            case 'soma':
                this.setState({ soma: target.value });
                break;
            case 'assocMerchant':
                this.setState({ assocMerchant: target.value });
                break;
            case 'dfmType':
                this.setState({ dfmType: target.value });
                break;
            case 'somaType':
                this.setState({ somaType: target.value });
                break;
            case 'assocMerchantType':
                this.setState({ assocMerchantType: target.value });
                break;
            default:
                break;
        }
    }

    clearFilter() {
        this.props.dispatch(clearErrors());
        this.setState({ deptNumber: '' });
        this.setState({ subdeptNumber: '' });
        this.setState({ classNumber: '' });
        this.setState({ subclassNumber: '' });
        this.setState({ dfmldap: '' });
        this.setState({ somaldap: '' });
        this.setState({ assocMerchantLdap: '' });
        this.setState({ className: '' });
        this.setState({ subclassName: '' });
        this.setState({ subdeptName: '' });
        this.setState({ deptName: '' });        
        this.setState({ businessArea: '' });
        this.setState({ svp: '' });
        this.setState({ gm: '' });
        this.setState({ dfm: '' });
        this.setState({ soma: '' });
        this.setState({ assocMerchant: '' });
        this.setState({ dfmType: '' });
        this.setState({ somaType: '' });
        this.setState({ assocMerchantType: '' });
    }
    applyFilter() {
        this.props.onApplyFilter({ ...this.state })
    }
    render() {
        return (
            <div>
                <Row>
                    <Column style={{ width: 165 }}>
                        <TextField defaultValue={this.state.deptNumber} margin="dense" id="deptNumber" label="Dept Number" variant="outlined" fullWidth
                            onChange={(e) => { this.updateProperty('deptNumber', e.target) }} />
                    </Column>
                    <Column style={{ marginLeft: 20, width: 165 }}>
                        <TextField defaultValue={this.state.deptName} margin="dense" id="deptName" label="Dept Name" variant="outlined" fullWidth
                            onChange={(e) => { this.updateProperty('deptName', e.target) }} />
                    </Column>
                </Row>
                <Row>
                    <Column style={{ width: 165 }}>
                        {
                            <TextField defaultValue={this.state.subdeptNumber} margin="dense" id="subdeptNumber" label="Sub Dept Number" variant="outlined" fullWidth
                                onChange={(e) => { this.updateProperty('subdeptNumber', e.target) }} />
                        }
                    </Column>
                    <Column style={{ marginLeft: 20, width: 165 }}>
                        <TextField defaultValue={this.state.subdeptName} margin="dense" id="subdeptName" label="Sub Dept Name" variant="outlined" fullWidth
                            onChange={(e) => { this.updateProperty('subdeptName', e.target) }} />
                    </Column>
                </Row>
                <Row>
                    <Column style={{ width: 165 }}>
                        {
                            (!!this.state.deptNumber && this.state.deptNumber !== '') || (!!this.state.subdeptNumber && this.state.subdeptNumber !== '') ?
                                <TextField defaultValue={this.state.classNumber} margin="dense" id="classNumber" label="Class Number" variant="outlined" fullWidth
                                    onChange={(e) => { this.updateProperty('classNumber', e.target) }} /> :
                                <TextField disabled defaultValue={this.state.classNumber} margin="dense" id="classNumber" label="Class Number" variant="outlined" fullWidth
                                    onChange={(e) => { this.updateProperty('classNumber', e.target) }} />
                        }
                    </Column> 
                    <Column style={{ marginLeft: 20, width: 165 }}>
                        <TextField defaultValue={this.state.className} margin="dense" id="className" label="Class Name" variant="outlined" fullWidth
                            onChange={(e) => { this.updateProperty('className', e.target) }} />
                    </Column>  
                </Row>
                <Row>
                    <Column style={{ width: 165 }}>
                        {
                            !!this.state.classNumber && this.state.classNumber !== '' ?
                                <TextField defaultValue={this.state.subclassNumber} margin="dense" id="subclassNumber" label="Sub Class Number" variant="outlined" fullWidth
                                    onChange={(e) => { this.updateProperty('subclassNumber', e.target) }} /> :
                                <TextField disabled defaultValue={this.state.subclassNumber} margin="dense" id="subclassNumber" label="Sub Class Number" variant="outlined" fullWidth
                                    onChange={(e) => { this.updateProperty('subclassNumber', e.target) }} />
                        }
                    </Column>
                    <Column style={{ marginLeft: 20, width: 165 }}>
                        <TextField defaultValue={this.state.subclassName} margin="dense" id="subclassName" label="Sub Class Name" variant="outlined" fullWidth
                            onChange={(e) => { this.updateProperty('subclassName', e.target) }} />
                    </Column>
                </Row>
                <Row>
                    <Column style={{ width: 165 }}>
                        <TextField defaultValue={this.state.dfmldap} margin="dense" id="dfmldap" label={this.props.type === 'AlternateMapping' ? "Alt DFM LDAP" : (this.props.type === 'userTypeMapping' ? "Merchant LDAP" : "DFM LDAP")} variant="outlined" fullWidth
                            onChange={(e) => { this.updateProperty('dfmldap', e.target) }} />
                    </Column>
                    <Column style={{  marginLeft: 20, width: 165 }}>
                        <TextField defaultValue={this.state.dfm} margin="dense" id="dfm" label={this.props.type === 'AlternateMapping' ? "Alt DFM" : (this.props.type === 'userTypeMapping' ? "Merchant" : "DFM")} variant="outlined" fullWidth
                            onChange={(e) => { this.updateProperty('dfm', e.target) }} />
                    </Column>
                </Row>
                {this.props.type === "userTypeMapping" &&
                        <Row>
                            <Column style={{ width: 165 }}>
                                <TextField defaultValue={this.state.dfmType} margin="dense" id="dfmType" label="Merchant Type" variant="outlined" fullWidth
                                    onChange={(e) => { this.updateProperty('dfmType', e.target) }} />
                            </Column>
                            <Column style={{ marginLeft: 20, width: 165 }}>
                                <TextField defaultValue={this.state.somaType} margin="dense" id="somaType" label="SOMA Type" variant="outlined" fullWidth
                                    onChange={(e) => { this.updateProperty('somaType', e.target) }} />
                            </Column>
                        </Row>
                }
                <Row>
                    <Column style={{ width: 165 }}>
                        <TextField defaultValue={this.state.somaldap} margin="dense" id="somaldap" label={this.props.type === 'AlternateMapping' ? "Alt SOMA LDAP" : "SOMA LDAP"} variant="outlined" fullWidth
                            onChange={(e) => { this.updateProperty('somaldap', e.target) }} />
                    </Column>
                    <Column style={{ marginLeft: 20, width: 165 }}>
                        <TextField defaultValue={this.state.soma} margin="dense" id="soma" label={this.props.type === 'AlternateMapping' ? "Alt SOMA" : "SOMA"} variant="outlined" fullWidth
                            onChange={(e) => { this.updateProperty('soma', e.target) }} />
                    </Column>
                </Row>
                {this.props.type === "userTypeMapping" &&
                        <Row>
                            <Column style={{ width: 165 }}>
                                <TextField defaultValue={this.state.assocMerchantLdap} margin="dense" id="assocMerchantLdap" label="Asc Merchant Ldap" variant="outlined" fullWidth
                                    onChange={(e) => { this.updateProperty('assocMerchantLdap', e.target) }} />
                            </Column>
                            <Column style={{ marginLeft: 20, width: 165 }}>
                                <TextField defaultValue={this.state.assocMerchant} margin="dense" id="assocMerchant" label="Asc Merchant" variant="outlined" fullWidth
                                    onChange={(e) => { this.updateProperty('assocMerchant', e.target) }} />
                            </Column>
                        </Row>
                }
                
                {this.props.type === "dfmMapping" &&
                    <Row>
                        <Column style={{ width: 165 }}>
                            <TextField defaultValue={this.state.svp} margin="dense" id="svp" label="SVP" variant="outlined" fullWidth
                                onChange={(e) => { this.updateProperty('svp', e.target) }} />
                        </Column>
                        <Column style={{ marginLeft: 20, width: 165 }}>
                            <TextField defaultValue={this.state.gm} margin="dense" id="gm" label="GM" variant="outlined" fullWidth
                                onChange={(e) => { this.updateProperty('gm', e.target) }} />
                        </Column>
                    </Row>
                }
                <Row>
                    {this.props.type === "userTypeMapping" &&
                        <Column style={{ width: 165 }}>
                            <TextField defaultValue={this.state.assocMerchantType} margin="dense" id="assocMerchantType" label="Asc Merchant Type" variant="outlined" fullWidth
                                onChange={(e) => { this.updateProperty('assocMerchantType', e.target) }} />
                        </Column>
                    }
                    {this.props.type === "dfmMapping" && <Column style={{ width: 165 }}>
                        <TextField defaultValue={this.state.businessArea} margin="dense" id="businessArea" label="Business Area" variant="outlined" fullWidth
                            onChange={(e) => { this.updateProperty('businessArea', e.target) }} />
                    </Column>}
                </Row>
                <Row style={{ marginLeft: 20, marginTop: 20 }}>
                    <div className="ui-dialog-buttonpane p-clearfix">
                        {
                            this.state.enableFilterButton ?
                                <Button style={{ backgroundColor: '#289AD3', color: 'white', fontWeight: 'bold', marginRight: 10 }} variant="contained" onClick={this.applyFilter}>Apply Filter</Button>
                                : <Button disabled style={{ opacity: 0.5, backgroundColor: '#289AD3', color: 'white', fontWeight: 'bold', marginRight: 10 }} variant="contained" onClick={this.applyFilter}>Apply Filter</Button>
                        }
                        {
                            this.state.enableFilterButton ?
                                <Button style={{ backgroundColor: '#289AD3', color: 'white', fontWeight: 'bold', marginRight: 10 }} variant="contained" onClick={this.clearFilter}>Clear</Button>
                                : <Button disabled style={{ opacity: 0.5, backgroundColor: '#289AD3', color: 'white', fontWeight: 'bold', marginRight: 10 }} variant="contained" onClick={this.clearFilter}>Clear</Button>
                        }
                        <Button style={{ backgroundColor: '#289AD3', color: 'white', fontWeight: 'bold', float: 'right' }} variant="contained" onClick={() => { this.props.onCancel() }}>Cancel</Button>
                    </div>
                </Row>
            </div>
        )
    }
}

export default connect(state => getResourceListing(state))(FilterComponent);