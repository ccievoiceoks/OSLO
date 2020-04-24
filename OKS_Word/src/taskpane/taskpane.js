/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office, Word */

Office.onReady(info => {
  if (info.host === Office.HostType.Word) {
    run();
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";
    document.getElementById("run").onclick = run;
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
    //var TEXTING = 'This is an Expression Text inserted  -- > ';
    var varblue = getText();

    const paragraph = context.document.body.insertParagraph("OSLO Plugin", Word.InsertLocation.end);

    //var varblue = getText();

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
  Office.context.document.getSelectedDataAsync(
    Office.CoercionType.Text,
    { valueFormat: "unformatted", filterType: "all" },
    function(asyncResult) {
      var error = asyncResult.error;
      if (asyncResult.status === Office.AsyncResultStatus.Failed) {
        write(error.name + ": " + error.message);
      } else {
        // Get selected data.
        var dataValue = asyncResult.value;

        // 1st Possibility and it continue the writing
        //write("Here is what you have selected --> " + dataValue);
        document.getElementById("FrameResult").src = "https://localhost:4500/description/complete/" + dataValue;
        var urlparsing = "https://localhost:4500/description/complete/" + dataValue;
        //const resultat = webRequest(urlparsing);
        /*$.getJSON(
                urlparsing,
                function(data){
                  alert(data.msg);
                });
              myInsertTest(resultat); */

        // 2nd possibility in that case it display once the value
        document.getElementById("SelParam").innerHTML = dataValue;
      }
    }
  );
}

// Function that writes to a div with id='message' on the page.
function write(message) {
  // Old way wiht increment
  //document.getElementById('message').innerText += message;
  document.getElementById("message").innerText = message;
}

function webRequest(urlparsing) {
  fetch(urlparsing)
    .then(res => res.json())
    .then(out => {
      console.log("output:", out);
    })
    .catch(err => console.error(err));
}

function myInsertTest(param) {
  var TEXT = "\n" + param;
  Word.run(function(context) {
    var selectedRange = context.document.getSelection();
    selectedRange.insertText(TEXT, "End");
    //selectedRange.insertText("\r\n", "End");
    //selectedRange.select("End");
    return context.sync();
  });
}
