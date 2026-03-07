document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        clearErrors();
        
        let isValid = true;
        const nameInput = document.querySelector('input[name="name"]');
        const nameValue = nameInput.value.trim();
        const words = nameValue.split(' ').filter(word => word.length > 0);
        
        if (nameValue === '') {
            showError(nameInput, 'Пожалуйста, введите ваше имя');
            isValid = false;
        } else if (words.length < 2) {
            showError(nameInput, 'Введите фамилию и имя (минимум 2 слова)');
            isValid = false;
        }
        
        const emailInput = document.querySelector('input[name="email"]');
        const emailValue = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailValue === '') {
            showError(emailInput, 'Пожалуйста, введите email');
            isValid = false;
        } else if (!emailPattern.test(emailValue)) {
            showError(emailInput, 'Введите корректный email адрес');
            isValid = false;
        }
        
        const subjectInput = document.querySelector('select[name="subject"]');
        const subjectValue = subjectInput.value;
        
        if (subjectValue === '' || !subjectValue) {
            showError(subjectInput, 'Пожалуйста, выберите тему обращения');
            isValid = false;
        }
        
        // 4. Проверка сообщения
        const messageInput = document.querySelector('textarea[name="message"]');
        const messageValue = messageInput.value.trim();
        
        if (messageValue === '') {
            showError(messageInput, 'Пожалуйста, введите сообщение');
            isValid = false;
        } else if (messageValue.length < 10) {
            showError(messageInput, 'Сообщение должно содержать минимум 10 символов');
            isValid = false;
        } else if (messageValue.length > 500) {
            showError(messageInput, 'Сообщение не должно превышать 500 символов');
            isValid = false;
        }
        
        const consentInput = document.querySelector('input[name="consent"]');
        
        if (!consentInput.checked) {
            showError(consentInput, 'Необходимо согласие на обработку персональных данных');
            isValid = false;
        }
        
        if (isValid) {
            const formData = {
                name: nameValue,
                email: emailValue,
                subject: subjectInput.options[subjectInput.selectedIndex].text,
                message: messageValue,
                timestamp: new Date().toLocaleString('ru-RU')
            };
            
            const event = new CustomEvent('formValid', { detail: formData });
            document.dispatchEvent(event);
            
            showSuccessMessage();
            
            form.reset();
        } else {
            const firstError = document.querySelector('.border-red-500');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    function showError(input, message) {
        input.classList.add('border-red-500', 'border-2');
        input.classList.remove('focus:ring-spotify-green');
        
        const errorMessage = document.createElement('p');
        errorMessage.classList.add('text-red-500', 'text-sm', 'mt-1', 'error-message');
        errorMessage.innerHTML = `<i class="fas fa-exclamation-circle mr-1"></i>${message}`;
        
        const parent = input.closest('div');
        parent.appendChild(errorMessage);
    }
    
    function clearErrors() {
        document.querySelectorAll('.border-red-500').forEach(el => {
            el.classList.remove('border-red-500', 'border-2');
        });
        
        document.querySelectorAll('.error-message').forEach(el => {
            el.remove();
        });
        
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.classList.add('hidden');
        }
    }
    
    function showSuccessMessage() {
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.classList.remove('hidden');
            
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 5000);
        }
    }
    
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('border-red-500', 'border-2');
            
            const parent = this.closest('div');
            const errorMessage = parent.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        });
        
        if (input.tagName === 'SELECT') {
            input.addEventListener('change', function() {
                this.classList.remove('border-red-500', 'border-2');
                const parent = this.closest('div');
                const errorMessage = parent.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            });
        }
    });
    
    const nameInput = document.querySelector('input[name="name"]');
    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            const value = this.value.trim();
            if (value !== '') {
                const words = value.split(' ').filter(word => word.length > 0);
                if (words.length < 2) {
                    this.classList.add('border-yellow-500');
                } else {
                    this.classList.remove('border-yellow-500');
                    this.classList.add('border-green-500');
                }
            }
        });
    }
    
    const emailInput = document.querySelector('input[name="email"]');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const value = this.value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value !== '') {
                if (emailPattern.test(value)) {
                    this.classList.remove('border-yellow-500');
                    this.classList.add('border-green-500');
                } else {
                    this.classList.add('border-yellow-500');
                }
            }
        });
    }
});
