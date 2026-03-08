document.addEventListener("DOMContentLoaded", function () {
  // Элементы
  const modal = document.getElementById("modalOverlay");
  const openModalBtn = document.getElementById("openModalBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const steps = document.querySelectorAll(".step");
  const progressBar = document.getElementById("progressBar");
  const stepIndicator = document.getElementById("stepIndicator");

  let currentStep = 1;
  const totalSteps = 4; // теперь 4 шага

  // Проверка чекбоксов перед переходом на следующий шаг
  function validateStep1() {
    const consent1 = document.getElementById("consent1");
    const consent2 = document.getElementById("consent2");

    if (!consent1 || !consent2) return true;

    const circle1 = consent1.nextElementSibling;
    const circle2 = consent2.nextElementSibling;

    let isValid = true;

    circle1.classList.remove("checkbox__circle--error");
    circle2.classList.remove("checkbox__circle--error");

    if (!consent1.checked) {
      circle1.classList.add("checkbox__circle--error");
      isValid = false;
    }

    if (!consent2.checked) {
      circle2.classList.add("checkbox__circle--error");
      isValid = false;
    }

    return isValid;
  }

  // Валидация шага 2
  function validateStep2() {
    const email = document.getElementById("email");
    if (!email) return true;

    const emailError = document.getElementById("emailError");
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    email.classList.remove("form__input--error");
    emailError.classList.remove("form__error--visible");

    if (!email.value.trim()) {
      email.classList.add("form__input--error");
      emailError.textContent = "Email обязателен для заполнения";
      emailError.classList.add("form__error--visible");
      isValid = false;
    } else if (!emailRegex.test(email.value)) {
      email.classList.add("form__input--error");
      emailError.textContent =
        "Введите корректный email (например: name@domain.com)";
      emailError.classList.add("form__error--visible");
      isValid = false;
    }

    return isValid;
  }

  // Обработчик кнопки оплаты
  const payButton = document.getElementById("payButton");
  if (payButton) {
    payButton.addEventListener("click", function () {
      if (currentStep === 3) {
        currentStep = 4;
        updateStep();
      }
    });
  }

  // Обработчик кнопки "Вернуться на главную"
  const backToMainBtn = document.getElementById("backToMainBtn");
  if (backToMainBtn) {
    backToMainBtn.addEventListener("click", function () {
      closeModal();
    });
  }

  // Сбрасываем ошибки при клике на чекбокс
  document.querySelectorAll(".checkbox__input").forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const circle = this.nextElementSibling;
      if (this.checked) {
        circle.classList.remove("checkbox__circle--error");
      }
    });
  });

  // Открытие
  openModalBtn.addEventListener("click", function () {
    modal.classList.add("modal--active");
    currentStep = 1;
    updateStep();
  });

  // Закрытие по крестику
  closeModalBtn.addEventListener("click", closeModal);

  // Закрытие по оверлею
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Навигация
  prevBtn.addEventListener("click", function () {
    if (currentStep > 1) {
      currentStep--;
      updateStep();
    } else {
      closeModal();
    }
  });

  nextBtn.addEventListener("click", function () {
    // Валидация
    if (currentStep === 1) {
      if (!validateStep1()) {
        return;
      }
    } else if (currentStep === 2) {
      if (!validateStep2()) {
        return;
      }
    }

    if (currentStep < totalSteps) {
      currentStep++;
      updateStep();
    }
  });

  // Убираем ошибку при вводе
  const emailInput = document.getElementById("email");
  if (emailInput) {
    emailInput.addEventListener("input", function () {
      this.classList.remove("form__input--error");
      const error = document.getElementById("emailError");
      if (error) error.classList.remove("form__error--visible");
    });
  }

  function updateStep() {
    // Скрываем все шаги
    steps.forEach((step) => {
      step.classList.remove("step--active");
    });

    // Показываем текущий
    document
      .querySelector(`.step--${currentStep}`)
      .classList.add("step--active");

    const modalWrapper = document.getElementById("stepModalWrapper");
    const modalContainer = document.getElementById("modalContainer");
    const stepWrapper = document.getElementById("headerStepWrapper");

    if (currentStep === 1) {
      modalWrapper.style.marginTop = "22px";
      stepWrapper.style.marginBottom = "11px";
      modalContainer.style.background = 'url("images/line-3.svg") no-repeat left top, url("images/line-4.svg") no-repeat right bottom, linear-gradient(174deg, color(display-p3 0.188 0.259 0.365) 8.19%, color(display-p3 0.094 0.502 0.659) 92%)'
      modalContainer.style.backgroundPosition = 'calc(100% - 431px) -157px, calc(100% + 230px) -158px, 0 0'
    }

    if (currentStep === 2) {
      modalWrapper.style.marginTop = "2px";
      stepWrapper.style.marginBottom = "11px";
      modalContainer.style.background = 'url("images/line-5.svg") no-repeat left top, url("images/line-6.svg") no-repeat right bottom,linear-gradient(174deg, color(display-p3 0.188 0.259 0.365) 8.19%, color(display-p3 0.094 0.502 0.659) 92%)'
    }

    if (currentStep === 3) {
      modalWrapper.style.marginTop = "16px";
      modalContainer.style.background = 'url("images/line-7.svg") no-repeat left top, url("images/line-8.svg") no-repeat right bottom,linear-gradient(174deg, color(display-p3 0.188 0.259 0.365) 8.19%, color(display-p3 0.094 0.502 0.659) 92%)'
    }

    if (currentStep === totalSteps) {
      modalWrapper.style.margin = "auto";
      modalContainer.style.background = 'url("images/line-9.svg") no-repeat left top, url("images/line-10.svg") no-repeat right bottom, linear-gradient(165deg, color(display-p3 0.188 0.259 0.365) 0.69%, color(display-p3 0.094 0.698 0.886) 63.66%, color(display-p3 0.918 0.984 1.000) 102.43%)'
    }

    const headerStep = document.getElementById("headerStep");
    if (headerStep) {
      if (currentStep === totalSteps) {
        headerStep.innerHTML = ""; // убираем заголовок на последнем шаге
      } else {
        headerStep.innerHTML = `Шаг ${currentStep}`;
      }
    }

    // Прогресс (для последнего шага показываем 100%)
    const progressPercent = (currentStep / (totalSteps - 1)) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Индикатор
    stepIndicator.textContent = `${currentStep}/${totalSteps - 1}`;

    // Скрываем/показываем элементы на последнем шаге
    if (currentStep === totalSteps) {
      nextBtn.style.display = "none";
      prevBtn.style.display = "none";
      closeModalBtn.style.display = "none";
      document.querySelector(".modal__footer--left").style.display = "none";
      document.getElementById("headerStepWrapper").style.display = "none";
      document.getElementById("capsuleImageLast").style.display = "block";
      document.getElementById("dnkImageLast").style.display = "block";
    } else if (currentStep === totalSteps - 1) {
      nextBtn.style.display = "none";
    } else {
      nextBtn.style.display = "block";
      prevBtn.style.display = "block";
      document.getElementById("headerStepWrapper").style.display = "block";
      document.getElementById("capsuleImageLast").style.display = "none";
      document.getElementById("dnkImageLast").style.display = "none";
      closeModalBtn.style.display = "flex";
      document.querySelector(".modal__footer--left").style.display = "flex";
    }
  }

  function closeModal() {
    modal.classList.remove("modal--active");
    currentStep = 1;
    updateStep();
  }

  // Инициализация
  updateStep();
});
