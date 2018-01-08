//onSubmit send a post request to backend that stores the interview in database. Send followup email after submission.
let interviewForm = document.getElementsByClassName("interviewForm")[0]
let interviewModalButton = document.getElementsByClassName("interviewModalButton")[0]


document.addEventListener('DOMContentLoaded', function(){
  let emailInput = document.getElementById("emailInput")
  let firstInput = document.getElementById("firstInput")
  let lastInput = document.getElementById("lastInput")
  let phoneInput = document.getElementById("phoneInput")
  let workWithUs = document.getElementById("modalButton")
  let license = document.querySelector('input[name="licensed"]')
  let trainerInput = document.getElementById("trainerInput")
  interviewForm.addEventListener("submit", submitCompanyLeadInterviewFormData)
  console.log(license)
})

//MAKE ACTION MAILER IN BACKEND TO SEND CONFIRMATION COMPANY/TRAINER LEAD INTERVIEW
//ANDRES WILL DETERMINE THE DATES WITH HIS BACKEND

function submitCompanyLeadInterviewFormData(e){
  e.preventDefault()
  let licensed = document.querySelector('input[name="licensed"]:checked')
  debugger
  console.log(licensed)
  event.preventDefault()
  if (trainerInput.length > 0){
    //send post request to trainers, find trainer, get trainer id, then make post request to trainer_lead_interviews, create
    //trainer_lead_interview, send confirmation email
  } else {
    fetch("http://localhost:3000/company_lead_interviews", {
          headers: {"Content-Type": "application/json",
          "Accept":"application/json"},
          method: "POST",
          body: JSON.stringify({
            email_address: emailInput.value,
            first_name: firstInput.value,
            last_name: lastInput.value,
            phone_number: phoneInput.value,
            licensed: licensed.value,
          })
        })
        .then(res => res.json())
        .then(json => console.log(json))
        //send confirmation email
  }

}
