let moveLog = [0,0,0,0];//移動ログ
moveLog[0]=start; //開始地点を初期化
const start = 1;
function whereNextMove(address){ //各ルートを通る際に次に移動できるルート
    if(address == 1){
        return [1,2,3];
    }else if(address == 2){
        return[1];
    }else if(address == 3){
        return[1,3];
    }else{
        return 0;
    }
}
function evalCost(a,b){ //各ルートを通る際にかかる確率コスト
    if(a==1 && b==1){
        return 0.1;
    }else if(a==3 && b==3){
        return 0.5;
    }else if(a==1 && b==2){
        return 0.5;
    }else if(a==1 && b==3){
        return 0.4;
    }else if(a==2 && b==1){
        return 1;
    }else if(a==3 && b==1){
        return 0.5;
    }
}


全体コスト = 0;
whereNextMove(start).forEach((e)=>{//開始地点から次に移動できる場所をすべて順番に処理
    moveLog[1]=e;//2番目のルートを確定
    whereNextMove(e).forEach((f)=>{//2番目のルートから次に移動できる場所をすべて順番に処理
        moveLog[2]=f;//3番目のルートを確定
        whereNextMove(f).forEach((g)=>{//3番目のルートから次に移動できる場所をすべて順番に処理
            moveLog[3]=g;//ゴール地点を確定
            if(g==3){//ゴール地点が指定の場所であった場合
                今回コスト = 1;//コスト計算初期化(掛け算をするので初期値は1(100%))
                for(i=0;i<3;i++){//2づつ処理するためforループ
                    結果 = moveLog.slice(i,i+2);//sliceで取り出す
                    今回コスト = 今回コスト * evalCost(結果[0],結果[1]);//確率コストを計算して代入
                }
                全体コスト += 今回コスト;//計算が終わったら、全体に加算する
            }
        })
    })
})
console.log("最終コスト:" + 全体コスト);//最終的に発生した確率コストを出力
