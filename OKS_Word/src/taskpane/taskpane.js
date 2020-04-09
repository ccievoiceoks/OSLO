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
    //document.getElementById("selection").onselect = selection;
    //document.getElementById("insert-paragraph").onclick = insertParagraph;
  }
});
export async function run() {
  return Word.run(async context => {
    /**
     * Insert your Word code here
     */

    // insert a paragraph at the end of the document.
    const paragraph = context.document.body.insertParagraph("Hello Olivier,This is a new ERA", Word.InsertLocation.end);
    var varblue = getText();
    //write('Here are -->' + varblue);

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
              write('Here is what you have selected --> ' + dataValue);
              var dbselect = DB();
              write('The Status of DB --> ' + dbselect); 
          }            
      });
}


// Function that writes to a div with id='message' on the page.
function write(message){
  document.getElementById('message').innerText += message; 
}

  var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "localhost",
    user: "proximus",
    password: "C!sc0LAB"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    write('DB Connected');
  });
