import React from 'react';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class BingoBoard extends React.Component{
    constructor(props){
        super(props);
        this.URL_BASE = props.URL_BASE

        this.state = {
            bingoBoard: [],
            counter: 0
        };
    }

    componentDidMount(){
        this.req_AllRules();
        this.set_BingoRules();
    }

    async set_BingoRules(){
        var rules;
        var nRows;
        var nCols;
        var nTiles;
        var pickList = [];
        var bingoRule_idx = [];
        var rows = [];

        console.log('Making new board');
        // This needs to be here because react won't redraw unless the state has changed
        // To something that isn't he BingoBoard tiles
        this.setState({bingoBoard: [[]]});

        rules = await this.req_AllRules();
        var nRules = rules.length;

        // Decide rows and columns
        nRows = 3
        nCols = 3
        nTiles = nRows * nCols
        // return if not enough rules
        if (nRules < (nRows * nCols)){
            alert("Not enough rules");
            return;
        }
        console.log(rules);

        // Select random IDs
        for (let i=0; i < nTiles; i++){
            pickList.push(i);
        }
        for (let i=0; i < nTiles; i++){
            let idx = Math.floor(Math.random() * pickList.length);
            bingoRule_idx.push(pickList[idx])
            pickList.splice(idx, 1);
        }

        // Assign to Bingo Rules
        for (let iR = 0; iR < nRows; iR++){
            let row = [];
            for (let iC = 0; iC < nCols; iC++){
                console.log('row: ' + iR + ' col: ' + iC)
                let rule = rules[bingoRule_idx[iR*nCols + iC]];
                console.log(rule)

                row.push(<BoardTile text={rule.text} id={rule.id}/>);
                console.log("R" + iR + " C" + iC);
            }
            rows.push(row);
        }

        this.setState({bingoBoard: rows});
    }

    async req_AllRules(){
        var response;
        var data;

        response = await fetch(this.URL_BASE + "/api/all_rules")
        data = await response.json();
        return data
    }

    render() {
        return <div>
            <h1>Bingo Board</h1>
            <Button onClick={() => this.set_BingoRules()}>Refresh Board</Button>
            <Grid container 
            justify="center" 
            style={{margin: "10px"}}>
                {this.state.bingoBoard.map((row, index) => (
                    <Grid key={index} 
                    container 
                    justify="center" 
                    spacing={2}>
                        {row.map((tile, index) => (
                            <Grid key={index} item  xs>
                                {tile}
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Grid>
        </div>
    }
}

class BoardTile extends React.Component{
    constructor(props){
        super(props);

        this.id = props.id;

        this.state = {
            text: props.text,
            isChecked: false,
            bgColor: "white"
        }
    }

    Check(){
        console.log(this.text);
        if (this.state.isChecked){
            this.color = "white";
            this.setState({isChecked: false});
            console.log("uncheck");
        }
        else{
            this.color = "red";
            this.setState({isChecked: true});
            console.log("check");
        }
    }

    render() {
        return <Paper style={{backgroundColor: this.color}}>
            <Button style={{width: '100%'}} onClick={()=> this.Check()}>
                {this.state.text}
            </Button>
        </Paper>
    }
}

export default BingoBoard