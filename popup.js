/* This code is adding an event listener to the document object that waits for the DOM to be fully
loaded before executing the function. Inside the function, it is getting a reference to the
"generate-btn" element and adding a click event listener to it. When the button is clicked, it gets
the value of the "subject" input field, adds a "loading" class to the button, and calls the
"generateEmail" function with the subject as an argument. */
document.addEventListener("DOMContentLoaded", function () {
  var generateBtn = document.getElementById("generate-btn");
  generateBtn.addEventListener("click", function () {
    var subject = document.getElementById("subject").value;
    generateBtn.classList.add("loading");
    generateEmail(subject);
  });
});

function generateEmail(subject) {
  const OPENAI_API_KEY = "your_api_key";

  // const message = `Dear [Name], I am writing to request a leave of absence tomorrow for my sister's wedding. I understand that this may be short notice, but I would really appreciate it if you could grant me this leave. Thank you for your understanding. Sincerely, [Your Name]`;
  // replaceBodyContent(message);

  fetch(/* Create an API request here */)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Do something with the API response

    })
    .finally(function() {
      /* After the `generateEmail` function is executed, the `finally` block is executed. In this
      block, the `generateBtn` variable is used to get a reference to the "generate-btn" element
      again, and the `classList.remove()` method is called to remove the "loading" class from the
      button. This is done to visually indicate to the user that the loading process is complete and
      they can interact with the button again. */
      var generateBtn = document.getElementById("generate-btn");
      generateBtn.classList.remove("loading");
    });
}
