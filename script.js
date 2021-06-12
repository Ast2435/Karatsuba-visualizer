let node = document.createElement("node");

var getDatos = function ()
{
  var numero1 = document.getElementById("numero1").value;
  var numero2 = document.getElementById("numero2").value;
  if (numero1=="")
  {
    document.getElementById("numero1").focus();
  }
  else
  {
    if (numero2=="")
    {
      document.getElementById("numero2").focus();
    }
    else
    {
      console.log(numero1+" "+numero2);
      document.getElementById("numero1").value="";
      document.getElementById("numero2").value="";
      document.getElementById("numero1").focus();
    }
  }
}
