import React,{Component} from 'react';
import Header from "../Solve";
import Crossword from '../../components/Crossword';
import {Segment, Button, Modal, Form} from 'semantic-ui-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const standart = {width: '60px', height: '60px'};
const selected = {width: '60px', height: '60px', backgroundColor: '#B3B3B3'};
const success = {width: '60px', height: '60px', backgroundColor: 'green'};

class Add extends Component{

    inputs = Array(8).fill(null).map(()=>Array(8).fill(null));

    state = {
        enteredChars : [
            ['', '', '', '','', '', '', ''],
            ['', '', '', '','', '', '', ''],
            ['', '', '', '','', '', '', ''],
            ['', '', '', '','', '', '', ''],
            ['', '', '', '','', '', '', ''],
            ['', '', '', '','', '', '', ''],
            ['', '', '', '','', '', '', ''],
            ['', '', '', '','', '', '', '']
        ],
        questionsX: [{s:'Soldan Sağa', sn:-1, c:'-1', xbas:-1, xbit: -1, ybas:-1, ybit: -1}],
        questionsY: [{s:'Yukarıdan Aşağıya', sn:-1, c:'-1', xbas:-1, xbit: -1, ybas:-1, ybit: -1}],
        clickedXIndex : -1,
        clickedYIndex : -1,
        modelWindowOpen: false,
        recordId: -1,
        qFormWindowOpen: false,
        qFormData: {},
        windowActionType: ''
    };

    onFieldValueChange = (field, event) => {
        const clickedXIndex = this.state.clickedXIndex;
        const clickedYIndex = this.state.clickedYIndex;
        const questionsX = this.state.questionsX;
        const questionsY = this.state.questionsY;
        let enteredChars = this.state.enteredChars;

        const id = event.id;
        const indexArr = id.split('-');
        const indexY = parseInt(indexArr[0]);
        const indexX = parseInt(indexArr[1]);

        const enteredValue = event.value;
        let length = enteredValue.length;
        const value = length > 0 ? enteredValue !== 'i' ? enteredValue.substr(length - 1, length).toUpperCase() : 'İ' : '';
        enteredChars[indexY][indexX] = value;

        const focusedItemX = clickedXIndex > 0 && indexX + 1 < enteredChars[indexY].length ? indexX + 1 : indexX;
        let focusedItemY = clickedYIndex > 0 && indexY + 1 < enteredChars[indexX].length ? indexY + 1 : indexY;
        const resultChar = enteredChars[focusedItemY][focusedItemX];

        if(value !== '' && resultChar !== -1){
            const nextInput =  this.inputs[focusedItemY][focusedItemX];
            nextInput.focus()
        }

        let newClickedXIndex = -1;
        let newClickedYIndex = -1;
        if(clickedXIndex > 0){
            for(let i = 0; i < questionsX.length; i++){
                const questionData = questionsX[i];
                if(indexY === questionData.ybas && indexX <= questionData.xbit && indexX >= questionData.xbas){
                    newClickedXIndex = i;
                    break;
                }
            }

        }else if(clickedYIndex > 0){
            for(let i = 0; i < questionsY.length; i++){
                const questionData = questionsY[i];
                if(indexX === questionData.xbas && indexY <= questionData.ybit && indexY >= questionData.ybas){
                    newClickedYIndex = i;
                    break;
                }
            }
        }


        let allEqual = this.xCorrect(questionsX, enteredChars);

        if(allEqual){
            allEqual = this.yCorrect(questionsY, enteredChars, allEqual);
        }

        this.setState({
            enteredChars,
            clickedXIndex : newClickedXIndex,
            clickedYIndex : newClickedYIndex,
            modelWindowOpen : allEqual
        });

    }

    yCorrect(questionsY, enteredChars, allEqual) {
        for (let i = 0; i < questionsY.length; i++) {
            let qData = questionsY[i];

            let xbas = qData.xbas;
            let ybas = qData.ybas;
            let ybit = qData.ybit;

            if (ybas === -1 || xbas === -1 || ybit === -1) {
                continue;
            }

            let word = '';
            for (let j = ybas; j <= ybit; j++) {
                word += enteredChars[j][xbas];
            }

            allEqual = word === qData.c;
            if (!allEqual) {
                break;
            }
        }
        return allEqual;
    }

    xCorrect(questionsX, enteredChars) {
        let allEqual = true;
        for (let i = 0; i < questionsX.length; i++) {
            let qData = questionsX[i];

            let ybas = qData.ybas;
            let xbas = qData.xbas;
            let xbit = qData.xbit;

            if (ybas === -1 || xbas === -1 || xbit === -1) {
                continue;
            }

            let enteredCharX = enteredChars[ybas];

            let word = ''
            for (let j = xbas; j <= xbit; j++) {
                word += enteredCharX[j];
            }

            allEqual = word === qData.c;
            if (!allEqual) {
                break;
            }
        }
        return allEqual;
    }

    onXItemClicked = (index) => {
        const enteredChars = this.state.enteredChars;
        this.setState({
            clickedXIndex : index,
            clickedYIndex : -1,
            enteredChars
        })
    }

    onYItemClicked = (index) => {
        const enteredChars = this.state.enteredChars;
        this.setState({
            clickedYIndex : index,
            clickedXIndex : -1,
            enteredChars
        })
    }

    getCss = (indexX, indexY) => {
        const clickedXIndex = this.state.clickedXIndex;
        const clickedYIndex = this.state.clickedYIndex;
        const enteredChars = this.state.enteredChars;
        const questionsX = this.state.questionsX;
        const questionsY = this.state.questionsY;


        //Başarı kontolü x ekseni
        let questionData = null;
        for(let  i = 0; i < questionsX.length; i++){
            let qData = questionsX[i];
            if(qData.xbas <= indexX && qData.xbit >= indexX && indexY === qData.ybas){
                questionData = qData;
                break;
            }
        }

        let word = '';
        if(questionData != null){
            const xArr =  enteredChars[questionData.ybas];
            for(let i = questionData.xbas; i <= questionData.xbit; i++){
                word += xArr[i];
            }
        }
        if(questionData !== null && word === questionData.c){
            return success;
        }

        //Başarı kontolü y ekseni
        questionData = null;
        for(let  i = 0; i < questionsY.length; i++){
            let qData = questionsY[i];
            if(qData.ybas <= indexY && qData.ybit >= indexY && indexX === qData.xbas){
                questionData = qData;
                break;
            }
        }

        word = '';
        if(questionData != null){
            let yAxisArr = [];
            for(let i = 0; i < enteredChars.length; i++){
                yAxisArr.push(enteredChars[i][questionData.xbas])
            }
            for(let i = questionData.ybas; i <= questionData.ybit; i++){
                word += yAxisArr[i];
            }
        }

        if(questionData !== null && word === questionData.c){
            return success;
        }

        if(clickedXIndex > 0){

            if(questionsX[clickedXIndex] !== null && questionsX[clickedXIndex].xbas <= indexX && questionsX[clickedXIndex].xbit >= indexX && indexY === questionsX[clickedXIndex].ybas){
                return selected;
            }else{
                return standart;
            }
        }else if(clickedYIndex > 0){
            if(questionsY[clickedYIndex] !== null && questionsY[clickedYIndex].ybas <= indexY && questionsY[clickedYIndex].ybit >= indexY && indexX === questionsY[clickedYIndex].xbas){
                return selected;
            }else{
                return standart;
            }
        }else{
            return standart;
        }
    }

    getTransparent = (indexX, indexY) => {
        const clickedXIndex = this.state.clickedXIndex;
        const clickedYIndex = this.state.clickedYIndex;
        const questionsX = this.state.questionsX;
        const questionsY = this.state.questionsY;
        const enteredChars = this.state.enteredChars;

        //Başarı kontrolü x ekseni
        let questionData = null;
        for(let  i = 0; i < questionsX.length; i++){
            let qData = questionsX[i];
            if(qData.xbas <= indexX && qData.xbit >= indexX && indexY === qData.ybas){
                questionData = qData;
                break;
            }
        }

        let word = '';
        if(questionData != null){
            const xArr =  enteredChars[questionData.ybas];
            for(let i = questionData.xbas; i <= questionData.xbit; i++){
                word += xArr[i];
            }
        }

        if(questionData !== null && word === questionData.c){
            return success;
        }

        //Başarı kontrolü y ekseni
        questionData = null;
        for(let  i = 0; i < questionsY.length; i++){
            let qData = questionsY[i];
            if(qData.ybas <= indexY && qData.ybit >= indexY && indexX === qData.xbas){
                questionData = qData;
                break;
            }
        }

        word = '';
        if(questionData != null){
            let yAxisArr = [];
            for(let i = 0; i < enteredChars.length; i++){
                yAxisArr.push(enteredChars[i][questionData.xbas])
            }

            for(let i = questionData.ybas; i <= questionData.ybit; i++){
                word += yAxisArr[i];
            }
        }

        if(questionData !== null && word === questionData.c){
            return success;
        }

        if(clickedXIndex > 0){
            if(questionsX[clickedXIndex] !== null && questionsX[clickedXIndex].xbas <= indexX && questionsX[clickedXIndex].xbit >= indexX && indexY === questionsX[clickedXIndex].ybas){
                return true;
            }else{
                return false;
            }
        }else if(clickedYIndex > 0){
            if(questionsY[clickedYIndex] !== null && questionsY[clickedYIndex].ybas <= indexY && questionsY[clickedYIndex].ybit >= indexY && indexX === questionsY[clickedYIndex].xbas){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    onModalWindowClose = () => {
        this.setState({
            modelWindowOpen : false
        })
    }

    getLabelInfo = (indexX, indexY) => {
        let result = false;

        const questionsX = this.state.questionsX;
        const questionsY = this.state.questionsY;

        for(let i = 0; i < questionsX.length; i++){
            const qData = questionsX[i];

            let ybas = qData.ybas;
            let xbas = qData.xbas;

            if(xbas === -1 || ybas === -1){
                continue;
            }

            if(ybas === indexY && xbas === indexX){
                result = qData.sn;
                break;
            }
        }

        if(!result){
            for(let i = 0; i < questionsY.length; i++){
                const qData = questionsY[i];

                let ybas = qData.ybas;
                let xbas = qData.xbas;

                if(xbas === -1 || ybas === -1){
                    continue;
                }

                if(ybas === indexY && xbas === indexX){
                    result = qData.sn;
                    break;
                }
            }
        }

        return result;
    }

    onFormWindowValueChangeAction = (field, event) => {
        let id;
        let value;
        if(event === undefined){
            const target = field.target;
            id = target.id;
            value = target.value;
        }else{
            id = event.id;
            value = event.value;
        }

        const qFormData = this.state.qFormData;
        qFormData[id] = value;
        this.setState({
            qFormData
        });
    }

    onFormWindowClose = () => {
        this.setState({
            qFormWindowOpen : false
        })
    }

    addQuestion = () => {
        let qFormData = this.state.qFormData;
        const clickedXIndex = this.state.clickedXIndex;
        const clickedYIndex = this.state.clickedYIndex;
        const c = qFormData.c;
        let cevap = '';
        for(let i = 0; i < c.length; i++){
            const char = c[i];
            cevap += (char !== 'i' ? char.toUpperCase() : 'İ')
        }
        const qFormDataContent = {
            s:qFormData.s,
            sn: qFormData.sn != null ? parseInt(qFormData.sn) : -1,
            c: qFormData.c != null ? cevap : '',
            xbas: qFormData.xbas != null ? parseInt(qFormData.xbas) : -1,
            xbit: qFormData.xbit != null ? parseInt(qFormData.xbit) : -1,
            ybas: qFormData.ybas != null ? parseInt(qFormData.ybas) : -1,
            ybit: qFormData.ybit != null ? parseInt(qFormData.ybit) : -1
        };
        const duzlem = qFormData.duzlem;
        qFormData = {};
        let questions;

        if(duzlem === 'x'){
            questions = this.state.questionsX;
            if(this.state.windowActionType === 'Ekle'){
                questions.push(qFormDataContent);
            }else{
                questions.splice(clickedXIndex, 1, qFormDataContent);
            }

            const xbas = qFormDataContent.xbas;
            const xbit = qFormDataContent.xbit;
            const ybas = qFormDataContent.ybas;
            const c = qFormDataContent.c;
            let enteredChars = this.state.enteredChars;
            for(let i = xbas; i <= xbit; i++){
                enteredChars[ybas][i] =  c.substr(i - xbas, 1);
            }

            this.setState({
                questionsX: questions,
                qFormWindowOpen: false,
                qFormData: qFormData,
                enteredChars
            })
        }else{
            questions = this.state.questionsY;
            if(this.state.windowActionType === 'Ekle'){
                questions.push(qFormDataContent);
            }else{
                questions.splice(clickedYIndex, 1, qFormDataContent);
            }

            const xbas = qFormDataContent.xbas;
            const ybas = qFormDataContent.ybas;
            const ybit = qFormDataContent.ybit;
            const c = qFormDataContent.c;
            let enteredChars = this.state.enteredChars;
            for(let i = ybas; i <= ybit; i++){
                enteredChars[i][xbas] =  c.substr(i - ybas, 1);
            }

            this.setState({
                questionsY: questions,
                qFormWindowOpen:false,
                qFormData: qFormData,
                enteredChars
            })
        }
    }

    onRadioChange = (field, event) => {
        const value = event.value;
        const qFormData = this.state.qFormData;
        qFormData.duzlem = value;
        this.setState({
            qFormData
        });
    }

    addQuestionButtonClicked = () => {
        console.log('addQuestionButtonClicked');
        this.setState({
            qFormWindowOpen : true,
            qFormData: {},
            windowActionType:'Ekle'
        })
    }

    updateQuestionButtonClicked = () =>{
        const clickedXIndex = this.state.clickedXIndex;
        const clickedYIndex = this.state.clickedYIndex;
        const questionsX = this.state.questionsX;
        const questionsY = this.state.questionsY;

        let formData;
        if(clickedXIndex > 0){
            for(let i = 0; i < questionsX.length; i++){
                if(i === clickedXIndex){
                    formData = questionsX[i];
                    break;
                }
            }
        }else if(clickedYIndex > 0){
            for(let i = 0; i < questionsY.length; i++){
                if(i === clickedYIndex){
                    formData = questionsY[i];
                    break;
                }
            }
        }else{

            toast.error("Seçim Yapmasılısınız !", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose:3000
            });

            return;
        }


        this.setState({
            qFormWindowOpen : true,
            qFormData: {...formData, duzlem: clickedXIndex === -1 ? 'y' : 'x'},
            windowActionType: 'Güncelle'
        })
    }

    removeQuestionButtonClicked = () => {

        const clickedXIndex = this.state.clickedXIndex;
        const clickedYIndex = this.state.clickedYIndex;
        const questionsX = this.state.questionsX;
        const questionsY = this.state.questionsY;

        if(clickedXIndex > 0){
            questionsX.splice(clickedXIndex, 1);
            this.setState({
                questionsX,
                clickedXIndex: -1
            });
        }else if(clickedYIndex > 0){
            questionsY.splice(clickedYIndex, 1);
            this.setState({
                questionsY,
                clickedYIndex: -1
            });
        }else{
            toast.error("Seçim Yapmasılısınız !", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose:3000
            });
        }
    }

    answersCorrect = () => {
        const questionsX = this.state.questionsX;
        const questionsY = this.state.questionsY;
        const enteredChars = this.state.enteredChars;

        let allTrue = true;
        for(let i = 1; i < questionsX.length; i++){
            if(!allTrue){
                break;
            }
            const qDataX = questionsX[i];
            const qDataXC = qDataX.c
            const xbas = qDataX.xbas;
            const xbit = qDataX.xbit;
            const ybas = qDataX.ybas;
            for(let j = xbas; j <= xbit; j++){
                const charAtXY = qDataXC.substr(j, 1);
                for(let k = 1; k < questionsY.length; k++){
                    const qDataY = questionsY[k];
                    const qDataYCevap = qDataY.c;
                    for(let m = 0; m < qDataYCevap.length; m++){
                        const charAtYX = qDataYCevap.substr(m, 1);
                        if(j === qDataY.xbit && qDataY.ybas <= ybas && qDataY.ybit >= ybas && m === (ybas - qDataY.ybas)){
                            allTrue = charAtYX === charAtXY;
                            if(!allTrue){
                                toast.error(i + " sıra numaralı soru ile " + k +" sıra numaralı soruların ortak harfi tutarsızdır", {
                                    position: toast.POSITION.TOP_RIGHT,
                                    autoClose:3000
                                });
                                return allTrue;
                            }
                        }
                    }

                }
            }
        }

        if(allTrue){
            allTrue = this.xCorrect(questionsX, enteredChars);

            if(allTrue){
                allTrue = this.yCorrect(questionsY, enteredChars, allTrue);
            }
        }

        return allTrue;
    }

    checkQuestionsButtonClicked = () => {
        const correct = this.answersCorrect();

        if(correct){
            toast.success("Kontrol başarılı", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose:3000
            });
        }else{
            toast.error("Kontrol başarılı değil", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose:3000
            });
        }
    }

    saveButtonClicked = () => {
        const checkResult = this.answersCorrect();
        if(checkResult){
            return;
        }

        const questionsX = this.state.questionsX;
        const questionsY = this.state.questionsY;

        const time = new Date();
        const recordId = time.getTime() + '';
        let postData = {
            recordId,
            questionsDataX: questionsX,
            questionsDataY: questionsY
        };

        const headers = {
            'Content-Type': 'application/json'
        }

        axios.post('https://ltkbv3ol92.execute-api.eu-central-1.amazonaws.com/test/crossword', postData, {
            headers: headers
        })
        .then((response) => {
            console.log(response);
            toast.success("İşlem Başarılı", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose:3000
            });
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        return(
            <div>
                <ToastContainer/>
                <Header onSignOutClick={this.props.onSignOutClick}
                        authUser={this.props.authUser}
                        authUserName={this.props.authUserName}
                        authUserFamilyName={this.props.authUserFamilyName}
                />

                <Crossword
                    getLabelInfo={this.getLabelInfo}
                    getTransparent={this.getTransparent}
                    getCss={this.getCss}
                    onFieldValueChange={this.onFieldValueChange}
                    inputs={this.inputs}
                    clickedXIndex={this.state.clickedXIndex}
                    clickedYIndex={this.state.clickedYIndex}
                    questionsX={this.state.questionsX}
                    questionsY={this.state.questionsY}
                    modelWindowOpen={this.modelWindowOpen}
                    onModalWindowClose={this.onModalWindowClose}
                    enteredChars={this.state.enteredChars}
                    onXItemClicked={this.onXItemClicked}
                    onYItemClicked={this.onYItemClicked}
                />

                <Segment>
                    <Button icon='add' content={'Soru Ekle'} onClick={this.addQuestionButtonClicked}/>
                    <Button icon='pencil' content={'Soru Güncelle'} onClick={this.updateQuestionButtonClicked}/>
                    <Button icon={'minus'} content={'Soru Çıkar'} onClick={this.removeQuestionButtonClicked}/>
                    <Button icon={'check'} content={'Kontrol Et'} onClick={this.checkQuestionsButtonClicked}/>
                    <Button icon={'save'} content={'Kaydet'} onClick={this.saveButtonClicked}/>
                </Segment>

                <Modal centered={true} style={{ position: 'static' }} size='small'
                       open={this.state.qFormWindowOpen}
                       onClose={this.onFormWindowClose}>
                    <Modal.Header >Soru Ekle</Modal.Header>
                    <Modal.Content image>
                        <Form style={{width: '100%'}}>
                            <Form.Group>
                                <Form.Radio
                                    label='X'
                                    value='x'
                                    checked={this.state.qFormData.duzlem === 'x'}
                                    onChange={this.onRadioChange}
                                />
                                <Form.Radio
                                    label='Y'
                                    value='y'
                                    checked={this.state.qFormData.duzlem === 'y'}
                                    onChange={this.onRadioChange}
                                />

                            </Form.Group>

                            <Form.Field id={'s'} placeholder="Soru" control={'Input'} value={this.state.qFormData.s} onChange={this.onFormWindowValueChangeAction}/>

                            <Form.Group widths="equal">
                                <Form.Input id={'c'} placeholder="Cevap" value={this.state.qFormData.c} onChange={this.onFormWindowValueChangeAction}/>
                                <Form.Input id={'sn'} type="number" placeholder="Sira No" value={this.state.qFormData.sn} onChange={this.onFormWindowValueChangeAction}/>
                            </Form.Group>

                            <Form.Group widths="equal">
                                <Form.Input id={'xbas'} placeholder="X Başlama" value={this.state.qFormData.xbas} onChange={this.onFormWindowValueChangeAction}/>
                                <Form.Input id={'xbit'} placeholder="X Bitiş" value={this.state.qFormData.xbit} onChange={this.onFormWindowValueChangeAction}/>
                            </Form.Group>

                            <Form.Group widths="equal">
                                <Form.Input id={'ybas'} placeholder="Y Başlama" value={this.state.qFormData.ybas} onChange={this.onFormWindowValueChangeAction}/>
                                <Form.Input id={'ybit'} placeholder="Y Bitiş" value={this.state.qFormData.ybit} onChange={this.onFormWindowValueChangeAction}/>
                            </Form.Group>

                            <Button color="blue" onClick={this.addQuestion}>
                                {this.state.windowActionType}
                            </Button>
                        </Form>
                    </Modal.Content>
                </Modal>

            </div>
        );
    }
}

export default Add;
