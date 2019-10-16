
import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css';
import Crossword from '../../components/Crossword';
import axios from 'axios';
import Header from "../../components/Header";

const standart = {width: '60px', height: '60px'};
const selected = {width: '60px', height: '60px', backgroundColor: '#B3B3B3'};
const success = {width: '60px', height: '60px', backgroundColor: 'green'};

class Solve extends Component {
    inputs = Array(8).fill(null).map(()=>Array(8).fill(null));

    state = {
        enteredChars : [],
        questionsX: [],
        questionsY: [],
        clickedXIndex : -1,
        clickedYIndex : -1,
        modelWindowOpen: false,
        recordId: -1,
        type: null,
    };

    componentDidMount() {
        var me=this;
        const active = this.props.active;
        if(active){
            axios.get('https://ltkbv3ol92.execute-api.eu-central-1.amazonaws.com/test/crossword')
                .then(function (response) {
                    console.log(response);
                    const data = response.data;
                    const count = data.Count;

                    if(count > 0){
                        const item = data.Items[0];

                        const recordId = item.recordId;
                        const questionsX = item.questionsX;
                        const qDatasX = me.generateQuestionData(questionsX);
                        const questionsY = item.questionsY;
                        const qDatasY = me.generateQuestionData(questionsY);

                        const enteredChars = me.generateChars(qDatasX, qDatasY, false);
                        me.setState(
                            {
                                enteredChars : enteredChars,
                                questionsX: qDatasX,
                                questionsY: qDatasY,
                                clickedXIndex : -1,
                                clickedYIndex : -1,
                                recordId
                            }
                        )
                    }

                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }

    generateQuestionData = (questions) => {
        let qDatas = [];
        const list = questions["L"];
        for (let i = 0; i < list.length; i++) {
            let qData = list[i];
            const mapObj = qData["M"];

            const sObj = mapObj.s;
            const s = sObj["S"];
            const cObj = mapObj.c;
            const c = cObj["S"];
            const snObj = mapObj.sn;
            const sn = parseInt(snObj["S"]);
            const xbasObj = mapObj.xbas;
            const xbas = parseInt(xbasObj["S"]);
            const xbitObj = mapObj.xbit;
            const xbit = parseInt(xbitObj["S"]);
            const ybasObj = mapObj.ybas;
            const ybas = parseInt(ybasObj["S"]);
            const ybitObj = mapObj.ybit;
            const ybit = parseInt(ybitObj["S"]);

            const qDataX = {
                s, sn, c, xbas, xbit, ybas, ybit
            }

            qDatas.push(qDataX);
        }

        return qDatas;
    }

    generateChars = (questionsDataX, questionsDataY) => {
        const maxX = this.getMaxXNum(questionsDataX);
        const maxY = this.getMaxYNum(questionsDataY);

        let enteredChars = Array(maxY + 1).fill(-1).map(()=>Array(maxX + 1).fill(-1));

        for(let i = 0; i < questionsDataX.length; i++){
            const qData = questionsDataX[i];

            if(qData.xbit !== -1 && qData.xbas !== -1 && qData.ybas !== -1 && qData.ybit !== -1){
                const xbas = qData.xbas;
                const xbit = qData.xbit;
                const yIndex = qData.ybas;

                let enteredXChars = enteredChars[yIndex];

                for(let i = xbas; i <= xbit; i++){
                    enteredXChars[i] = '';
                }
            }
        }

        for(let i = 0; i < questionsDataY.length; i++){
            const qData = questionsDataY[i];

            if(qData.xbit !== -1 && qData.xbas !== -1 && qData.ybas !== -1 && qData.ybit !== -1){
                const ybas = qData.ybas;
                const ybit = qData.ybit;
                const xIndex = qData.xbas;

                for(let i = ybas; i <= ybit; i++){
                    enteredChars[i][xIndex] = '';
                }
            }
        }

        return enteredChars;
    }

    getMaxXNum = (questionsDataX) => {
        let max=0;
        for(let i = 0; i < questionsDataX.length; i++){
            let qData = questionsDataX[i];
            const xbit = qData.xbit;
            max = xbit > max ? xbit : max;
        }
        return max;
    }

    getMaxYNum = (questionsDataY) => {
        let max=0;
        for(let i = 0; i < questionsDataY.length; i++){
            let qData = questionsDataY[i];
            const xbit = qData.ybit;
            max = xbit > max ? xbit : max;
        }
        return max;
    }

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

        let allEqual  = true;
        for(let i = 0; i < questionsX.length; i++){
            let qData = questionsX[i];

            let ybas = qData.ybas;
            let xbas = qData.xbas;
            let xbit = qData.xbit;

            if(ybas === -1 || xbas === -1 || xbit === -1){
                continue;
            }

            let enteredCharX = enteredChars[ybas];

            let word = ''
            for(let j = xbas; j <= xbit; j++){
                word += enteredCharX[j];
            }

            allEqual = word === qData.c;
            if(!allEqual){
                break;
            }
        }

        if(allEqual){
            for(let i = 0; i < questionsY.length; i++){
                let qData = questionsY[i];

                let xbas = qData.xbas;
                let ybas = qData.ybas;
                let ybit = qData.ybit;

                if(ybas === -1 || xbas === -1 || ybit === -1){
                    continue;
                }

                let word = '';
                for(let j = ybas; j <= ybit; j++){
                    word += enteredChars[j][xbas];
                }

                allEqual = word === qData.c;
                if(!allEqual){
                    break;
                }
            }
        }

        this.setState({
            enteredChars,
            clickedXIndex : newClickedXIndex,
            clickedYIndex : newClickedYIndex,
            modelWindowOpen : allEqual
        });

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

    render(){
        return (
            <div>
                <Header setActiveTab={this.props.setActiveTab}/>
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
                    modelWindowOpen={this.state.modelWindowOpen}
                    onModalWindowClose={this.onModalWindowClose}
                    enteredChars={this.state.enteredChars}
                    onXItemClicked={this.onXItemClicked}
                    onYItemClicked={this.onYItemClicked}
                />
            </div>
        );
    }

}
export default Solve;
