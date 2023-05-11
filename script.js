const iplScoreElement = document.getElementById('ipl-score');
async function getMatchData() {

    //add your api key(URL) from cricketdata.org
    return await fetch("https://api.cricapi.com/v1/currentMatches?apikey={YOUR_API_KEY}&offset=0")
 
        .then(data => data.json())
        .then(data => {
            if (data.status != "success")return;

            const matchesList = data.data;

            if(!matchesList)return [];
            
            
            const relevantData = matchesList.filter(match => match.series_id == "c75f8952-74d4-416f-b7b4-7da4b4e3ae6e").map(match => `${match.name}, ${match.status}, ${match.venue}`);

            // console.log({relevantData});

            document.getElementById("matches").innerHTML = relevantData.map(match => `<li>${match} </li>`).join('');            

            const [team] = matchesList.filter(match => match.series_id == "c75f8952-74d4-416f-b7b4-7da4b4e3ae6e").map(match => `${match.teamInfo[0].shortname} vs ${match.teamInfo[1].shortname}`);

            let score = "";            
            try {
                if(matchesList.filter(match => match.series_id == "c75f8952-74d4-416f-b7b4-7da4b4e3ae6e").map(match => `${match.score[0].o == 20}`)) {
                    [score] = matchesList.filter(match => match.series_id == "c75f8952-74d4-416f-b7b4-7da4b4e3ae6e").map(match =>`${match.score[0].inning} = ${match.score[0].r}/${match.score[0].w} \n ${match.score[1].inning} = ${match.score[1].r}/${match.score[1].w} in ${match.score[1].o} overs`);
                } 
                else if(matchesList.filter(match => match.series_id == "c75f8952-74d4-416f-b7b4-7da4b4e3ae6e").map(match => `${match.score[0].o > 20}`)) {
                    // score = `Match has not started yet!`;
                    // console.log(score);
                }
                else {
                    throw x;
                    // console.log(score);
                }

            } catch(x) {
                [score] = matchesList.filter(match => match.series_id == "c75f8952-74d4-416f-b7b4-7da4b4e3ae6e").map(match =>`${match.score[0].inning} = ${match.score[0].r}/${match.score[0].w} in ${match.score[0].o} overs`);
                // console.log(error);
            }
            
            // const [score] = matchesList.filter(match => match.series_id == "c75f8952-74d4-416f-b7b4-7da4b4e3ae6e").map(match => `${match.score[0].inning} = ${match.score[0].r}/${match.score[0].w} in ${match.score[0].o} overs`);
                        
            const [status] = matchesList.filter(match => match.series_id == "c75f8952-74d4-416f-b7b4-7da4b4e3ae6e").map(match => `${match.status}`);  
            
            console.log({team});

            iplScoreElement.querySelector('.team').textContent = team;
            iplScoreElement.querySelector('.score').textContent = score;
            iplScoreElement.querySelector('.status').textContent = status;

            return relevantData;

        })
//         .catch(error => console.error(error));
        .catch(e => console.log(e));
}

getMatchData();

const refreshButton = iplScoreElement.querySelector('.refresh');
refreshButton.addEventListener('click', getMatchData);
