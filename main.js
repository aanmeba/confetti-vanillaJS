const Modal = function (team) {
  this.container = null;
  this.congrat = null;
  this.teamName = null;

  this.wrapper = document.getElementById("wrapper");
  this.modal = document.getElementById("modal");
  this.modal.classList.add("open");

  this._setupElements();
  this._renderTeam(team);
  this._closeModal();
};

Modal.prototype._closeModal = function () {
  window.addEventListener("click", () => {
    this.modal.classList.remove("open");
    this.container.remove();
  });
};

Modal.prototype._setupElements = function () {
  const container = document.createElement("div");
  const congrat = document.createElement("h2");
  const teamName = document.createElement("h1");

  const wrapperPosition = this.wrapper.style.position;

  if (wrapperPosition !== "relative" || wrapperPosition !== "absolute") {
    this.wrapper.style.position = "relative";
  }

  container.classList.add("container");
  congrat.classList.add("congrat");
  teamName.classList.add("teamName");

  this.wrapper.appendChild(container);
  this.container = container;

  this.container.appendChild(congrat);
  this.container.appendChild(teamName);

  this.congrat = congrat;
  this.teamName = teamName;
};

Modal.prototype._renderTeam = function (team) {
  this.congrat.innerText = "🎉 Woohoo! 🎉";
  this.teamName.innerText = `Team ${team.name}`;
  team.members?.forEach((member) => {
    this.container.innerHTML += `<h1>${member}</h1>`;
  });
};

const Confettiful = function (element) {
  this.wrapper = element;
  this.container = null;

  this.confettiColors = [
    "#EF2964",
    "#CD3168",
    "#00C09D",
    "#16f0ea",
    "#2D87B0",
    "#6df016",
    "#48485E",
    "#FFDA90",
    "#EFFF1D",
  ];
  this.confettiAnimations = ["slow", "medium", "fast"];

  this._setupElements();
  this._renderConfetti();
  this._closeModal();
};

Confettiful.prototype._setupElements = function () {
  const container = document.createElement("div");
  const wrapperPosition = this.wrapper.style.position;

  if (wrapperPosition !== "relative" || wrapperPosition !== "absolute") {
    this.wrapper.style.position = "relative";
  }

  this.wrapper.appendChild(container);
  this.container = container;
};

Confettiful.prototype._renderConfetti = function () {
  this.confettiInterval = setInterval(() => {
    const confetti = document.createElement("div");
    const confettiSize = Math.floor(Math.random() * 3) + 7 + "px";
    const confettiBackground =
      this.confettiColors[
        Math.floor(Math.random() * this.confettiColors.length)
      ];
    const confettiLeft =
      Math.floor(Math.random() * this.wrapper.offsetWidth) + "px";
    const confettiAnimation =
      this.confettiAnimations[
        Math.floor(Math.random() * this.confettiAnimations.length)
      ];

    confetti.classList.add(
      "confetti",
      "confetti--animation-" + confettiAnimation
    );
    confetti.style.left = confettiLeft;
    confetti.style.width = confettiSize;
    confetti.style.height = confettiSize;
    confetti.style.backgroundColor = confettiBackground;

    confetti.removeTimeout = setTimeout(function () {
      confetti.parentNode.removeChild(confetti);
    }, 3000);

    this.container.appendChild(confetti);
  }, 10); // this number controls the quantity of confetti
};

Confettiful.prototype._closeModal = function () {
  window.addEventListener("click", () => {
    clearInterval(this.confettiInterval);
  });
};

const openModal = (team) => {
  const modal = new Modal(team);
  const conf = new Confettiful(document.getElementById("wrapper"));
};

openModal({
  name: "3",
  members: ["Anna", "Bob", "Charlie"],
});
