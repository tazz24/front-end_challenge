class Produs
{
    constructor(name,quant){
        this.name=name;
        this.quantity=quant;
    }
    present(){
        return "Produs:"+this.name+"  Cantitate"+this.quantity;
    }
}
function Test(){
    let nume=document.getElementById("name").nodeName=nume;
    let cantiate = document.getElementById("cantiate").nodeName=cantiate;
    pro=new Produs(nume,cantitate);
    document.getElementById("demo").innerHTML = pro.present();
}


