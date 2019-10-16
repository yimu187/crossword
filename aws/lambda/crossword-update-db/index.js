const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'eu-central-1', apiVersion : '2012-08-10'});

exports.handler = (event, context, callback) => {
    console.log("Baloha");
    // console.log(event.questionsDataX);
    // console.log(event.questionsDataY);

    const questionsDataX = event.questionsDataX;
    const questionsDataY = event.questionsDataY;

    let questionXData = {};
    questionXData["L"] = [];

    for(let i = 0; i < questionsDataX.length; i++){
        const qData = questionsDataX[i];
        const s = qData.s;
        const sn = qData.sn;
        const c = qData.c;
        const xbas = qData.xbas;
        const xbit = qData.xbit;
        const ybas = qData.ybas;
        const ybit = qData.ybit;

        let mObj = {};
        mObj["M"] = {};
        let m = mObj["M"];
        m.s = {"S" : s};
        m.sn = {"S" : sn + ""};
        m.c = {"S" : c + ""};
        m.xbas = {"S" : xbas + ""};
        m.xbit = {"S" : xbit + ""};
        m.ybas = {"S" : ybas + ""};
        m.ybit = {"S" : ybit + ""};
        questionXData["L"].push(mObj);
    }

    let questionYData = {};
    questionYData["L"] = [];

    for(let i = 0; i < questionsDataY.length; i++){
        const qData = questionsDataY[i];
        const s = qData.s;
        const sn = qData.sn;
        const c = qData.c;
        const xbas = qData.xbas;
        const xbit = qData.xbit;
        const ybas = qData.ybas;
        const ybit = qData.ybit;

        let mObj = {};
        mObj["M"] = {};
        let m = mObj["M"];
        m.s = {"S" : s};
        m.sn = {"S" : sn + ""};
        m.c = {"S" : c + ""};
        m.xbas = {"S" : xbas + ""};
        m.xbit = {"S" : xbit + ""};
        m.ybas = {"S" : ybas + ""};
        m.ybit = {"S" : ybit + ""};
        questionYData["L"].push(mObj);
    }

    var params = {
        Item: {
            "recordId": {
                S: event.recordId
            },
            "questionsX" : questionXData,
            "questionsY" : questionYData
        },
        ReturnConsumedCapacity: "TOTAL",
        TableName: "crossword"
    };


    dynamodb.putItem(params, function(err, data) {
        if (err) {
            console.log("--err--");
            console.log(err, err.stack);// an error occurred
            callback(err, event)
        }
        else {
            console.log("--success--");
            console.log(data);           // successful response
            callback(null, data)
        }
    });
};
