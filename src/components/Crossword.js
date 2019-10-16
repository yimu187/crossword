import React from 'react';
import {Input,Grid, List, Label, Modal,Responsive} from 'semantic-ui-react';

const black = {width: '60px', height: '60px', backgroundColor: 'black'};

const Crossword = (props) => {
    return <div className="App">
        <Responsive minWidth={1500}>
            <Grid columns={3} doubling>
                <Grid.Column>
                    {props.enteredChars.map((dataY, indexY) => {
                        return (
                            <div>
                                {dataY.map((item, indexX) => {
                                    return (
                                        item === -1
                                            ? <Input id={indexY + '-' + indexX} transparent style={black} value={''}/>
                                            :
                                            <Input
                                                label={props.getLabelInfo(indexX, indexY)}
                                                labelPosition='left corner'
                                                id={indexY + '-' + indexX}
                                                transparent={props.getTransparent(indexX, indexY)}
                                                style={props.getCss(indexX, indexY)}
                                                onChange={props.onFieldValueChange}
                                                // onFocus={this.onInputFocus.bind(this, indexX, indexY)}
                                                ref={(input) => { props.inputs[indexY][indexX] = input }}
                                                value={item}
                                            />
                                    )
                                })}

                            </div>
                        )
                    })}
                </Grid.Column>
                <Grid.Column>

                    <List>
                        {props.questionsX.map((question, index) => {
                            return(
                                props.clickedXIndex > 0 && index === props.clickedXIndex
                                    ?
                                    <List.Item onClick={props.onXItemClicked.bind(this, index)}>
                                        <Label> {question.sn + ' ' + question.s} </Label>
                                    </List.Item>
                                    :
                                    <List.Item onClick={props.onXItemClicked.bind(this, index)}>{question.sn !== -1 ? (question.sn + ' ' + question.s) : question.s}</List.Item>
                            )
                        })}
                    </List>

                </Grid.Column>
                <Grid.Column>

                    <List>
                        {props.questionsY.map((question, index) => {
                            return(
                                props.clickedYIndex > 0 && index === props.clickedYIndex
                                    ?
                                    <List.Item onClick={props.onYItemClicked.bind(this, index)}>
                                        <Label> {question.sn + ' ' + question.s} </Label>
                                    </List.Item>
                                    :
                                    <List.Item onClick={props.onYItemClicked.bind(this, index)}>{question.sn !== -1 ? (question.sn + ' ' + question.s) : question.s}</List.Item>
                            )

                        })}
                    </List>

                </Grid.Column>
            </Grid>

            <Modal  open={props.modelWindowOpen}
                    centered={false}
                    onClose={props.onModalWindowClose}
                    size={'tiny'}
            >
                <Modal.Header>Çözüldü</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>
                            Bulmaca çözüldü. Tebrikler
                        </p>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        </Responsive>

        <Responsive maxWidth={1500}>
            <h1 style={{'text-align' : 'center'}}> 1500 Piksel genişliğinde veya üstünde olmayan cihazlarda kullanmayınız </h1>
        </Responsive>
    </div>;
};

export default Crossword
