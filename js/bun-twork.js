const registrationForm = document.getElementById("registrationForm");
const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const containerDiv = document.getElementById("containerDiv");

let isRegistrationFormOpen = false;
let isFormRendered = false;

let generatedDiv = null;

registerBtn.addEventListener("click", () => {
  isRegistrationFormOpen = !isRegistrationFormOpen;

  registrationForm.classList.toggle("hiddenAll");

  setTimeout(function () {
    registrationForm.classList.toggle("hidden");
  }, 20);
});

loginBtn.addEventListener("click", () => {
  //the first time a button is clicked, render the login form
  if (!isFormRendered) containerDiv.appendChild(generateOverlayDiv());
  generatedDiv = document.getElementById("loginOverlay");
  generatedDiv.classList.add("block");
  generatedDiv.classList.remove("hiddenAll");
  generatedDiv.addEventListener("click", () => {
    generatedDiv.classList.remove("block");
    generatedDiv.classList.add("hiddenAll");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      generatedDiv.classList.remove("block");
      generatedDiv.classList.add("hiddenAll");
    }
  });
});

function generateOverlayDiv() {
  isFormRendered = true;
  let overlayDiv = document.createElement("div");
  overlayDiv.setAttribute("id", "loginOverlay");
  overlayDiv.classList.add("overlay");

  let loginInput = document.createElement("input");
  loginInput.setAttribute("id", "overlayLogin");
  loginInput.classList.add("form-label", "form-control");

  let pswInput = document.createElement("input");
  pswInput.setAttribute("id", "overlayPsw");
  pswInput.classList.add("form-label", "form-control");

  overlayDiv.appendChild(
    document
      .createElement("div")
      .appendChild(document.createElement("div").appendChild(loginInput))
  );

  overlayDiv.appendChild(
    document
      .createElement("div")
      .appendChild(document.createElement("div").appendChild(pswInput))
  );
  //console.log(overlayDiv);

  return overlayDiv;
}

function checkPassword()
{
    var userPsw = document.getElementById('user-psw');
    var message = document.getElementById('error-nwl');
    var goodColor = "#66cc66";
    var badColor = "#ff6666";
 	
    if(userPsw.value.length > 8)
    {
        userPsw.style.backgroundColor = goodColor;
        message.style.color = goodColor;
        message.innerHTML = "Password is okay"
    }
    else
    {
        userPsw.style.backgroundColor = badColor;
        message.style.color = badColor;
        message.innerHTML = "Password must be at least 8 digits!"
        return;
    }
}  

function submitButtonPressed()
{
    var submitButton = document.getElementById('submit-btn')
    submitButton.onclick = ()=> {console.log("Registration form to bun-twork is complete")}
}

function sendEmail() {
    var userEmail = document.getElementById("user-email");
    var userUsername = document.getElementById("user-name");
    Email.send({
        Username : userUsername,
        To : userEmail,
        From : "bun-twork.email@address.com",
        Subject : encodeURIComponent("Welcome to Bun-twork"),
        Body : "welcome to the bun-twork!"
    });
}
