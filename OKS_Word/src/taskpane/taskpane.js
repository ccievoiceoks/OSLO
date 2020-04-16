/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office, Word */

Office.onReady(info => {
  if (info.host === Office.HostType.Word) {
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";
    document.getElementById("run").onclick = run;
    document.getElementById("DB").onclick = DB;
    //document.getElementById("insert-paragraph").onclick = insertParagraph;
  }
});
export async function run() {
  return Word.run(async context => {
    /**
     * Insert your Word code here
     */
     
    
     /**
     * 
     */
     // insert a paragraph at the end of the document.
    const paragraph = context.document.body.insertParagraph("Hello Olivier,This is a new ERA", Word.InsertLocation.end);
    
    var varblue = getText();
    
    // change the paragraph color to blue.
    paragraph.font.color = "blue";
    
    await context.sync();
  });
}



// To read the value of the current selection, you need to write a callback function that reads the selection.
// The following example shows how to:
// 1. Pass an anonymous callback function that reads the value of the current selection
//    to the callback parameter of the getSelectedDataAsync method.
// 2. Read the selection as text, unformatted, and not filtered.
// 3. Display the value on the add-in's page.
function getText() {
  Office.context.document.getSelectedDataAsync(Office.CoercionType.Text, 
      { valueFormat: "unformatted", filterType: "all" },
      function (asyncResult) {
          var error = asyncResult.error;
          if (asyncResult.status === Office.AsyncResultStatus.Failed) {
              write(error.name + ": " + error.message);
          } 
          else {
              // Get selected data.
              var dataValue = asyncResult.value; 

              // 1st Possibility and it continue the writing
              write('Here is what you have selected --> ' + dataValue);
              document.getElementById('FrameResult').src = "https://localhost:4500/description/complete/" + dataValue;

              // 2nd possibility in that case it display once the value 
              //document.getElementById("message").innerHTML = dataValue;
              
          }            
      });               
}

// Function that writes to a div with id='message' on the page.
function write(message){
  document.getElementById('message').innerText += message; 
}

function DB(param){
var CAT = '%'+ param +'%';
const mysql = require('mysql');
//document.getElementById('DBmessage').innerText += typeof(mysql);
  
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pass4Labo',
    database: 'PXS',
    port : 3306
});
document.getElementById('DBmessage').innerText += typeof(connection);

connection.connect(function(err) {
  if (err) { 
    console.log('error while  connecting');
    console.log(err.code);
    throw(err);
  
  }
  else
  {
    console.log('Connected !!!');
    /*connection.query("SELECT * FROM info", function (err, result, fields) {
      if (err) { 
        console.log('Error executing Query');
        console.log(err.code);
        console.log(err.log);
        throw err;
      }
      else{
        console.log(result[0].description);
      }
      connection.end();
      });*/
  }
  //var CAT = '%Forum%';

  connection.query("SELECT * FROM info where category like ?",[CAT], function (err, result, fields) {
  if (err) { 
    console.log('Error executing Query');
    console.log(err.code);
    console.log(err.log);
    throw err;
  }
  else{
    write('The DB has produced --> '+ result[0].description);
    console.log(result[0].description);
    document.getElementById('DBmessage').innerText += result[0].description;
  }
  connection.end();
  });
});
}

