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
  interviewForm.addEventListener("submit", submitCompanyLeadInterviewFormData)
  console.log(license)
})

function submitCompanyLeadInterviewFormData(e){
  e.preventDefault()
  let licensed = document.querySelector('input[name="licensed"]:checked').value
  console.log(licensed)
  event.preventDefault()
  fetch("http://localhost:3000/company_leads", {
        headers: {"Content-Type": "application/json",
        "Accept":"application/json"},
        method: "POST",
        body: JSON.stringify({
          email_address: emailInput.value,
          first_name: firstInput.value,
          last_name: lastInput.value,
          phone_number: phoneInput.value,
          licensed: licensed,
        })
      })
      .then(res => res.json())
      .then(json => console.log(json))
}
