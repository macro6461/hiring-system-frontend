//onSubmit send a post request to backend that stores the interview in database. Send followup email after submission.
let interviewForm = document.getElementsByClassName("interviewForm")[0]
let interviewModalButton = document.getElementsByClassName("interviewModalButton")[0]


document.addEventListener('DOMContentLoaded', function(){
  let emailInput = document.getElementById("emailInput")
  let firstInput = document.getElementById("firstInput")
  let lastInput = document.getElementById("lastInput")
  let phoneInput = document.getElementById("phoneInput")
  let workWithUs = document.getElementById("modalButton")
  let licensed = document.querySelector('input[name="licensed"]')
  let trainerInput = document.getElementById("trainerInput")
  interviewForm.addEventListener("submit", submitCompanyLeadInterviewFormData)

})

//MAKE ACTION MAILER IN BACKEND TO SEND CONFIRMATION COMPANY/TRAINER LEAD INTERVIEW
//ANDRES WILL DETERMINE THE DATES WITH HIS BACKEND

function submitCompanyLeadInterviewFormData(e){
  e.preventDefault()
  let licensed = document.querySelector('input[name="licensed"]:checked')
  debugger
  if (trainerInput.value.split(" ").length > 1){
    let first = trainerInput.value.split(" ")[0]
    let second = trainerInput.value.split(" ")[1]
    fetch("http://localhost:3000/trainers", {
          headers: {"Content-Type": "application/json",
          "Accept":"application/json"},
          method: "POST",
          body: JSON.stringify({
            first_name: first.toLowerCase(),
            last_name: second.toLowerCase()
          })
        })
        .then(res => res.json())
        .then(json =>  createCompanyLeadInterviewWithReference(json))
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
    }
}

function createCompanyLeadInterviewWithReference(data){
  debugger
  let licensed = document.querySelector('input[name="licensed"]:checked')
  let trainerId = data.trainer.id
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
            trainer_id: trainerId
          })
        })
        .then(res => res.json())
        .then(json => postToCompanyLeadInterviewReference({companyLeadInterview: json, trainerId: trainerId }))
    }

function postToCompanyLeadInterviewReference(data){
  debugger
  let licensed = document.querySelector('input[name="licensed"]:checked')
  debugger
  fetch("http://localhost:3000/interview_references", {
      headers: {"Content-Type": "application/json",
      "Accept":"application/json"},
      method: "POST",
      body: JSON.stringify({
        company_lead_interview_id: data.companyLeadInterview.id,
        trainer_id: data.trainerId
      })
    })
    .then(res => res.json())
    .then(json => console.log(json))
    //send confirmation email
}
