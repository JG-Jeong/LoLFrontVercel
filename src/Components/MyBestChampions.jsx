import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { SERVER_URL } from "../Constants";

function MyBestChampions({ summonerName }) {
    
    const [getSummoner, setGetSummoner] = useState([]);
    const [loading, setLoading] = useState(true);
    
    
    useEffect(() => {
        async function getBestChampions() {
            try {
                const res = await axios.get(`${SERVER_URL}/match/summoner/${summonerName}`);
                if ( res?.data ) {
                    setGetSummoner(res.data);
                    setLoading(false);
                }
            } catch ( e ) {
                console.log(e);
            }
        }
        
        getBestChampions();
        
    }, [getSummoner]);
    
    
    const myChampions = useMemo(() => {
        if (getSummoner === "현재 전적 데이터가 존재하지않는 소환사입니다. 데이터 계산 중이오니 잠시만 기다려주세요.") {
            return ;
        }
        
        
        return (getSummoner.slice(0, 5).map((value, i) => (<div className="champBox box-width" key={i}>
                <div>
                    <img
                        src={`https://ddragon.leagueoflegends.com/cdn/12.21.1/img/champion/${value.chmpionName}.png`}
                        width="40"/>
                    <h5>픽률 : {`${value.champPickRate}`}</h5>
                    <h5>승률 : {`${value.champWinRate}`}</h5>
                    {value.itemWinRate.slice(0, 9).map((item, i) => {
                        return (<div key={i} className="champBox">
                            <img
                                src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${item.itemId}.png`}
                                width="40"
                            />
                            <h6> 픽률 : {`${item.itemPickRate}`}</h6>
                            <h6> 승률 : {`${item.itemWinRate}`}</h6>
                        </div>);
                    })}
                </div>
            </div>
        )));
    }, [getSummoner]);

    
    //전적업데이트 함수
    async function getRecentMatches() {
        try {
            const res = await axios.get(`${SERVER_URL}/saveData/summonerMatchlist/${summonerName}`);
            if ( res?.data ) {
                alert(res.data.message)
                console.log(res?.data)
            }
        } catch ( e ) {
            console.log(e);
        }
    }

    
    return (
        <div>
            {loading ? (
                <div>소환사 정보를 계산중입니다...</div>
            ) : (
                <>
                    <button onClick={getRecentMatches}>전적 업데이트</button>
                    <div>
                        {myChampions}
                    </div>
                </>
            )}
        </div>
    );
}

export default MyBestChampions;