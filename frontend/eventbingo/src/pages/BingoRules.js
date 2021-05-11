import React from 'react';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import DeleteIcon from '@material-ui/icons/Delete';

class BingoRules extends React.Component{
constructor(props){
    super(props)
    this.URL_BASE = props.URL_BASE

    this.state = {
        newRuleText: '',
        rules: [{id: "0", text: "test"}]
    }
}

    componentDidMount(){
        this.req_AllRules();
        setInterval(this.req_AllRules.bind(this), 5000);
    }

    async req_AddRule(data){
        var url = this.URL_BASE + "/api/add_rule";

        console.log(data);
        await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })

        this.req_AllRules();
    }

    async req_DelRule(data){
        var url = this.URL_BASE + "/api/remove_rule";

        await(fetch(url, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }))

        this.req_AllRules();
    }

    req_AllRules(){
        fetch(this.URL_BASE + "/api/all_rules")
            .then(response => response.json())
            .then(data => this.set_AllRules(data));
    }

    set_AllRules(data){
        this.setState({rules: data.reverse()});
    }

    addRule(){
        var text;
        var data;
        var strJson;
        
        text = this.state.newRuleText;
        if (text.replaceAll(' ','').length <= 3){
            alert('Need to add text');
            return;
        }
        
        strJson = '{ "text" : "' + text.replaceAll('"','\\"') + '"}';
        console.log(strJson);
        data = JSON.parse(strJson);

        this.req_AddRule(data);
        this.setState({newRuleText: ""})
    }

    delRule(rule){
        var data;
        var strJson;

        console.log("deleting: " + rule.id);
        strJson = '{ "id" : "' + rule.id + '"}';
        data = JSON.parse(strJson);

        this.req_DelRule(data);
    }

    _handle_ruleText_InputChange(e){
        var txt;
        txt = e.target.value
        this.setState({newRuleText: txt});
    }

    render() {
        return <div>
            <Paper style={{display: "flex"}}>

                    <Input
                    id="rule-text"
                    label="Enter rule here"
                    variant="filled"
                    margin="normal"
                    value={this.state.newRuleText}
                    onChange={(e) => this._handle_ruleText_InputChange(e)}/>
                    <Button type="" 
                    variant="contained" 
                    color="primary" 
                    style={{margin: "10px"}} 
                    ClickMode="Press"
                    onClick={() => this.addRule()}>
                        Add Rule
                    </Button>

            </Paper>
            <TableContainer component={Paper}>
                <Table className="table-rules" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Rules</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.rules.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row" width="5">
                                    {row.id}
                                </TableCell>
                                <TableCell component="th" scope="row" width="10">
                                    <DeleteIcon onClick={() => this.delRule(row)}/>
                                </TableCell>
                                <TableCell component="th" scope="row" align="left">
                                    {row.text}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    }
}

export default BingoRules