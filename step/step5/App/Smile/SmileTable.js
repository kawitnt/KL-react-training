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
                        <td>xx</td>
                        <td>yy</td>
                    </tbody>
                </Table>
            </>
        );
    }
}

export default SmileTable;