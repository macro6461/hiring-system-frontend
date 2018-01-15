const rootUrl = "http://localhost:3000/"
document.addEventListener('DOMContentLoaded', function(){
  debugger
  fetch(`${rootUrl}trainers`)
    .then(res => res.json())
    .then(json => renderTrainers(json))
})

  function renderTrainers(data){
    data.map(function(trainer){
      if (trainer.hold === true){
        renderHoldTrainer(trainer)
      } else if (trainer.hold === false && trainer.occupied === true){
        renderOccupiedTrainer(trainer)
      } else if (trainer.hold === false && trainer.occupied === false){
        renderAvailableTrainer(trainer)
      }
    })
  }

  function renderHoldTrainer(data){
    debugger
    var holdTrainerDiv = document.getElementsByClassName("holdTrainersDiv")[0]
    trainer = document.createElement("h4")
    trainerLeads = document.createElement('li')

    trainer.innerText = `${data.first_name} ` + `${data.last_name}`
    trainerLeads.innerText = "trainer leads " + `(${data.trainer_leads.length})` + ',' + " " + "  references " + `(${data.rsvp_references.length + data.interview_references.length})`

    holdTrainerDiv.appendChild(references)
    holdTrainerDiv.appendChild(trainer)
    holdTrainerDiv.appendChild(trainerLeads)
  }

  function renderOccupiedTrainer(data){

    var occupiedDiv = document.getElementsByClassName("occupiedTrainersDiv")[0]
    trainer = document.createElement("h4")
    trainerLeads = document.createElement('li')
    trainer.innerText = `${data.first_name} ` + `${data.last_name}`
    trainerLeads.innerText = "trainer leads " + `(${data.trainer_leads.length})` + ', ' + "references " + `(${data.rsvp_references.length + data.interview_references.length})`
    occupiedDiv.appendChild(trainer)
    occupiedDiv.appendChild(trainerLeads)

    // references.innerText = "references " + (`(${data.rsvp_references.length + data.interview_references.length})`)

    occupiedDiv.appendChild(references)
  }

  function renderAvailableTrainer(data){

    debugger
    var availableDiv = document.getElementsByClassName("availableTrainersDiv")[0]
    trainer = document.createElement("h4")
    trainerLeads = document.createElement('li')
    trainer.style.margin= "0"
    trainer.style.marginLeft= "3%"
    trainerLeads.style.margin= "1%"
    trainerLeads.style.marginLeft= "5%"
    trainer.innerText = `${data.first_name} ` + `${data.last_name}`
    trainerLeads.innerText = "trainer leads " + `(${data.trainer_leads.length})` + ', ' + "references " + `(${data.rsvp_references.length + data.interview_references.length})`
    availableDiv.appendChild(trainer)
    availableDiv.appendChild(trainerLeads)

    // references.innerText = "references " + (`(${data.rsvp_references.length + data.interview_references.length})`)

    

  }
