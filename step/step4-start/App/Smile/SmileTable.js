import React from 'react';
import Table from 'react-bootstrap/Table';

class SmileTable extends React.Component {

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
                        <tr>
                            <td>xx</td>
                            <td>yy</td>
                        </tr>
                    </tbody>
                </Table>
            </>
        );
    }
}

export default SmileTable;