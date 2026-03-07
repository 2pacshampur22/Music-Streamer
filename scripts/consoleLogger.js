document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('formValid', function(event) {
        const formData = event.detail;
        console.clear();
        console.log('%с SOUNDFLOW - ДАННЫЕ ФОРМЫ ОБРАТНОЙ СВЯЗИ', 'color: #1DB954; font-size: 16px; font-weight: bold');
        console.log('');
        
        console.log('%c ФИО:', 'color: #1DB954; font-weight: bold', formData.name);
        console.log('%c Email:', 'color: #1DB954; font-weight: bold', formData.email);
        console.log('%c Тема:', 'color: #1DB954; font-weight: bold', formData.subject);
        console.log('%c Сообщение:', 'color: #1DB954; font-weight: bold', formData.message);
        console.log('%c Время отправки:', 'color: #1DB954; font-weight: bold', formData.timestamp);
        
        console.log('');
        
        console.table({
            'ФИО': formData.name,
            'Email': formData.email,
            'Тема': formData.subject,
            'Время': formData.timestamp
        });
        
        console.log('%c Полные данные формы:', 'color: #1DB954; font-weight: bold');
        console.dir(formData);
        
        // Статистика по сообщению
        console.log('');
        console.log('%c СТАТИСТИКА СООБЩЕНИЯ:', 'color: #1DB954; font-weight: bold');
        console.log('  Длина сообщения:', formData.message.length, 'символов');
        console.log('  Количество слов:', formData.message.split(' ').filter(w => w.length > 0).length);
        console.log('  Количество строк:', formData.message.split('\n').length);
        
        const emailDomain = formData.email.split('@')[1];
        console.log('  Домен email:', emailDomain);
        
        console.log('');
        console.log('%c Форма успешно отправлена!', 'color: white; background: #1DB954; padding: 8px 12px; border-radius: 4px; font-weight: bold');
        console.log('');
        
        console.groupCollapsed('%c Техническая информация', 'color: #1DB954; font-weight: bold');
        console.log('User Agent:', navigator.userAgent);
        console.log('Язык браузера:', navigator.language);
        console.log('Разрешение экрана:', `${window.screen.width}x${window.screen.height}`);
        console.log('Размер окна:', `${window.innerWidth}x${window.innerHeight}`);
        console.groupEnd();
        
        saveToHistory(formData);
        
        console.log('');
        console.groupCollapsed('%c История отправок форм', 'color: #1DB954; font-weight: bold');
        const history = getHistory();
        if (history.length > 0) {
            console.table(history);
            console.log(`Всего отправок: ${history.length}`);
        } else {
            console.log('История пуста');
        }
        console.groupEnd();
    });
    
    function saveToHistory(formData) {
        try {
            let history = JSON.parse(localStorage.getItem('soundflow_form_history')) || [];
            
            history.push({
                id: Date.now(),
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                timestamp: formData.timestamp
            });
            
            if (history.length > 10) {
                history = history.slice(-10);
            }
            
            localStorage.setItem('soundflow_form_history', JSON.stringify(history));
        } catch (e) {
            console.warn('Не удалось сохранить в историю:', e);
        }
    }
    
    function getHistory() {
        try {
            return JSON.parse(localStorage.getItem('soundflow_form_history')) || [];
        } catch (e) {
            return [];
        }
    }
    
    window.clearFormHistory = function() {
        localStorage.removeItem('soundflow_form_history');
        console.log('%c История форм очищена', 'color: #1DB954; font-weight: bold');
    };
    
    console.log('%c SoundFlow Console Logger', 'color: #1DB954; font-size: 14px; font-weight: bold');
    console.log('%c Валидация форм активирована. Отправьте форму для просмотра данных.', 'color: #b3b3b3');
    console.log('%c Для очистки истории введите: clearFormHistory()', 'color: #b3b3b3');
});
