let eventsDiv;
let header;
let emailInput;
let firstInput;
let lastInput;
let phoneInput;
let workWithUs;
let license;
let ticket;
let outer = document.getElementsByClassName("outerModal")[0]
let rsvp = document.getElementsByClassName("rsvpForm")[0]
document.addEventListener('DOMContentLoaded', function(){
  debugger
  eventsDiv = document.getElementsByClassName("eventsDiv")[0]
  fetch("http://localhost:3000/events")
    .then(res => res.json())
    .then(json => renderEvents(json));
})

function renderEvents(data){
  console.log(eventsDiv)
  data.map(event => {
    debugger
    eventListElement = document.createElement('li')
    eventElement = document.createElement('a')
    console.log(eventListElement.innerText)
    eventElement.innerText = `${event.title}`
    eventElement.addEventListener("click", ()=> {openEventForm(event.title)})
    eventListElement.appendChild(eventElement)
    eventsDiv.appendChild(eventListElement)
  })
}

function openEventForm(data){
  emailInput = document.getElementById("emailInput")
  firstInput = document.getElementById("firstInput")
  lastInput = document.getElementById("lastInput")
  phoneInput = document.getElementById("phoneInput")
  workWithUs = document.getElementById("modalButton")
  license = document.querySelector('input[name="licensed"]')
  header = document.getElementsByClassName("eventTitle")[0]
  header.innerText = data
  outer.style.display = "unset"
  rsvp.style.display = "unset"
  outer.addEventListener("click", closeRsvpFormModal)
  rsvp.addEventListener("submit", submitCompanyLeadRsvpFormData)
}

function submitCompanyLeadRsvpFormData(e){
  e.preventDefault()
  debugger
  fetch("http://localhost:3000/company_lead_rsvps", {
        headers: {"Content-Type": "application/json",
        "Accept":"application/json"},
        method: "POST",
        body: JSON.stringify({
          email_address: emailInput.value,
          first_name: firstInput.value,
          last_name: lastInput.value,
          phone_number: phoneInput.value,
          licensed: license,
          event_title: header.innerText
        })
      })
      .then(res => res.json())
      .then(json => fetchRsvpOtp(json))
}

function fetchRsvpOtp(data){

  debugger
  fetch(`http://localhost:3000/company_lead_rsvp_tickets/${data.company_lead_rsvp.id}}`)
  .then(res => res.json())
  .then(json => generateQrCode(json))
}

function generateQrCode(data){
  debugger
  var typeNumber = 4;
        var errorCorrectionLevel = 'L';
        var qr = qrcode(typeNumber, errorCorrectionLevel);
        qr.addData(`${data.otp_secret_key}`);
        qr.make();
  showTicket({ticket:data, qrCode:qr} )
}

function showTicket(data){
  rsvp.style.display = "none"
  debugger
  document.getElementById('ticketTitleHeader').innerHTML = data.ticket.title
  document.getElementById('ticketDateHeader').innerHTML = "when: " + data.ticket.date
  document.getElementById('ticketLocationHeader').innerHTML = "where: " + data.ticket.location
  let qrCodeRendered = document.getElementById('placeHolder').innerHTML = data.qrCode.createImgTag();
  document.getElementById('ticketConfirmationHeader').innerHTML = "confirmation: " + data.ticket.confirmation
  debugger
  //
  ticket = document.getElementById('ticket').style.display = "unset"
}

function closeRsvpFormModal(){
  outer.style.display="none"
  rsvp.style.display="none"
  ticket.style.display="none"

}
