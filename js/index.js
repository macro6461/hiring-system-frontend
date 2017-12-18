let outer = document.getElementsByClassName("outerModal")[0]
let interviewModalButton = document.getElementsByClassName("interviewModalButton")[0]

document.addEventListener('DOMContentLoaded', function(){
  let workWithUs = document.getElementById("workWithUsModalButton")
  workWithUs.addEventListener("click", showSignUpInterviewModal)
  subscribeButton.addEventListener("click", showMailingListModal)
})

function showSignUpInterviewModal(){
  debugger
   outer.style.display="unset"
   document.getElementsByClassName("signUpOrInterviewModal")[0].style.display="unset"
   document.getElementsByClassName("signUpModalButton")[0].style.display="unset"
   interviewModalButton.style.display="unset"
   interviewModalButton.addEventListener("click", closeSignUpInterviewModal)
   console.log(outer)
   outer.addEventListener("click", closeSignUpInterviewModal)
}

function showMailingListModal(){
  debugger
   outer.style.display="unset"
   document.getElementsByClassName("signUpOrInterviewModal")[0].style.display="unset"
   document.getElementsByClassName("signUpModalButton")[0].style.display="unset"
   interviewModalButton.style.display="unset"
   interviewModalButton.addEventListener("click", closeSignUpInterviewModal)
   console.log(outer)
   outer.addEventListener("click", closeSignUpInterviewModal)
}

function closeSignUpInterviewModal(){
  debugger
  document.getElementsByClassName("signUpOrInterviewModal")[0].style.display="none"
  document.getElementsByClassName("signUpModalButton")[0].style.display="none"
  document.getElementsByClassName("interviewModalButton")[0].style.display="none"
  document.getElementsByClassName("outerModal")[0].style.display="none"
}
