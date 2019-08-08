import React from 'react';
import Table from 'react-bootstrap/Table';
import DataService from '../../Service/DataService';

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

    checkData() {
        if(this.state.data){
            return this.state.data.map((obj,index)=>{
                return(
                    <React.Fragment key={index}>
                        <tr >
                            <td>{index}</td>
                            <td>{obj.Ttext}</td>
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
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.checkData()
                        }
                    </tbody>
                </Table>
            </>
        );
    }
}

export default SmileTable;