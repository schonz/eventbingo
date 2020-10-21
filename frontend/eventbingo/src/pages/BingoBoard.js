import React from 'react';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class BingoBoard extends React.Component{
    constructor(props){
        super(props);
        this.URL_BASE = props.URL_BASE

        this.state = {
            bingoBoard: [["1","2","3"],["4","5","6"],["7","8","9"]],
        };
    }

    componentDidMount(){
        this.set_BingoRules()
    }

    async set_BingoRules(){
        var rules;
        var nRows;
        var nCols;
        var bingoRule_ids = [];

        rules = await this.req_AllRules();
        var nRules = rules.length;

        // Decide rows and columns
        nRows = 3
        nCols = 3

        // Select random IDs
        var pickList = []
        for (let i=0; i < rules.length; i++){
            pickList.push(rules[i].id);
        }

        for (let i=0; i < rules.length; i++) {
            let idx;
            let newID;

            idx = Math.floor(Math.random() * pickList.length);
            newID = pickList.splice(idx, 1);
            bingoRule_ids.push(newID);
        }

        // Assign to Bingo Rules
        var rows = [];
        for (let iR = 0; iR < nRows; iR++){
            let row = [];
            for (let iC = 0; iC < nCols; iC++){
                row.push(rules[bingoRule_ids[iR*nCols + iC]].text);
                //row.push(rules[bingoRule_ids[iR*nCols + iC]]);
            }
            rows.push(row);
        }

        this.setState({bingoBoard: rows})
    }

    async req_AllRules(){
        var response;
        var data;

        response = await fetch(this.URL_BASE + "/api/all_rules");
        data = response.json();
        return data
    }

    render() {
        return <div>
            <h1>Bingo Board</h1>
            <Button onClick={() => this.set_BingoRules()}>Refresh Board</Button>
            <Grid container 
            justify="center" 
            style={{margin: "10px"}}>
                {this.state.bingoBoard.map((row) => (
                    <Grid container justify="center" spacing={2}>
                        {row.map((value) => (
                            <Grid item  xs>
                                <Paper>
                                    <Button>{value}</Button>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Grid>
        </div>
    }
}

export default BingoBoard