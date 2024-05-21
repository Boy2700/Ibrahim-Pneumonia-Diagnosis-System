document.getElementById('predictionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Get user inputs
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const address = document.getElementById('address').value;

    // Get other symptoms based on checkbox choice
    const otherSymptoms = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(function(checkbox) {
        if (checkbox.value !== 'Fever') {
            otherSymptoms.push(checkbox.value);
        }
    });

    // Show all fieldsets
    const fieldsets = document.querySelectorAll('fieldset');
    fieldsets.forEach(function(fieldset) {
        fieldset.style.display = 'block';
    });




    // Check if any symptoms are selected
    if (otherSymptoms.length === 0) {
        alert("Please select a symptom before diagnosis.");
        return; // Exit the work
    }








    // do Naive Bayes classification
    const probability = diagnosePneumoniaLikelihood(childFever, adultFever, otherSymptoms);
    const stage = predictPneumoniaStage(childFever, adultFever, otherSymptoms);

    // Display result
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<div>
        <p>Hello ${name},</p>
        <p>Based on your symptoms, there is a ${probability.toFixed(1)}% chance of having Pneumonia.</p>
        <p>Your predicted stage of Pneumonia is: ${stage}</p>
        <p>Age: ${age}</p>
        <p>Address: ${address}</p>
        <button id="printButton">Print</button>
    </div>`;

    // Add event listener to the print button
    document.getElementById('printButton').addEventListener('click', printResult);



});

function toggleFieldset() {
    var age = parseInt(document.getElementById("age").value); // Get the age value from the input field
    var adultFieldset = document.getElementById("adult");
    var childrenFieldset = document.getElementById("children");

    if (age < 19) {
        alert("You are to select only from children symptoms only")
        adultFieldset.disabled = true; // Disable the adult fieldset
        childrenFieldset.disabled = false; // Enable the children fieldset
    } else {
        alert("You are to select from Adult symptoms only")
        adultFieldset.disabled = false; // Enable the adult fieldset
        childrenFieldset.disabled = true; // Disable the children fieldset
    }
}


// Role to print the result
function printResult() {
    // Get the result div content
    const resultContent = document.getElementById('result').innerHTML;
    // Open a new window
    const printWindow = window.open('', '_blank');
    // Write the content to the new window
    printWindow.document.write(`
        <html>
        <head>
            <title>Print Result</title>
            <!-- Bootstrap CSS -->
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
            <!-- Your custom CSS -->
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            <div class="container">
                <div class="card mt-5">
                    <div class="card-body">
                        <center><h2 class="card-title text-center">Pneumonia Diagnosis System</h2>
                        <h4 class="card-title text-center">RESULT</h4><center>
                        <hr>
                        <div class="border border-success">
                            ${resultContent}
                        </div>
                    </div>
                </div>
            </div>
         <center>   <footer>
            <div class="text-center  text-white mt-3">
            <p>All rights reserved &copy; 2024 Pneumonia Diagnosis System || Ibrahim Aminu Wurma</p>
        </div>
    </footer></center>
            <!-- Bootstrap JS -->
            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
            <!-- Your custom script -->
            <script src="script.js"></script>
        </body>
        </html>
    `);
    // Print the window
    printWindow.print();
}


function diagnosePneumoniaLikelihood(childFever, adultFever, otherSymptoms) {
    let probability = 0;

    // If fever is present, increase probability
    if (childFever || adultFever) {
        probability += (childFever ? 50 : 45); // 50% for children, 45% for adults
    }

    // Adjust probability based on other symptoms
    if (otherSymptoms.includes('Cough')) {
        probability += (childFever ? 55 : 50); // 55% for children, 50% for adults
    }
    if (otherSymptoms.includes('Rapid breathing')) {
        probability += (childFever ? 45 : 40); // 45% for children, 40% for adults
    }
    if (otherSymptoms.includes('Difficulty breathing')) {
        probability += (childFever ? 60 : 40); // 60% for  children and 40% adults
    }
    if (otherSymptoms.includes('Loss of appetite')) {
        probability += (childFever ? 55 : 0); // 55% for children, not applicable for adults
    }
    if (otherSymptoms.includes('Fatigue')) {
        probability += (childFever ? 50 : 35); // 50% for children, 35% for adults
    }
    if (otherSymptoms.includes('Chest pain')) {
        probability += (childFever ? 45 : 50); // 45% for children, 50% for adults
    }
    if (otherSymptoms.includes('Chills')) {
        probability += (childFever ? 40 : 45); // 40% for children, 4% for adults
    }
    if (otherSymptoms.includes('Headache')) {
        probability += (childFever ? 35 : 40); // 35% for children, 40% for adults
    }
    if (otherSymptoms.includes('Nausea or vomiting')) {
        probability += (childFever ? 30 : 20); // 30% for children and 20 adults
    }
    if (otherSymptoms.includes('Wheezing')) {
        probability += (childFever ? 25 : 2); // 25% for children, 2% for adults
    }
    if (otherSymptoms.includes('Bluish lips')) {
        probability += (childFever ? 20 : 5); // 20% for children, 5% for adults
    }
    if (otherSymptoms.includes('Confusion')) {
        probability += (childFever ? 5 : 15); // 5% for children and 15%adults
    }
    if (otherSymptoms.includes('Cyanosis')) {
        probability += (childFever ? 10 : 30); // 10% for children and 30 adults
    }
    if (otherSymptoms.includes('Pleurisy')) {
        probability += (childFever ? 5 : 20); // 5% for children, 20% for adults
    }
    if (otherSymptoms.includes('Muscle pain')) {
        probability += (childFever ? 10 : 35); // 10% for children, 35% for adults
    }
    if (otherSymptoms.includes('Unconsciousness')) {
        probability += (childFever ? 5 : 15); // 5% for children and 15% adults
    }
    if (otherSymptoms.includes('Hypothermia')) {
        probability += (childFever ? 5 : 10); // 5% for children and 10% adults
    }
    if (otherSymptoms.includes('Convulsions')) {
        probability += (childFever ? 0 : 15); // 0% for children and 15%adults
    }
    if (otherSymptoms.includes('Unable to feed/drink')) {
        probability += (childFever ? 12 : 2); // 12% for children and 2% adults
    }

    // Cap the probability at a greatest of 71%
    probability = Math.min(71, probability);

    return probability;
}



function predictPneumoniaStage(childFever, adultFever, otherSymptoms) {
    let stage = "Early";

    // If fever is present, change stage to Chronic
    if (childFever || adultFever) {
        stage = "Diagnosis: Chronic Pneumonia" + "<br>" +
            "Your pneumonia is chronic, indicating a persistent or recurring condition.It is crucial to follow a long - term treatment plan and regularly consult with your healthcare provider to manage symptoms and prevent exacerbations." +
            "Comment: Chronic pneumonia requires ongoing medical supervision to monitor, for potential complications and to adjust treatment as necessary ";
    }

    // Check for symptoms associated with different stages of Pneumonia
    if (otherSymptoms.includes("Respiratory distress") || otherSymptoms.includes("Cyanosis") ||
        otherSymptoms.includes("Bluish lips") || otherSymptoms.includes("Unconsciousness") ||
        otherSymptoms.includes("Hypothermia")) {
        stage = "Diagnosis: Severe Pneumonia" + "<br>" +
            "Your pneumonia is severe, necessitating immediate medical attention and possibly hospitalization.Intensive treatment, including antibiotics and supportive care, is essential to manage this condition." +
            "Comment: Severe pneumonia can be life - threatening, prompt and aggressive treatment is critical to improve outcomes.";
    } else if (otherSymptoms.includes("Chest pain") || otherSymptoms.includes("Fever") ||
        otherSymptoms.includes("Rapid breathing") || otherSymptoms.includes("Difficulty breathing") ||
        otherSymptoms.includes("Fatigue") || otherSymptoms.includes("Chills") ||
        otherSymptoms.includes("Headache") || otherSymptoms.includes("Nausea or vomiting") ||
        otherSymptoms.includes("Wheezing") || otherSymptoms.includes("Confusion") ||
        otherSymptoms.includes("Pleurisy") || otherSymptoms.includes("Muscle pain")) {
        stage = "Diagnosis: Moderate Pneumonia" + "<br>" +
            "Your pneumonia is moderate, requiring diligent home care and possibly prescription medication.Follow your doctor 's advice closely, including completing any prescribed antibiotic course and monitoring your symptoms." +
            "Comment: Moderate pneumonia, while not immediately life - threatening, can worsen if not properly managed, so adhering to treatment and follow - up care is vital.";
    } else if (otherSymptoms.includes("Loss of appetite") || otherSymptoms.includes("Unable to feed/drink") ||
        otherSymptoms.includes("Convulsions")) {
        stage = "Diagnosis: Early Stage Pneumonia" + "<br>" +
            "Your pneumonia is at an early stage.You should take proper care by resting, staying hydrated, and avoiding exposure to smoke and pollutants." +
            "see your doctor for further evaluation and appropriate treatment." +
            "Comment:Early diagnosis and prompt treatment can prevent complications and lead to a quicker recovery.";
    }
    return stage;
}


function logout() {
    // Redirect to the login page or do any other logout actions
    alert("You have succesfully log out!")
    window.location.href = "../index.html"; // Change the URL as needed
}

// Add event listener to the logout button
document.getElementById("logoutBtn").addEventListener("click", logout);