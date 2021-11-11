function incarcaPersoane(resursa) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       document.getElementById("continut").innerHTML = this.responseText;
       
      }
    };
    xhttp.open("GET", resursa +".xml", true);
    xhttp.send();
  }