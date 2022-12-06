import "https://unpkg.com/navigo"  //Will create the global Navigo object used below

import {
    setActiveLink, adjustForMissingHash, renderTemplate, loadHtml
} from "./utils.js"

import { loadCyclists } from "./pages/getCyclists/getCyclist.js"

window.addEventListener("load", async () => {

    const templatehome = await loadHtml("./pages/home/home.html")
    const templateGetCyclists = await loadHtml("./pages/getCyclists/getCyclist.html")
  
    adjustForMissingHash()
  
    const router = new Navigo("/", { hash: true });
    //Not especially nice, BUT MEANT to simplify things. Make the router global so it can be accessed from all js-files
    window.router = router
  
    router
      .hooks({
        before(done, match) {
          setActiveLink("menu", match.url)
          done()
        }
      })
      .on({
    
        "/": () => renderTemplate(templatehome, "content"),
  
         "/showCyclists": () => { 
           renderTemplate(templateGetCyclists, "content") 
           loadCyclists()
        }, 
  
      })
  });
  
  
  window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
      + ' Column: ' + column + ' StackTrace: ' + errorObj);
  }