'use strict';
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var WIZARD_QUANTITY = 4;
var StatusCode = {
  OK: 200
};
var TIMEOUT = 10000;
var URL_LOAD = 'https://21.javascript.pages.academy/code-and-magick/data';
var URL_UPLOAD = 'https://21.javascript.pages.academy/code-and-magick';
var DEBOUNCE_INTERVAL = 500;
var IMG_FORMAT = ['png', 'jpg', 'jpeg', 'gif']

var setupPopup = document.querySelector('.setup');
var setupUsernameInput = setupPopup.querySelector('.setup-user-name');
var popupElement = document.querySelector('.setup-similar-list');
var setupButton = document.querySelector('.setup-open');
var setupIcon = setupButton.querySelector('.setup-open-icon');
var popupCloseButton = document.querySelector('.setup-close');
var setupUploadPic = document.querySelector('.upload');
var popupWizardView = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var wizardsFragment = document.createDocumentFragment();
var setupWizardCoat = document.querySelector('.setup-wizard').querySelector('.wizard-coat');
var setupWizardEyes = document.querySelector('.setup-wizard').querySelector('.wizard-eyes');
var setupWizardFireball = document.querySelector('.setup-fireball-wrap');
var setupWizardAppearance = document.querySelector('.setup-wizard-appearance');
var form = document.querySelector('.setup-wizard-form');
var userPic = document.querySelector('.setup-user-pic');
var uploadFiled = document.querySelector('.upload');
var picInput = uploadFiled.querySelector('input[type=file]');


// var WIZADR_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
// var WIZAD_SECONDNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYE = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var newEyesColor;
var newCoatColor;
var lastTimeout;
var wizardsList = [];

var getRandomInteger = function (min, max) {
  return Math.round(Math.random() * (max - min)) + min;
};
var getRandomElement = function (elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
};

var debounce = function (cb) {
  if (lastTimeout) {
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
}

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

var setupPopupEsc = function () {
  window.addEventListener('keydown', function (evt) {
    if (evt.key === ESC_KEY && !setupUsernameInput.onfocus) {
      closeSetupWindow();
    }
  });
};

var updateWizards = function () {
  var sameCoatWizards = wizardsList.filter(function (it) {
    return it.colorCoat === newCoatColor
  })
  var sameEyesWizards = wizardsList.filter(function (it) {
    return it.colorEyes === newEyesColor
  })
  var completelySimilarWizards = wizardsList.filter(function (it) {
    return it.colorEyes === newEyesColor && it.colorCoat === newCoatColor
  })

  var filteredWizards = completelySimilarWizards;
  filteredWizards = filteredWizards.concat(sameCoatWizards);
  filteredWizards = filteredWizards.concat(sameEyesWizards);
  filteredWizards = filteredWizards.concat(wizardsList);

  var chosenWizards = filteredWizards.filter(function (it, i) {
    return filteredWizards.indexOf(it) === i
  })
  render(chosenWizards);
}

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
  var coatRandomColor = getRandomElement(WIZARD_COAT);
  setupWizardCoat.style.fill = coatRandomColor;
  setupWizardAppearance.querySelector('input[name="coat-color"]').value = setupWizardCoat.style.fill;
  newCoatColor = coatRandomColor;
  debounce(updateWizards);
});

setupWizardEyes.addEventListener('click', function () {
  var eyesRandomColor = getRandomElement(WIZARD_EYE);
  setupWizardEyes.style.fill = eyesRandomColor;
  setupWizardAppearance.querySelector('input[name="eyes-color"]').value = setupWizardEyes.style.fill;
  newEyesColor = eyesRandomColor;
  debounce(updateWizards);
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

var upload = function (data, uploadSuccess) {
  var xhr = new XMLHttpRequest();

  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    uploadSuccess(xhr.response)
  });
  xhr.open('POST', URL_UPLOAD);
  xhr.send(data)
}

form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  upload(new FormData(form), closeSetupWindow);
})

var load = function (loadSuccess, loadError) {
  var xhr = new XMLHttpRequest();

  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (xhr.status === StatusCode.OK) {
      loadSuccess(xhr.response)
    } else {
      loadError('Внимание!!! Статус ответа ' + xhr.status + ' ' + xhr.statusText)
    }
  });

  xhr.addEventListener('error', function () {
    loadError('Внимание!!! Ошибка соединения!!!!')
  });

  xhr.addEventListener('timeout', function () {
    loadError('Внимание!!! Запрос не успел обработаться за ' + xhr.timeout + 'мс ')
  });

  xhr.timeout = TIMEOUT;
  xhr.open('GET', URL_LOAD);
  xhr.send()

}

var renderWizard = function (wizard) {
  var wizadrElement = popupWizardView.cloneNode(true);

  wizadrElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizadrElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
  wizadrElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

  return wizadrElement;
};

var render = function (data) {
  var takeNumber = data.length > 4 ? 4 : data.length;
  popupElement.innerHTML = '';
  for (var i = 0; i < takeNumber; i++) {
    popupElement.appendChild(renderWizard(data[i]));
  }

  document.querySelector('.setup-similar').classList.remove('hidden');
};

var successHandler = function (wizards) {
  for (var i = 0; i < WIZARD_QUANTITY; i++) {
    wizardsFragment.appendChild(renderWizard(wizards[i]));
  }

  popupElement.appendChild(wizardsFragment);
  document.querySelector('.setup-similar').classList.remove('hidden');

  wizardsList = wizards
}

var errorHandler = function (errorMessage) {
  alert(errorMessage)
}

load(successHandler, errorHandler);

picInput.addEventListener('change', function () {
  var picFile = picInput.files[0];
  var picFileName = picFile.name.toLowerCase();
  var fileFormat = IMG_FORMAT.some(function (it) {
    return picFileName.endsWith(it)
  })

  if (fileFormat) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      return userPic.src = setupIcon.src = reader.result
    })

    reader.readAsDataURL(picFile)
  }

})



