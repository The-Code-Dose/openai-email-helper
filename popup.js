document.addEventListener("DOMContentLoaded", function () {
  var generateBtn = document.getElementById("generate-btn");
  generateBtn.addEventListener("click", function () {
    var subject = document.getElementById("subject").value;
    generateBtn.classList.add("loading");
    generateEmail(subject);
  });
});

function replaceBodyContent(message) {
  var container = document.createElement("div");
  container.setAttribute("id", "container");

  var heading = document.createElement("h1");
  heading.textContent = "OpenAI Email Draft";

  var messageText = document.createElement("p");
  messageText.textContent = message;

  var copyBtn = document.createElement("button");
  copyBtn.textContent = "Copy";
  copyBtn.id = "copy-btn";
  copyBtn.addEventListener("click", function () {
    var messageTextarea = document.createElement("textarea");
    messageTextarea.value = message;
    document.body.appendChild(messageTextarea);
    messageTextarea.select();
    document.execCommand("copy");
    document.body.removeChild(messageTextarea);
    alert("Message copied to clipboard!");
  });

  container.appendChild(heading);
  // container.appendChild(subjectText);
  container.appendChild(messageText);

  container.appendChild(copyBtn);

  document.body.innerHTML = "";
  document.body.appendChild(container);
}

function generateEmail(subject) {
  const OPENAI_API_KEY = "your_api_key";

  // const message = `Dear [Name], I am writing to request a leave of absence tomorrow for my sister's wedding. I understand that this may be short notice, but I would really appreciate it if you could grant me this leave. Thank you for your understanding. Sincerely, [Your Name]`;
  // replaceBodyContent(message);

  fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: `
        Write an email about: ${subject}.
        Please give me just the message body and nothing else.
      `,
      max_tokens: 1024,
      temperature: 0.5,
    }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const message = data.choices[0].text;
      replaceBodyContent(message);
    })
    .finally(function() {
      var generateBtn = document.getElementById("generate-btn");
      generateBtn.classList.remove("loading");
    });
}
