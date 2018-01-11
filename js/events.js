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
  eventsDiv = document.getElementsByClassName("eventsDiv")[0]

      fetchEvent()

})

function fetchEvent(){
  fetch("http://localhost:3000/events")
    .then(res => res.json())
    .then(json => renderEvent(json[0]))
    .then(setTimeout(function(){
      fetchEventAgain()
    }, 1000))
}

function fetchEventAgain(){
  fetchEvent()
}


function renderEvent(data){
  if (eventsDiv.innerText.length === 0){
    debugger
  console.log(eventsDiv)
    eventHeaderElement = document.createElement('h2')
    eventElement = document.createElement('a')
    eventTimeHeaderElement = document.createElement('h4')
    eventTimeHeaderElement.innerText = `${time(data.start_date)} to ${time(data.end_date)}`
    eventElement.innerText = `${data.title}`
    eventsDiv.addEventListener("click", ()=> {openEventForm(data.title)})
    eventHeaderElement.appendChild(eventElement)
    eventsDiv.appendChild(eventHeaderElement)
    eventsDiv.appendChild(eventTimeHeaderElement)
    eventsDiv.style.width = "50%"
    eventsDiv.style.padding = "5%"
    eventsDiv.style.textAlign = "center"
    eventsDiv.style.display = "block"
    eventsDiv.style.marginLeft = "20%"
    eventsDiv.style.border = "solid 1px black"
  } else {
    reRenderEvent(data)
  }
}

function date(data){
  var monthAndDay = data.end_date.split("T")[0].split("-").splice(1)
  var year = data.end_date.split("T")[0].split("-")[0]
  var newDate = monthAndDay.push(year).join("/")
}

function time(data){
  debugger
  var twentyFourTime = data.split("T")[1].split(":00")[0]
  var hour = data.split("T")[1].split(":00")[0].split(":")[0]
  var min;
  if (data.split("T")[1].split(":00")[0].split(":")[1] === undefined){
    min = "00"
  } else {
    min = data.split("T")[1].split(":00")[0].split(":")[1]
  }
  debugger
  var newHr;
  var amOrPm;
  if (parseInt(hour) > 12){
    newHr = (hour - 12)
    newHr.toString()
    amOrPm = "pm"
  } else {
    newHr = hour.toString()
    amOrPm = "am"
  }
  var newTime = newHr + ":" + min + amOrPm
  console.log(newTime)
  return newTime
}

function reRenderEvent(data){
  eventsDiv.addEventListener("click", ()=> {openEventForm(data.title)})
  eventHeaderElement.innerText = `${data.title}`
  debugger
}

function openEventForm(data){
  emailInput = document.getElementById("emailInput")
  firstInput = document.getElementById("firstInput")
  lastInput = document.getElementById("lastInput")
  phoneInput = document.getElementById("phoneInput")
  workWithUs = document.getElementById("modalButton")
  license = document.querySelector('input[name="licensed"]')
  header = document.getElementsByClassName("eventTitle")[0]
  let trainerInput = document.getElementById("trainerInput")
  header.innerText = data
  outer.style.display = "unset"
  rsvp.style.display = "unset"
  outer.addEventListener("click", closeRsvpFormModal)
  rsvp.addEventListener("submit", submitCompanyLeadRsvpFormData)
}

function submitCompanyLeadRsvpFormData(e){
  e.preventDefault()
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
        .then(json => postToTrainerLeadRsvp(json))
  } else {
    fetch("http://localhost:3000/company_lead_rsvps", {
          headers: {"Content-Type": "application/json",
          "Accept":"application/json"},
          method: "POST",
          body: JSON.stringify({
            email_address: emailInput.value,
            first_name: firstInput.value,
            last_name: lastInput.value,
            phone_number: phoneInput.value,
            licensed: license.value,
            event_title: header.innerText
          })
        })
        .then(res => res.json())
        .then(json => fetchRsvpOtp(json))
  }
}

function postToTrainerLeadRsvp(data){
  let licensed = document.querySelector('input[name="licensed"]:checked')
  let trainerId = data.trainer.id
  debugger
  fetch("http://localhost:3000/trainer_lead_rsvps", {
      headers: {"Content-Type": "application/json",
      "Accept":"application/json"},
      method: "POST",
      body: JSON.stringify({
        email_address: emailInput.value,
        first_name: firstInput.value,
        last_name: lastInput.value,
        phone_number: phoneInput.value,
        licensed: license.value,
        event_title: header.innerText,
        trainer_id: trainerId
      })
    })
    .then(res => res.json())
    .then(json => fetchRsvpOtp(json))

    //send confirmation email
}

function fetchRsvpOtp(data){
  debugger
  if (data.company_lead_rsvp){
    fetch(`http://localhost:3000/company_lead_rsvp_tickets/${data.company_lead_rsvp.id}}`)
    .then(res => res.json())
    .then(json => generateQrCode(json))
  } else if (data.trainer_lead_rsvp){
    fetch(`http://localhost:3000/trainer_lead_rsvp_tickets/${data.trainer_lead_rsvp.id}}`)
    .then(res => res.json())
    .then(json => generateQrCode(json))
  }

}

function generateQrCode(data){
  //consider adding more user data in the qr code. When scanned it reads the string it was used to be made.
  debugger
  if (data){
    var typeNumber = 6;
          var errorCorrectionLevel = 'L';
          var qr = qrCodeGenerator(typeNumber, errorCorrectionLevel);
          qr.addData(data.otp_secret_key);
          qr.make();
    showTicket({ticket: data, qrCode:qr} )
  }
}

function showTicket(data){
  rsvp.style.display = "none"
  debugger
  document.getElementById('ticketTitleHeader').innerHTML = data.ticket.title
  document.getElementById('ticketDateHeader').innerHTML = "when: " + `${time(data.ticket.start_date)}` + "-" + `${time(data.ticket.end_date)}`
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
