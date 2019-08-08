import React from 'react';
import Table from 'react-bootstrap/Table';
import DataService from '../../Service/DataService';
import Button from 'react-bootstrap/Button';
import SmileModal from './SmileModal';

class SmileTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data : null
        }
    }

    componentDidMount() {
        DataService.getData()
        .then((res)=>{
            console.log(res);
            this.setState({data:res});
        })
        .catch((e)=>{
            console.log(e);
        })
    }
    checkData(handleClick) {
        if(this.state.data){
            return this.state.data.map((obj,index)=>{
                return(
                    <React.Fragment key={index}>
                        <tr >
                            <td>{index}</td>
                            <td>{obj.Ttext}</td>
                            <td><Button onClick={handleClick}>show</Button></td>
                        </tr>
                    </React.Fragment>
                )
            });
        }
    }

    render() {
        return (
            <>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Head</th>
                            <th>Head2</th>
                            <th>Head3</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.checkData(this.props.handleClick)
                        }
                    </tbody>
                </Table>
            </>
        );
    }
}

export default SmileTable;