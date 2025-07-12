const questions = [
  {
    q: "Who was the sage father of Parashurama, known for his strict discipline and tapasya?",
    o: ["Jamadagni", "Atri", "Kashyapa", "Vasishtha"],
    a: 0
  },
  {
    q: "What weapon did Lord Shiva gift to Parashurama after testing his devotion?",
    o: ["Trishula", "Parashu (Battle Axe)", "Vajra", "Sudarshan Chakra"],
    a: 1
  },
  {
    q: "Which powerful king with a thousand arms was slain by Parashurama?",
    o: ["Duryodhana", "Bali", "Kartavirya Arjuna", "Ravana"],
    a: 2
  },
  {
    q: "Which river did Parashurama invite to flow through the land he reclaimed from the sea?",
    o: ["Saraswati", "Yamuna", "Narmada", "Ganga"],
    a: 3
  },
  {
    q: "After being humbled by Lord Rama, what did Parashurama give up?",
    o: ["His bow", "His renunciation", "His Kshatriya pride", "His meditative powers"],
    a: 2
  },
  {
    q: "Which present-day Indian state is said to have been created by Parashurama?",
    o: ["Gujarat", "Kerala", "Odisha", "Maharashtra"],
    a: 1
  },
  {
    q: "Which avatar of Vishnu broke Shiva’s bow and humbled Parashurama?",
    o: ["Rama", "Krishna", "Vamana", "Narasimha"],
    a: 0
  },
  {
    q: "What was the name of the divine cow that Jamadagni possessed?",
    o: ["Kamadhenu", "Surabhi", "Nandini", "Shabala"],
    a: 0
  },
  {
    q: "Where is Parashurama believed to be meditating, waiting for Kalki?",
    o: ["Gandhamadana", "Mahendragiri", "Kailash", "Vindhyas"],
    a: 1
  },
  {
    q: "Whom did Parashurama train in the use of divine weapons?",
    o: ["Arjuna", "Karna", "Bhishma", "Both B and C"],
    a: 3
  }
];

function showTab(tabId) {
  document.querySelectorAll(".tab").forEach(tab => tab.style.display = "none");
  document.getElementById(tabId).style.display = "block";
}

window.onload = () => {
  const questionsContainer = document.getElementById("questionsContainer");
  questions.forEach((q, i) => {
    const qDiv = document.createElement("div");
    qDiv.innerHTML = `<p>${i + 1}. ${q.q}</p>` + q.o.map((opt, j) =>
      `<label><input type="radio" name="q${i}" value="${j}" required> ${opt}</label><br>`
    ).join('');
    questionsContainer.appendChild(qDiv);
  });

  const qrUrl = "https://janmashtami-quiz2025.netlify.app/?tab=userDetailsTab";
  QRCode.toCanvas(qrUrl, { width: 150 }, (err, canvas) => {
    if (!err) document.getElementById("qrCodeContainer").appendChild(canvas);
  });

  document.getElementById("quizForm").onsubmit = (e) => {
    e.preventDefault();
    const form = document.forms.quizForm;
    let score = 0;
    questions.forEach((q, i) => {
      if (parseInt(form[`q${i}`].value) === q.a) score++;
    });
    const userForm = document.forms.userForm;
    const userData = {};
    Array.from(userForm.elements).forEach(input => {
      if (input.name) userData[input.name] = input.value;
    });
    const result = { ...userData, score, date: new Date().toLocaleString() };
    const stored = JSON.parse(localStorage.getItem("quizResults") || "[]");
    stored.push(result);
    localStorage.setItem("quizResults", JSON.stringify(stored));
    document.getElementById("scoreContainer").innerText = `Your score: ${score} / ${questions.length}`;
  };
};

function downloadCSV() {
  const results = JSON.parse(localStorage.getItem("quizResults") || "[]");
  if (!results.length) return alert("No results to download.");
  const headers = Object.keys(results[0]);
  const csv = [headers.join(",")].concat(results.map(r =>
    headers.map(h => `"${(r[h] || "").toString().replace(/"/g, '""')}"`).join(",")
  )).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "quiz_results.csv";
  link.click();
}

// Admin password prompt to show download button
function askAdminPassword() {
  const password = prompt("Enter admin password to see results:");
  if (password === "Krishna123") {  // <-- Change this to your desired password
    document.getElementById("downloadCSVBtn").style.display = "inline-block";
    alert("Access granted! You can now download the results.");
  } else {
    alert("Wrong password. Access denied.");
  }
}
