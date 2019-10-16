import React, {Component} from 'react';
import { Form, Button, Segment, Table} from 'semantic-ui-react';

class Contents extends Component {

    constructor(){
        super();
        this.onSayiChange = this.onSayiChange.bind(this);
    }
    fileInputRef = React.createRef();

    state = {
        selectedFileName : '',
        selectedFile : '',
        sayi : null,
        list : []
    }

    fileChange(event){
        const file = event.target.files[0];
        let fileName = null;
        if(file != null){
            fileName = file.name;
        }

        this.setState({
            selectedFileName: fileName,
            selectedFile : file
        })
    }

    onSayiChange(e){
        this.setState({
            sayi : e.target.value
        })
    }

    onButtonClick(){
        console.log('onButtonClick')
    }

    render() {
        return (
            <div>
                <Segment>
                    <Form>

                        <Form.Field>
                            <input
                                ref={this.fileInputRef}
                                type="file"
                                // hidden
                                onChange={this.fileChange}
                            />
                        </Form.Field>

                        <Form.Field>
                            <input placeholder='Son Bakiye' value={this.state.sayi}  onChange={this.onSayiChange}/>
                        </Form.Field>

                    </Form>
                </Segment>
                <Button type='submit' onClick={this.onButtonClick}>Gönder</Button>

                <Segment>

                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell textAlign='center'>Tarih</Table.HeaderCell>
                                <Table.HeaderCell textAlign='center'>İşlem</Table.HeaderCell>
                                <Table.HeaderCell textAlign='center'>Etiket</Table.HeaderCell>
                                <Table.HeaderCell textAlign='center'>Tutar</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>

                            {this.state.list.map(item => {
                                return (
                                    <Table.Row key={item.key}>
                                        {/*<Table.Cell textAlign='center' style={etiket === item.etiket ? paintTableRowStyle : noPaintTableRowStyle}>{new Date(item.tarih).toLocaleDateString()}</Table.Cell>*/}
                                        {/*<Table.Cell textAlign='center' style={etiket === item.etiket ? paintTableRowStyle : noPaintTableRowStyle}>{item.islem}</Table.Cell>*/}
                                        {/*<Table.Cell textAlign='center' style={etiket === item.etiket ? paintTableRowStyle : noPaintTableRowStyle}>{item.etiket}</Table.Cell>*/}
                                        {/*<Table.Cell textAlign='center' style={etiket === item.etiket ? paintTableRowStyle : noPaintTableRowStyle}>{item.tutar}</Table.Cell>*/}

                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    </Table>


                </Segment>
            </div>
        );
    }
}

export default Contents;
