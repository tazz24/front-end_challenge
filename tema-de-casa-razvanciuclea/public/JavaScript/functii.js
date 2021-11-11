function afisareDetalii() {
    let currentdate = new Date();
    document.getElementById("data").innerHTML =
      "Data actuală " +
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " .Ora actuală: " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds() +
      ".";
    let currentBrowser = navigator.appName;
    document.getElementById("browser").innerHTML = currentBrowser;
    let versionBrowser = navigator.appVersion;
    document.getElementById("version_browser").innerHTML = versionBrowser;
}

function HomeChangeTXT()
{
  document.getElementById("demo").innerHTML = "Bine ai venit!!";
}

function Move() {
  var elem = document.getElementById("animatie");   
  var pos = 0;
  var id = setInterval(move, 10);
  function move() {
    if (pos == 300) {
      clearInterval(id);
    } else {
      pos++; 
      elem.style.top = pos + "px"; 
      elem.style.left = pos + "px"; 
    }
  }
}