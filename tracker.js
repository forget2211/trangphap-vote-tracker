const API =
"https://giaithuongconghien2026.bvote.vn/api/contestants?category=2"

let history = {}

let chart

async function loadVotes(){

const res = await fetch(API)

const json = await res.json()

updateTable(json.data)

}

function estimateMoney(voteChange){

return voteChange * 4000
}

function updateTable(list){

list.sort((a,b)=>b.vote-a.vote)

const tbody = document.querySelector("#ranking tbody")

tbody.innerHTML=""

let labels=[]
let votes=[]

list.forEach((mv,i)=>{

let old = history[mv.id] || mv.vote

let speed = mv.vote - old

history[mv.id] = mv.vote

let money = estimateMoney(speed)

let tr=document.createElement("tr")

if(mv.name.includes("Trang Pháp"))
tr.classList.add("highlight")

if(speed>500)
tr.classList.add("warning")

tr.innerHTML=`

<td>${i+1}</td>
<td>${mv.name}</td>
<td>${mv.vote}</td>
<td>+${speed}</td>
<td>${money.toLocaleString()} VND</td>

`

tbody.appendChild(tr)

labels.push(mv.name)

votes.push(mv.vote)

})

drawChart(labels,votes)

}

function drawChart(labels,data){

if(!chart){

chart=new Chart(

document.getElementById("chart"),

{
type:"line",
data:{
labels:labels,
datasets:[
{
label:"Votes",
data:data
}
]
}
})

}

else{

chart.data.labels=labels
chart.data.datasets[0].data=data
chart.update()

}

}

setInterval(loadVotes,30000)

loadVotes()
