let themeButton = document.getElementById("theme-button");
const toggleDarkMode = () => 
{
  document.body.classList.toggle("dark-mode");
}
themeButton.addEventListener("click", toggleDarkMode);
// Add your query for the sign now button here
let SignNowButton = document.getElementById("sign-now-button");
const addSignature = (person) => 
{
   let count = 4;
   const newSignature = document.createElement('p');
   newSignature.textContent = '🖊' + " " + person.name + " " + 'from' + " " + person.hometown + " " + 'supports this.'; 
   const signaturesSection = document.querySelector('.signatures');
   const oldCounter = document.getElementById('counter');
   oldCounter.remove();
   count = count + 1;
   const newCount = document.createElement('p');
   newCount.id = 'counter';
   newCount.textContent = '🖊️' + " " + count + " " + "people have signed this petition and support this cause.";
   signaturesSection.appendChild(newSignature);
   signaturesSection.appendChild(newCount);
}
const validateForm = () => 
{
  let containsErrors = false;
  let petitionInputs = document.getElementById("sign-petition").elements;
  let person = 
  {
    name: petitionInputs[0].value,
    hometown: petitionInputs[1].value,
    email: petitionInputs[2].value
  };
  for (let i = 0; i < petitionInputs.length; i++) 
  {
    if (petitionInputs[i].value.length < 2) 
    {
      petitionInputs[i].classList.add('error');
      containsErrors = true;
    }
    else 
    {
      petitionInputs[i].classList.remove('error');
    }
  }
  const email = document.getElementById('email'); 
  if (!email.value.includes('.com')) 
  {
    email.classList.add('error');
    containsErrors = true;
  } 
  else 
  {
    email.classList.remove('error');
  }
  if(containsErrors == false)
  {
    addSignature(person);
    toggleModal(person);
    scaleImage();
    for(let i = 0; i < petitionInputs.length; i++)
    {
      petitionInputs[i].value = "";
      containsErrors = false;
    }
  }
}
SignNowButton.addEventListener('click', validateForm);
let animation = 
{
  revealDistance: 150,
  initialOpacity: 1,
  transitionDelay: 0,
  transitionDuration: "2s",
  transitionProperty: "all",
  transitionTimingFunction: "ease"
}
let revealableContainers = document.querySelectorAll(".revealable");
const reveal = () => 
{
  for (let i = 0; i < revealableContainers.length; i++) 
  {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) 
    {
      revealableContainers[i].classList.add('active');
    } 
    else 
    {
      revealableContainers[i].classList.remove('active');
    }
  }
}
window.addEventListener('scroll', reveal);
let reduceMotionButton = document.getElementById("reduce-motion");
const reduceMotion = () => 
{
    animation.transition = "none";
    for (let i = 0; i < revealableContainers.length; i++)
    {
      revealableContainers[i].style.transition = animation.transition;
    }
}
reduceMotionButton.addEventListener("click", reduceMotion);
const toggleModal = (person) => 
{
  let intervalId = setInterval(scaleImage, 500);
  const modal = document.getElementById('thanks-modal');
  const modalContent = document.getElementById('thanks-modal-content');
  modal.style.display = 'flex';
  modalContent.textContent = `Thank you so much, ${person.name}! ${person.hometown} represent!`;
  setTimeout(() => 
  {
    modal.style.display = "none";
    clearInterval(intervalId);
  }, 4000)
}
scaleFactor = 1;
const modalImage = document.querySelector('#thanks-modal img');
const scaleImage = () =>
{
    if (scaleFactor === 1) 
    {
       scaleFactor = 0.8;
     } 
    else 
    {
       scaleFactor = 1;
    }
   modalImage.style.transform = `scale(${scaleFactor})`;
}
const closeButton = document.getElementById('closeButton');
function hideModal() 
{
    const modal = document.getElementById('thanks-modal');
    modal.style.display = 'none';
}
closeButton.addEventListener('click', hideModal);