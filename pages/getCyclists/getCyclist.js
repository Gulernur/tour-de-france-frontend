import { API_URL } from "../../settings.js"
import { sanitizeStringWithTableRows } from "../../utils.js"
const URL = API_URL + "cyclists"

let cyclists = []


export async function loadCyclists(){
    try{
        cyclists = await fetch(`${URL}`)
        .then(response => response.json())
    }catch(e){
        console.error(e)
    }
    makeTableRows()
}

function makeTableRows(){
    const rows = cyclists.map(cyclist => `
    <tr>
      <td>${cyclist.firstName}</td>
      <td>${cyclist.middleName}</td>
      <td>${cyclist.lastName}</td>
      <td>${cyclist.age}</td>
      <td>${cyclist.country}</td>
      <td>${cyclist.totalTime}</td>
      <td>${cyclist.mountainPoint}</td>
      <td>${cyclist.sprintPoint}</td>
    `).join("")
    document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(rows)
}