function afisareDetalii() {
  let currentdate = new Date();
  document.getElementById("data").innerHTML =
    "Data actuală " +
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    "  cu ora actuală: " +
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
  let URL = location.hostname;
  document.getElementById("URL").innerHTML = URL;
  let locationURL = window.location;
  document.getElementById("locationURL").innerHTML = locationURL;
  let os = navigator.platform;
  document.getElementById("os").innerHTML = os;
  let loc = navigator.geolocation.getCurrentPosition(coords);
}
function coords(position) {
  document.getElementById("loc").innerHTML =
    "Latitudine: " +
    position.coords.latitude +
    "<br>Longitudine:  " +
    position.coords.longitude;
}

function loto() {
  let c1 = document.getElementById("c1").value;  
  let c2 = document.getElementById("c2").value;
  let c3 = document.getElementById("c3").value;
  let c4 = document.getElementById("c4").value;
  let c5 = document.getElementById("c5").value;
  let c6 = document.getElementById("c6").value;
  let c7 = document.getElementById("c7").value;
  let c8 = document.getElementById("c8").value;

  let count = 0;
  let text = "";
  let text2 = "";
  text = "Numerele câștigătoare sunt: ";
  for (let i = 0; i < 8; ++i) {
    let x = Math.floor(Math.random() * 0xff + 1);
    x = x.toString(16).toUpperCase();
    text += x + " ";
    if (x == c1 || x == c2 || x == c3 || x == c4 || x == c5 || x == c6 || x == c7 || x == c8 ) {
      count++;
    }
  }
  text += ".";
  text2 = "Ați nimerit " + count + " numere câștigătoare din cele extrase.";

  document.getElementById("loto").innerHTML = text;
  document.getElementById("loto2").innerHTML = text2;
}








function schimbaContinut(resursa,jsFisier,jsFunctie) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById("continut").innerHTML = this.responseText;
     if (jsFisier) {
      var elementScript = document.createElement('script');
      elementScript.onload = function () {
        console.log("hello");
        if (jsFunctie) {
          window[jsFunctie]();
        }
      };
      elementScript.src = jsFisier;
      document.head.appendChild(elementScript);
    } else {
      if (jsFunctie) {
        window[jsFunctie]();
      }
    }
    }
  };
  xhttp.open("GET", resursa +".html", true);
  xhttp.send();
}