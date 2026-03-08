const API =
"https://giaithuongconghien2026.bvote.vn/api/contestants?category=2"

let history = {}

let chart

async function fetchVotes(){

const res = await fetch(API)

const data = await res.json()

updateDashboard(data.data)

}

function estimateMoney(votes){

return votes * 20000 / 5

}

function updateDashboard(list){

list.sort((a,b)=>b.vote - a.vote)

const tbody = document.querySelector("#rankingTable tbody")

tbody.innerHTML=""

let labels=[]
let values=[]

list.forEach((mv,i)=>{

let prev = history[mv.id] || mv.vote

let speed = mv.vote - prev

history[mv.id] = mv.vote

let money = estimateMoney(speed)

let row=document.createElement("tr")

if(mv.name.includes("Trang Pháp"))
row.classList.add("highlight")

if(speed>500)
row.classList.add("warning")

row.innerHTML=`

<td>${i+1}</td>
<td>${mv.name}</td>
<td>${mv.vote}</td>
<td>+${speed}</td>
<td>${money.toLocaleString()} VND</td>

`

tbody.appendChild(row)

labels.push(mv.name)

values.push(mv.vote)

})

updateChart(labels,values)

}

function updateChart(labels,data){

if(!chart){

chart=new Chart(

document.getElementById("voteChart"),

{

type:"line",

data:{
labels:labels,
datasets:[{
label:"Votes",
data:data
}]
}

})

}

else{

chart.data.labels=labels
chart.data.datasets[0].data=data
chart.update()

}

}

setInterval(fetchVotes,30000)

fetchVotes()