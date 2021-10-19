import React from 'react';
import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {connect} from 'react-redux';
import clearErrors from '../../redux/actions/clearErrors';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import { FileUpload } from 'primereact/fileupload';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles,
    FormControl,
    FormHelperText,
    FormControlLabel, } from '@material-ui/core';
import {InputText} from 'primereact/inputtext';
import getResourceListing from '../../redux/selectors/resource'
import InlineCss from "react-inline-css";
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import EditIcon from '@material-ui/icons/Edit';
import { Row } from 'simple-flexbox';
import getSkuListing from '../../redux/actions/getSkuListing';
import postSkuListing from '../../redux/actions/postSkuListing';
import putSkuListing from '../../redux/actions/putSkuListing'
import {ProgressSpinner} from 'primereact/progressspinner';

class SkuListingComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newRecord: {id:'',revision:'',customer:'',description:'',created_by:'',updated_by:'',number:'', active:''},
            globalFilter: '',
            displayDialog:false, displayBulkDialog: false,
            idError: false, idRequired: false, dialogType:'',
            importedData: [],
            importedCols: [{ field: '', header: 'Header' }]
    };
        this.save = this.save.bind(this);
        this.updateCancel = this.updateCancel.bind(this);        
        this.onSkuSelect = this.onSkuSelect.bind(this);
        this.updateProperty = this.updateProperty.bind(this);
        this.export = this.export.bind(this);
        this.addNew = this.addNew.bind(this);
        this.onBulkInsert = this.onBulkInsert.bind(this);
        this.onBulkUpdate = this.onBulkUpdate.bind(this);
        this.importCSV = this.importCSV.bind(this);

       this.props.dispatch(clearErrors());
       this.props.dispatch(getSkuListing());
        
    }

    initErrors(){
        this.error = false;
        this.setState({
            idError: false,
            idRequired: false
        })
    }

    checkId=(value)=>{
        this.initErrors();
        !!value && this.props.skuList.map((item)=> {
            if(item.id === value){
                this.setState({idError: true})
            }
        })
    }

    addNew(){
            this.props.dispatch(clearErrors());
            this.initErrors();
            this.setState({
                displayDialog: true,
                dialogType: 'ADD',
                newRecord: {...this.state.newRecord, title: 'Add SKU Listing', active:true, created_by:'suchi'}
            });
    }

    onBulkInsert(){
        this.props.dispatch(clearErrors());
        this.initErrors();
        this.setState({
            displayBulkDialog: true,
            dialogType: 'BULK_ADD',
            dialogTitle: 'Bulk SKU Insert',
            importedData: []
        });
}

    onBulkUpdate(){
        this.props.dispatch(clearErrors());
        this.initErrors();
        this.setState({
            displayBulkDialog: true,
            dialogType: 'BULK_UPDATE',
            dialogTitle: 'Bulk SKU Update',
            importedData: []
        });
    }

    onSkuSelect(e){
        this.props.dispatch(clearErrors());
        this.initErrors();
            this.setState({
                displayDialog: true,
                dialogType: 'EDIT',
                newRecord: {...e.data, title: 'Maintain SKU Listing', updated_by:'suchi'}
            });
    }

    async save() {
        if(this.state.dialogType==="ADD" || this.state.dialogType==="EDIT"){
        await this.checkResource(this.state.newRecord)
        if(this.error || this.state.idError) return;
       else if(this.state.dialogType==="ADD"){
            this.props.dispatch(postSkuListing(this.state.newRecord))
            this.setState({
                displayDialog:false
            })
        }
        else{
            this.props.dispatch(putSkuListing(this.state.newRecord))
            this.setState({
                displayDialog:false
            })
        }
    }
    else {
        this.finalList = [];
        this.state.importedData.forEach(x => this.finalList.push({...x, 
            active: x.active.toLowerCase()=="true",
            number: Number(x.number)
        }))
        if (this.state.dialogType==="BULK_ADD"){
            this.finalList.map((obj)=>{
                // this.setState({
                //     obj:{...obj, active: obj.active.toLowerCase()=="true", number: Number(obj.number)}
                // },()=>this.props.dispatch(postSkuListing(obj, true)))
                this.props.dispatch(postSkuListing(obj))
            });
            this.setState({
                displayBulkDialog:false
            })
        }
        if(this.state.dialogType==="BULK_UPDATE"){
            this.state.importedData.map((obj)=>{
                // this.setState({
                //     obj:{...obj, active: obj.active.toLowerCase()=="true", number: Number(obj.number)}
                // },()=>this.bulkSave(obj))
                this.props.dispatch(putSkuListing(obj))
            });
            this.setState({
                displayBulkDialog:false
            })
        }
    }
    }
  

    onClearFilter(){
        this.setState({
            filtered: false,
        });
        this.props.dispatch(getSkuListing());
    }

    export() {
        this.dt.exportCSV();
    }

    updateProperty(property, target) {
        if (!!target.value && target.value !== ''){
                this.setState({newRecord: {...this.state.newRecord, [property]: target.value}})
        }
        else {
            this.state.newRecord[property] = '';
        }

        if(property === 'id'){
            this.setState({idError: false},() => this.checkId(target.value))
        }

        if(property === 'number'){
            this.setState({newRecord: {...this.state.newRecord, [property]: Number(target.value)}})
        }
    }

   updateCancel(){
    this.setState({
        newRecord: {},
        displayDialog: false,
        displayBulkDialog: false,
        importedCols: [{ field: '', header: 'Header' }]
    })
    this.props.dispatch(clearErrors());
   }

    checkResource(resource){
        this.error = false;
        this.props.dispatch(clearErrors());
        if (this.checkEmpty(resource.id)){
            this.error = true;
            this.setState({idRequired: true})
        }
    }

    checkEmpty(fieldValue){
        return !!fieldValue && fieldValue.length > 0 ? false : true;
    }

    handleChange=()=>{
        this.setState({newRecord: {...this.state.newRecord, active: !this.state.newRecord.active}})
    }

    isActive(e){
        return(
            <Switch
                checked={e.active===true || e.active ==='true'}
                inputProps={{ 'aria-label': 'controlled' }}
                color ="secondary"
            />
        )
    }
     toCapitalize(s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    importCSV(e) {
        const file = e.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const csv = e.target.result;
            const data = csv.split('\n');

            // Prepare DataTable
            const cols = data[0].replace(/['"]+/g, '').split(',');
            data.shift();
            let importedCols = cols.map(col => ({ field: col, header: this.toCapitalize(col.replace(/['"]+/g,'')) }));
            let importedData = data.map(d => {
                d = d.split(',');
                return cols.reduce((obj, c, i) => {
                    obj[c] = d[i].replace(/['"]+/g, '');
                    return obj;
                }, {});
            });

            this.setState({
                importedCols,
                importedData
            });
        };

        reader.readAsText(file, 'UTF-8');
    }

    
    render() {
        const DialogContent = withStyles(theme => ({
            root: {
              padding: theme.spacing(2),
            },
          }))(MuiDialogContent);
          
          const DialogActions = withStyles(theme => ({
            root: {
              margin: 0,
              padding: theme.spacing(1),
            },
          }))(MuiDialogActions);

        var header = <div style={{'textAlign':'left'}}>
                        <i className="pi pi-search" style={{margin:'4px 4px 0 0'}}></i>
                        <InputText type="search" onInput={(e) => this.setState({globalFilter: e.target.value})} placeholder="Global Search" size="50"/>
                        
                        <Button onClick={this.addNew} style={{ marginLeft: 10, textAlign: 'left', backgroundColor: '#289AD3', color: 'white', fontWeight: 'bold', marginRight:10}}  variant="contained"><i className="pi pi-plus-circle" style={{margin:'0px 5px 0 0px'}}></i>Add New</Button>
                        {/* <Button style={{padding:0}} variant="contained"><FileUpload chooseOptions={{ label: 'BULK INSERT', icon: 'pi pi-file-o', style:{ textAlign: 'left', backgroundColor: '#289AD3', color: 'white', fontWeight: 'bold', fontSize: '14px', padding: '5px'}}} mode="basic" auto url="https://primefaces.org/primereact/showcase/upload.php" name="sku" accept=".csv" className="p-mr-2" onUpload={this.importCSV} /> </Button> */}
                        <Button onClick={this.onBulkInsert} style={{ marginLeft: 10, textAlign: 'left', backgroundColor: '#289AD3', color: 'white', fontWeight: 'bold', marginRight:10}}  variant="contained"><i className="pi pi pi-file-o" style={{margin:'0px 5px 0 0px'}}></i>Bulk Insert</Button>
                        <Button onClick={this.onBulkUpdate} style={{ marginLeft: 10, textAlign: 'left', backgroundColor: '#289AD3', color: 'white', fontWeight: 'bold', marginRight:10}}  variant="contained"><i className="pi pi pi-file-o" style={{margin:'0px 5px 0 0px'}}></i>Bulk Update</Button>
                        <Button onClick={this.export} style={{ marginLeft: 10, textAlign: 'left', backgroundColor: '#289AD3', color: 'white', fontWeight: 'bold', marginRight:10}}  variant="contained"><i className="pi pi-external-link" style={{margin:'0px 5px 0 0px'}}></i>Export</Button>
                    </div>;
        
        let dialogFooter = (
            <div className="ui-dialog-buttonpane p-clearfix">
                <Button style={{backgroundColor: '#289AD3', color: 'white', fontWeight: 'bold', marginRight:10}} variant="contained" onClick={this.save}>Save</Button>
                <Button style={{backgroundColor: '#289AD3', color: 'white', fontWeight: 'bold', float:'right'}} variant="contained" onClick={this.updateCancel}>Cancel</Button>
            </div>
            )
        
        return (
            <>
            {this.props.isError ? <Alert severity="error">{this.props.errorList.join(', ')}</Alert>: null}
            {this.props.isSuccess ? <Alert severity="success">{this.props.successList.join(', ')}</Alert>: null}
            <InlineCss stylesheet=" & .p-highlight {background-color: #289AD3} .p-datatable-thead  {height: 75px}">

            <div>
                <div>
                    {
                        this.props.isLoading? <ProgressSpinner style={{marginLeft: '45%'}}/> : 
                        <DataTable data-testid="table-data" editable={false} value={this.props.skuList} paginator={true} rows={10}  header={header} ref={(el) => { this.dt = el; }}
                            selection={this.state.selectedResource} selectionMode="single"
                            onSelection={e => {this.setState({selectedResource: e.value});}}
                            onRowSelect={this.onSkuSelect}
                            globalFilter={this.state.globalFilter} emptyMessage="No records found"
                            scrollHeight="400" scrollable={true} style={{ width: '100%', zoom: '65%'}} 
                            exportFilename="SKU_Listing">
                            <Column key="active" field="active" header="active" style={{width: '125px'}} body={(e)=>this.isActive(e)} sortable={true}/>
                            <Column key="id" field="id" style={{width: '125px'}} header="id" sortable={true} />
                            <Column key="revision" field="revision" style={{width: '150px'}} header="revision" sortable={true} />
                            <Column key="customer" field="customer" style={{width: '150px'}} header="customer" sortable={true} />
                            <Column key="description" field="description" style={{width: '200px'}} header="description" sortable={true} />
                            <Column key="created_by" field="created_by" style={{width: '150px'}} header="created_by" frozen={false} sortable={true} />
                            <Column key="updated_by" field="updated_by" style={{width: '150px'}} header="updated_by" sortable={true} />
                            <Column key="number" field="number" style={{width: '150px'}} header="number" sortable={true} />
                        </DataTable>
                    }
                </div>
    
                <Dialog style={{zoom:'65%'}} title="add-dialog" maxWidth='xs' open={this.state.displayDialog}> 
                    <DialogTitle id="customized-dialog-title">
                        {this.state.newRecord.title}
                    </DialogTitle>
                    <DialogContent dividers>
                        {
                            this.props.isError? <Alert severity="error">{this.props.errorList.join(', ')}</Alert>: ''
                        }
                        {
                            <div>
                        <FormControl required fullWidth>
                            <TextField disabled={this.state.dialogType==='EDIT'} required margin="dense" id="id" label="ID" 
                            defaultValue={this.state.newRecord.id} variant="outlined" fullWidth onBlur={(e)=>{this.updateProperty('id', e.target)}}
                            />
                          <FormHelperText style={{ color: "red", display: "flex", alignSelf: "flex-end", margin: "0 0 0.25rem 0" }}>
                                    {this.state.idError === true ? "Id already exists" : null}
                                    {this.state.idRequired === true ? "Required" : null}
                          </FormHelperText>
                        </FormControl>
                        <TextField margin="dense" id="revision" label="Revision" 
                        defaultValue={this.state.newRecord.revision} onBlur={(e)=>this.updateProperty('revision', e.target)} variant="outlined" fullWidth
                         />
                         <TextField margin="dense" id="customer" label="Customer" 
                        defaultValue={this.state.newRecord.customer} variant="outlined" fullWidth onBlur={(e)=>this.updateProperty('customer', e.target)}
                         />
                        <TextField margin="dense" id="description" label="Description" 
                        defaultValue={this.state.newRecord.description} onBlur={(e)=>this.updateProperty('description', e.target)} variant="outlined" fullWidth
                         />
                        <TextField margin="dense" id="number" label="Number" type="number"
                        defaultValue={this.state.newRecord.number} onBlur={(e)=>this.updateProperty('number', e.target)} variant="outlined" fullWidth
                         />
                         <FormControlLabel control={
                            <Switch
                                checked={this.state.newRecord.active===true}
                                onChange={this.handleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                                color ="secondary"
                            />
                        } label="Is Active" labelPlacement='start' style={{color: "#888"}}/>
                            </div>
                        }
                    </DialogContent>
                    <DialogActions>
                        {dialogFooter}
                    </DialogActions>
                </Dialog>
                <Dialog style={{zoom:'65%'}} maxWidth='md' open={this.state.displayBulkDialog}> 
                    <DialogTitle id="customized-dialog-title">
                        {this.state.dialogTitle}
                    </DialogTitle>
                    <DialogContent dividers>
                        {
                            this.props.isError? <Alert severity="error">{this.props.errorList.join(', ')}</Alert>: ''
                        }  
                        {
                            <div>
                                <FileUpload chooseOptions={{ label: 'LOAD CSV', icon: 'pi pi-file-o', style:{ textAlign: 'left', backgroundColor: '#289AD3', color: 'white', fontWeight: 'bold'}}} mode="basic" auto url="https://primefaces.org/primereact/showcase/upload.php" name="sku" accept=".csv" className="p-mr-2" onUpload={this.importCSV} />
                                {this.state.importedCols.length && <DataTable style={{marginTop: 10}} value={this.state.importedData} emptyMessage="No records" paginator rows={5} alwaysShowPaginator={false}>
                        {
                            this.state.importedCols.map((col, index) => <Column key={index} field={col.field} header={col.header} />)
                        }
                    </DataTable>
                        }
                            </div>
                        }

                    </DialogContent>
                    <DialogActions>
                        {dialogFooter}
                    </DialogActions>
                </Dialog>
            </div>
            </InlineCss>
            </>
        );
    }
}
export default connect(state => getResourceListing(state))(SkuListingComponent);
