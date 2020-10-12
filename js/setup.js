'use strict';
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var setupPopup = document.querySelector('.setup');
var setupUsernameInput = setupPopup.querySelector('.setup-user-name');
var popupElement = document.querySelector('.setup-similar-list');
var setupButton = document.querySelector('.setup-open');
var popupCloseButton = document.querySelector('.setup-close');
var setupUploadPic = document.querySelector('.upload');
var popupWizardView = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var wizardsFragment = document.createDocumentFragment();
var setupWizardCoat = document.querySelector('.setup-wizard').querySelector('.wizard-coat');
var setupWizardEyes = document.querySelector('.setup-wizard').querySelector('.wizard-eyes');
var setupWizardFireball = document.querySelector('.setup-fireball-wrap');
var setupWizardAppearance = document.querySelector('.setup-wizard-appearance');

var WIZADR_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZAD_SECONDNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYE = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var getRandomInteger = function (min, max) {
  return Math.round(Math.random() * (max - min)) + min;
};
var getRandomElement = function (elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
};

var closePopupOnEsc = function (evt) {
  if (evt.key === ESC_KEY) {
    closeSetupWindow();
  }
  document.removeEventListener('keydown', closePopupOnEsc);
};

var openSetupWindow = function () {
  setupPopup.classList.remove('hidden');
  document.addEventListener('keydown', closePopupOnEsc);
};

var closeSetupWindow = function () {
  setupPopup.classList.add('hidden')
};

var renderWizard = function () {
  var wizadrElement = popupWizardView.cloneNode(true);

  popupElement.appendChild(wizadrElement);
  wizadrElement.querySelector('.setup-similar-label').textContent = getRandomElement(WIZADR_NAMES) + ' ' + getRandomElement(WIZAD_SECONDNAMES);
  wizadrElement.querySelector('.wizard-coat').style.fill = getRandomElement(WIZARD_COAT);
  wizadrElement.querySelector('.wizard-eyes').style.fill = getRandomElement(WIZARD_EYE);

  return wizadrElement;
};

document.querySelector('.setup-similar').classList.remove('hidden');

for (var i = 0; i < 4; i++) {
  wizardsFragment.appendChild(renderWizard());
}

popupElement.appendChild(wizardsFragment);

var setupPopupEsc = function () {
  window.addEventListener('keydown', function (evt) {
    if (evt.key === ESC_KEY && !setupUsernameInput.onfocus) {
      closeSetupWindow();
    }
  });
};

setupButton.addEventListener('click', function () {
  openSetupWindow();
  setupPopupEsc()
});
setupButton.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openSetupWindow();
  }
  ;
  setupPopupEsc()
});

setupUsernameInput.onfocus = function () {
  document.removeEventListener('keydown', closePopupOnEsc);
};
setupUsernameInput.onblur = function () {
  document.addEventListener('keydown', closePopupOnEsc);
};

popupCloseButton.addEventListener('click', closeSetupWindow);
popupCloseButton.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closeSetupWindow();
  }
});

setupWizardCoat.addEventListener('click', function () {
  setupWizardCoat.style.fill = getRandomElement(WIZARD_COAT);
  setupWizardAppearance.querySelector('input[name="coat-color"]').value = setupWizardCoat.style.fill;
});

setupWizardEyes.addEventListener('click', function () {
  setupWizardEyes.style.fill = getRandomElement(WIZARD_EYE);
  setupWizardAppearance.querySelector('input[name="eyes-color"]').value = setupWizardEyes.style.fill;
});

setupWizardFireball.addEventListener('click', function () {
  setupWizardFireball.style.background = getRandomElement(WIZARD_FIREBALL);
  setupWizardFireball.querySelector('input[name="fireball-color"]').value = setupWizardFireball.style.background;
});

setupUploadPic.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var dragged = false;

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY,
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    setupPopup.style.top = (setupPopup.offsetTop - shift.y) + 'px';
    setupPopup.style.left = (setupPopup.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function (clickEvt) {
        clickEvt.preventDefault();
        setupUploadPic.removeEventListener('click', onClickPreventDefault)
      };
      setupUploadPic.addEventListener('click', onClickPreventDefault)
    }
  };

  document.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp)

});



