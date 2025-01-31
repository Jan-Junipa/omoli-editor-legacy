


var textInput = document.getElementById("textInput");
var output = document.getElementById("output");



textInput.addEventListener("input",() => {
   output.innerText = encode(textInput.value);
});

var fileConfirmation = document.getElementById("fileConfirmation");
var fileInput = document.getElementById("fileInput")

fileInput.onchange = e => { 
   var file = e.target.files[0];
   var reader = new FileReader();
   reader.readAsText(file,'UTF-8');
   reader.onload = readerEvent => {
      
      var content = readerEvent.target.result; 
      var doc = jsyaml.load(content);
      try {
         Object.entries(doc).forEach(entry => {
            if(entry[1].parse){
               try{
                  var encoded = encode(entry[1].text);
                  doc[entry[0]].text = encoded;
                  doc[entry[0]].parse = false;
               } catch(err) {
                  throw Error("Error in " + entry[0] + ": " + err.message);
               }
            }
         });
         
         
         navigator.clipboard.writeText(jsyaml.dump(doc)).then(() => {
            fileConfirmation.textContent = "Output copied to clipboard"
            fileConfirmation.className = "";
         }).catch(() => {
            fileConfirmation.textContent = "Couldn't copy to clipboard";
            fileConfirmation.className = "error";
         });
      } catch(err) {
         fileConfirmation.textContent = err.message;
         fileConfirmation.className = "error"
      }  
         
   }
}