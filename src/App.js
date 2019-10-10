import React, {Component} from 'react';
import {Input,Grid, List, Label, Modal,Responsive} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const black = {width: '60px', height: '60px', backgroundColor: 'black'};
const standart = {width: '60px', height: '60px'};
const selected = {width: '60px', height: '60px', backgroundColor: '#B3B3B3'};
const success = {width: '60px', height: '60px', backgroundColor: 'green'};

// const questionsDataX = [
//     {s:'Soldan Sağa',sn:'', c:-1, ybas: -1, ybit: -1, xbas: -1, xbit:-1},
//     {s:'Gırtlaktaki Aşırı ve Kronik İltihap', sn:1, c:'LARENJİT', ybas: 0, ybit: 0, xbas: 0, xbit:7},
//     {s:'Jupiterin bir uydusu', sn:2, c:'ELARA', ybas: 1, ybit: 1, xbas: 0, xbit:4},
//     {s:'Helyumun simgesi', sn:3, c:'HE', ybas: 1, ybit: 1, xbas: 6, xbit:7},
//     {s:'Kesilen hayvanın böbrek, dalak, ciğer gibi iç organlarıyla baş ve ayakları',sn:4 ,c:'SAKATAT', ybas: 2, ybit: 2, xbas: 0, xbit:6},
//     {s:'Bağırsaklar', sn:5, c:'EMA', ybas:3, ybit: 3, xbas: 0, xbit:2},
//     {s:'Uzak',c:'IRAK', sn:6, ybas: 3, ybit: 3, xbas: 4, xbit:7},
//     {s:'“...gibi” (Çok yumuşak, yumuşacık)', sn:7, c:'PAMUK', ybas: 4, ybit: 4, xbas: 0, xbit:4},
//     {s:'Rutenyum Simgesi', sn:8, c:'RU', ybas: 4, ybit: 4, xbas: 6, xbit:7},
//     {s:'En kısa zaman', sn:9, c:'AN', ybas: 5, ybit: 5, xbas: 0, xbit:1},
//     {s:'Dili Tutulmuş', sn:10, c:'LAL', ybas: 5, ybit: 5, xbas: 3, xbit:5},
//     {s:'Gidilen yol üzerinde olmayan', sn:11, c:'SAPA', ybas: 6, ybit: 6, xbas: 0, xbit:3},
//     {s:'Yapma, Etme', sn:12, c:'İKA', ybas: 6, ybit: 6, xbas: 5, xbit:7},
//     {s:'Davet etmek, çağırmak', sn:13, c:'OKUMAK', ybas: 7, ybit: 7, xbas: 2, xbit:7}
//
// ];
//
// const questionsDataY = [
//     {s: 'Yukarıdan Aşağıya', sn:'', c:-1, ybas: -1, ybit: -1, xbas: -1, xbit:-1},
//     {s:'Bir sınırdan geçebilmek için verilen yazılı izin', sn:1, c:'LESEPASE', ybas: 0, ybit: 7, xbas: 0, xbit:0},
//     {s:'Büyük balıkçı kayığı', sn:14, c:'ALAMANA', ybas: 0, ybit: 6, xbas: 1, xbit:1},
//     {s:'Sayıları göstermek için kullanılan işaretlerin her biri', sn:15, c:'RAKAM', ybas: 0, ybit: 4, xbas: 2, xbit:2},
//     {s:'İtalyada bir nehir', sn:16, c:'PO', ybas: 6, ybit: 7, xbas: 2, xbit:2},
//     {s:'Eski dilde otlar', sn:17, c:'ERA', ybas: 0, ybit: 2, xbas: 3, xbit:3},
//     {s:'Haberci', sn:18, c:'ULAK', ybas: 4, ybit: 7, xbas: 3, xbit:3},
//     {s:'Düzgün iyi konuşma yeteneği', sn:19, c:'NATIKA', ybas: 0, ybit: 5, xbas: 4, xbit:4},
//     {s:'Hicap',sn:20, c:'AR', ybas: 2, ybit: 3, xbas: 5, xbit:5},
//     {s:'Misket Limonu', sn:21, c:'LİM', ybas: 5, ybit: 7, xbas: 5, xbit:5},
//     {s:'İkaz Uyar', sn:22, c:'İHTAR', ybas: 0, ybit: 4, xbas: 6, xbit:6},
//     {s:'Kiloamper kısaltması', sn:23, c:'KA', ybas: 6, ybit: 7, xbas: 6, xbit:6},
//     {s:'Tellür simgesi', sn:24, c:'TE', ybas: 0, ybit: 1, xbas: 7, xbit:7},
//     {s:'İşitme organı', sn:25, c:'KULAK', ybas: 3, ybit: 7, xbas: 7, xbit:7}
// ];

const questionsDataX = [
    {s:'Soldan Sağa',sn:'', c:-1, ybas: -1, ybit: -1, xbas: -1, xbit:-1},
    {s:'Geviş getirenlerden, Kongo’da bataklık ormanlarda yaşayan, büyük bir antilop boyunda, gövdesi kızıl kestane renginde, bacakları beyaz çizgili bir memeli hayvan', sn:1, c:'OKAPİ', ybas: 0, ybit: 0, xbas: 0, xbit:4},
    {s:'İlave', sn:2, c:'EK', ybas: 0, ybit: 0, xbas: 6, xbit:7},
    {s:'Erkek Kardeş', sn:3, c:'BİRADER', ybas: 1, ybit: 1, xbas: 0, xbit:6},
    {s:'Bir organımız',sn:4 ,c:'EL', ybas: 2, ybit: 2, xbas: 0, xbit:1},
    {s:'Bir Meyve', sn:5, c:'KİRAZ', ybas:2, ybit: 2, xbas: 3, xbit:7},
    {s:'Küçük çan',c:'ZİL', sn:6, ybas: 3, ybit: 3, xbas: 0, xbit:2},
    {s:'Bal koymaya yarayan küçük tekne', sn:7, c:'LAZA', ybas: 3, ybit: 3, xbas: 4, xbit:7},
    {s:'Ad', sn:8, c:'İSİM', ybas: 4, ybit: 4, xbas: 0, xbit:3},
    {s:'Eski Dilde Çöl', sn:9, c:'TİH', ybas: 4, ybit: 4, xbas: 5, xbit:7},
    {s:'Mersin’in bir ilçesi', sn:10, c:'MUT', ybas: 5, ybit: 5, xbas: 2, xbit:4},
    {s:'Lityum elementinin simgesi', sn:11, c:'Lİ', ybas: 5, ybit: 5, xbas: 6, xbit:7},
    {s:'Mitoloji', sn:12, c:'ESATİR', ybas: 6, ybit: 6, xbas: 0, xbit:5},
    {s:'Halk dilinde kayınbirader', sn:13, c:'İNİ', ybas: 7, ybit: 7, xbas: 1, xbit:3},
    {s:'Kraliçe.', sn:14, c:'ECE', ybas: 7, ybit: 7, xbas: 5, xbit:7}

];

const questionsDataY = [
    {s: 'Yukarıdan Aşağıya', sn:'', c:-1, ybas: -1, ybit: -1, xbas: -1, xbit:-1},
    {s:'Aşırı şişmanlık', sn:1, c:'OBEZİTE', ybas: 0, ybit: 6, xbas: 0, xbit:0},
    {s:'Eski dilde reziller', sn:2, c:'ERAZİL', ybas: 0, ybit: 5, xbas: 6, xbit:6},
    {s:'Bir ilimiz', sn:15, c:'KİLİS', ybas: 0, ybit: 4, xbas: 1, xbit:1},
    {s:'Bir nota', sn:16, c:'Sİ', ybas: 6, ybit: 7, xbas: 1, xbit:1},
    {s:'Hicap', sn:17, c:'AR', ybas: 0, ybit: 1, xbas: 2, xbit:2},
    {s:'Gemi barınağı', sn:18, c:'LİMAN', ybas: 3, ybit: 7, xbas: 2, xbit:2},
    {s:'Temiz', sn:19, c:'PAK', ybas: 0, ybit: 2, xbas: 3, xbit:3},
    {s:'Yumuşak başlı, itaat eden',sn:20, c:'MUTİ', ybas: 4, ybit: 7, xbas: 3, xbit:3},
    {s:'Şırnak’ın bir ilçesi', sn:21, c:'İDİL', ybas: 0, ybit: 3, xbas: 4, xbit:4},
    {s:'Boru sesi', sn:22, c:'Tİ', ybas: 5, ybit: 6, xbas: 4, xbit:4},
    {s:'Rütbesiz askerlerin tümü', sn:23, c:'ERAT', ybas: 1, ybit: 4, xbas: 5, xbit:5},
    {s:'Bir nota', sn:24, c:'RE', ybas: 6, ybit: 7, xbas: 5, xbit:5},
    {s:'Gerektiğinde kullanılmak için saklanan tahıl.', sn:25, c:'ZAHİRE', ybas: 2, ybit: 7, xbas: 7, xbit:7}
];

class App extends Component {
    inputs = Array(8).fill(null).map(()=>Array(8).fill(null));

    state = {
        enteredChars : [],
        questionsX: questionsDataX,
        questionsY: questionsDataY,
        clickedXIndex : -1,
        clickedYIndex : -1,
        modelWindowOpen: false,
    };

    componentDidMount() {
        const enteredChars = this.generateChars(questionsDataX, questionsDataY, false);

        // const maxX = this.getMaxXNum(questionsDataX);
        // const maxY = this.getMaxYNum(questionsDataY);

        // this.inputs = Array(maxY).fill(null).map(()=>Array(maxX).fill(null))

        this.setState(
            {
                //     [
                //     ['L', 'A', 'R', 'E', 'N', 'J', 'İ', 'T'],
                //     ['E', 'L', 'A', 'R', 'A', -1, 'H', 'E'],
                //     ['S', 'A', 'K', 'A', 'T', 'A', 'T', -1],
                //     ['E', 'M', 'A', -1, 'I', 'R', 'A', 'K'],
                //     ['P', 'A', 'M', 'U', 'K', -1, 'R', 'U'],
                //     ['A', 'N', -1, 'L', 'A', 'L', -1, 'L'],
                //     ['S', 'A', 'P', 'A', -1, 'İ', 'K', 'A'],
                //     ['E', -1, 'O', 'K', 'U', 'M', 'A', 'K']
                // ],
                enteredChars : enteredChars,
                questionsX: questionsDataX,
                questionsY: questionsDataY,
                clickedXIndex : -1,
                clickedYIndex : -1,
            }
        )
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

    onInputFocus = (indexX, indexY) => {

        const clickedXIndex = this.state.clickedXIndex;
        const clickedYIndex = this.state.clickedYIndex;
        let questionsX = this.state.questionsX;
        let questionsY = this.state.questionsY;

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

        newClickedXIndex = newClickedXIndex === clickedXIndex ? -1 : newClickedXIndex;
        newClickedYIndex = newClickedYIndex === clickedYIndex ? -1 : newClickedYIndex;

        this.setState({
            clickedXIndex: newClickedXIndex,
            clickedYIndex: newClickedYIndex
        })

    }

    render(){
        document.title = 'Bulmaca';
        return (
            <div className="App">
            <Responsive minWidth={1500}>
            <Grid columns={3} doubling>
        <Grid.Column>
        {this.state.enteredChars.map((dataY, indexY) => {
            return (
                <div>
                {dataY.map((item, indexX) => {
                    return (
                        item === -1
                            ? <Input id={indexY + '-' + indexX} transparent style={black} value={''}/>
                :
                <Input
                    label={this.getLabelInfo(indexX, indexY)}
                    labelPosition='left corner'
                    id={indexY + '-' + indexX}
                    transparent={this.getTransparent(indexX, indexY)}
                    style={this.getCss(indexX, indexY)}
                    onChange={this.onFieldValueChange}
                    // onFocus={this.onInputFocus.bind(this, indexX, indexY)}
                    ref={(input) => { this.inputs[indexY][indexX] = input }}
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
        {this.state.questionsX.map((question, index) => {
            return(
                    this.state.clickedXIndex > 0 && index === this.state.clickedXIndex
                        ?
                <List.Item onClick={this.onXItemClicked.bind(this, index)}>
        <Label> {question.sn + ' ' + question.s} </Label>
            </List.Item>
        :
        <List.Item onClick={this.onXItemClicked.bind(this, index)}>{question.sn + ' ' + question.s}</List.Item>
        )
        })}
    </List>

        </Grid.Column>
        <Grid.Column>

        <List>
        {this.state.questionsY.map((question, index) => {
            return(
                    this.state.clickedYIndex > 0 && index === this.state.clickedYIndex
                        ?
                <List.Item onClick={this.onYItemClicked.bind(this, index)}>
        <Label> {question.sn + ' ' + question.s} </Label>
            </List.Item>
        :
        <List.Item onClick={this.onYItemClicked.bind(this, index)}>{question.sn + ' ' + question.s}</List.Item>
        )

        })}
    </List>

        </Grid.Column>
        </Grid>

        <Modal  open={this.state.modelWindowOpen}
        centered={false}
        onClose={this.onModalWindowClose}
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
        </div>
    );
    }

}
export default App;
