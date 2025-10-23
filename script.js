// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
if (tg) {
    tg.ready();
    tg.expand();
}

// Глобальные переменные
let clients = [];
let appointments = [];
let customServices = [];
let currentUser = {
    name: 'Пользователь',
    services: ['Маникюр', 'Страховое агентство', 'Аэродизайн', 'Тату салон']
};

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    loadDataFromBot();
    initializeApp();
    setupEventListeners();
    updateDashboard();
});

// Загрузка данных от бота
function loadDataFromBot() {
    if (window.Telegram && window.Telegram.WebApp) {
        // Получаем данные от бота
        const botData = window.Telegram.WebApp.initData;
        console.log('Данные от бота:', botData);
        
        // Если есть данные от бота, используем их
        if (botData) {
            try {
                const data = JSON.parse(botData);
                if (data.clients) clients = data.clients;
                if (data.appointments) appointments = data.appointments;
                if (data.customServices) customServices = data.customServices;
                if (data.userName) currentUser.name = data.userName;
                if (data.userServices) currentUser.services = data.userServices;
                
                console.log('Данные загружены от бота');
            } catch (error) {
                console.error('Ошибка парсинга данных от бота:', error);
            }
        }
    }
}

// Загрузка данных пользователя
function loadUserData() {
    const savedClients = localStorage.getItem('businessClients');
    const savedAppointments = localStorage.getItem('businessAppointments');
    const savedUser = localStorage.getItem('businessUser');
    const savedCustomServices = localStorage.getItem('businessCustomServices');
    
    if (savedClients) {
        clients = JSON.parse(savedClients);
    }
    
    if (savedAppointments) {
        appointments = JSON.parse(savedAppointments);
    }
    
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
    
    if (savedCustomServices) {
        customServices = JSON.parse(savedCustomServices);
    }
    
    // Обновляем интерфейс с данными пользователя
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userServices').textContent = currentUser.services.join(', ');
}

// Сохранение данных
function saveData() {
    localStorage.setItem('businessClients', JSON.stringify(clients));
    localStorage.setItem('businessAppointments', JSON.stringify(appointments));
    localStorage.setItem('businessUser', JSON.stringify(currentUser));
    localStorage.setItem('businessCustomServices', JSON.stringify(customServices));
    
    // Отправляем данные в бот
    sendDataToBot();
}

// Отправка данных в бот
function sendDataToBot() {
    if (window.Telegram && window.Telegram.WebApp) {
        const data = {
            clients: clients,
            appointments: appointments,
            customServices: customServices,
            userName: currentUser.name,
            userServices: currentUser.services
        };
        
        console.log('Отправляем данные в бот:', data);
        
        try {
            window.Telegram.WebApp.sendData(JSON.stringify(data));
            console.log('Данные успешно отправлены в бот');
            return true;
        } catch (error) {
            console.error('Ошибка отправки данных в бот:', error);
            return false;
        }
    } else {
        console.log('Telegram WebApp не доступен, данные сохранены локально');
        return false;
    }
}

// Синхронизация с ботом
function syncWithBot() {
    console.log('Начинаем синхронизацию с ботом...');
    
    if (sendDataToBot()) {
        showNotification('✅ Данные синхронизированы с ботом!', 'success');
    } else {
        showNotification('⚠️ Синхронизация недоступна (не в Telegram)', 'warning');
    }
}

// Инициализация приложения
function initializeApp() {
    // Заполняем селекты услуг
    updateServiceSelects();
    
    // Загружаем данные
    renderClients();
    renderAppointments();
    checkUpcomingAppointments();
    updateChart();
}

// Обновление селектов услуг
function updateServiceSelects() {
    const serviceSelects = document.querySelectorAll('select[id*="Service"], select[id*="service"]');
    serviceSelects.forEach(select => {
        select.innerHTML = '<option value="">Выберите услугу</option>';
        
        // Добавляем стандартные услуги
        currentUser.services.forEach(service => {
            const option = document.createElement('option');
            option.value = service;
            option.textContent = service;
            select.appendChild(option);
        });
        
        // Добавляем пользовательские услуги
        customServices.forEach(service => {
            const option = document.createElement('option');
            option.value = service;
            option.textContent = service;
            select.appendChild(option);
        });
    });
}

// Настройка обработчиков событий
function setupEventListeners() {
    console.log('Настройка обработчиков событий...');
    
    // Навигация по вкладкам
    document.querySelectorAll('.tab-btn').forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            switchTab(targetTab);
        });
    });
    
    // Формы
    const addClientForm = document.getElementById('addClientForm');
    const editClientForm = document.getElementById('editClientForm');
    const addAppointmentForm = document.getElementById('addAppointmentForm');
    
    if (addClientForm) {
        addClientForm.addEventListener('submit', handleAddClient);
    }
    
    if (editClientForm) {
        editClientForm.addEventListener('submit', handleEditClient);
    }
    
    if (addAppointmentForm) {
        addAppointmentForm.addEventListener('submit', handleAddAppointment);
    }
    
    // Обработчики для пользовательских услуг
    const addCustomServiceBtn = document.getElementById('addCustomService');
    const editAddCustomServiceBtn = document.getElementById('editAddCustomService');
    
    console.log('addCustomServiceBtn:', addCustomServiceBtn);
    console.log('editAddCustomServiceBtn:', editAddCustomServiceBtn);
    
    if (addCustomServiceBtn) {
        addCustomServiceBtn.addEventListener('click', toggleCustomServiceInput);
        console.log('Обработчик добавлен для addCustomServiceBtn');
    } else {
        console.error('Кнопка addCustomService не найдена!');
    }
    
    if (editAddCustomServiceBtn) {
        editAddCustomServiceBtn.addEventListener('click', toggleCustomServiceInput);
        console.log('Обработчик добавлен для editAddCustomServiceBtn');
    } else {
        console.error('Кнопка editAddCustomService не найдена!');
    }
    
    // Клик по модальному фону
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeAllModals();
            }
        });
    });
    
    console.log('Обработчики событий настроены');
}

// Переключение ввода пользовательской услуги
function toggleCustomServiceInput(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Функция toggleCustomServiceInput вызвана');
    
    const button = e.target;
    const container = button.closest('.service-input-container');
    
    if (!container) {
        console.error('Контейнер service-input-container не найден');
        return;
    }
    
    const customInput = container.querySelector('.custom-service-input');
    const select = container.querySelector('select');
    
    console.log('Container:', container);
    console.log('Custom input:', customInput);
    console.log('Select:', select);
    console.log('Button:', button);
    
    if (!customInput) {
        console.error('Поле custom-service-input не найдено');
        return;
    }
    
    const isHidden = customInput.style.display === 'none' || customInput.style.display === '';
    console.log('Is hidden:', isHidden);
    
    if (isHidden) {
        customInput.style.display = 'block';
        button.textContent = '✖️ Отменить';
        if (select) select.required = false;
        const input = customInput.querySelector('input');
        if (input) {
            input.focus();
        }
        console.log('Показано поле ввода');
    } else {
        customInput.style.display = 'none';
        button.textContent = '+ Добавить свою услугу';
        if (select) select.required = true;
        const input = customInput.querySelector('input');
        if (input) {
            input.value = '';
        }
        console.log('Скрыто поле ввода');
    }
}

// Переключение вкладок
function switchTab(tabName) {
    // Убираем активный класс со всех вкладок и контента
    document.querySelectorAll('.tab-btn').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Активируем выбранную вкладку
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(tabName).classList.add('active');
    
    // Обновляем данные в зависимости от вкладки
    if (tabName === 'dashboard') {
        updateDashboard();
        updateChart();
    } else if (tabName === 'clients') {
        renderClients();
    } else if (tabName === 'appointments') {
        renderAppointments();
    }
}

// Обновление дашборда
function updateDashboard() {
    const totalEarnings = appointments.reduce((sum, apt) => sum + (apt.completed ? apt.price : 0), 0);
    const totalClients = clients.length;
    const today = new Date().toDateString();
    const todayAppointments = appointments.filter(apt => new Date(apt.dateTime).toDateString() === today).length;
    const completedAppointments = appointments.filter(apt => apt.completed).length;
    
    document.getElementById('totalEarnings').textContent = `${totalEarnings.toLocaleString()} ₽`;
    document.getElementById('totalClients').textContent = totalClients;
    document.getElementById('todayAppointments').textContent = todayAppointments;
    document.getElementById('completedAppointments').textContent = completedAppointments;
}

// Обновление графика
function updateChart() {
    const ctx = document.getElementById('earningsChart');
    if (!ctx) return;
    
    // Получаем данные за последние 7 дней
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        last7Days.push(date.toISOString().split('T')[0]);
    }
    
    const earningsData = last7Days.map(date => {
        return appointments
            .filter(apt => apt.dateTime.startsWith(date) && apt.completed)
            .reduce((sum, apt) => sum + apt.price, 0);
    });
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: last7Days.map(date => new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })),
            datasets: [{
                label: 'Доходы (₽)',
                data: earningsData,
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + ' ₽';
                        }
                    }
                }
            }
        }
    });
}

// Показ модального окна добавления клиента
function showAddClientModal() {
    document.getElementById('addClientModal').classList.add('active');
    document.getElementById('clientName').focus();
}

// Закрытие модального окна добавления клиента
function closeAddClientModal() {
    document.getElementById('addClientModal').classList.remove('active');
    document.getElementById('addClientForm').reset();
}

// Закрытие модального окна редактирования клиента
function closeEditClientModal() {
    document.getElementById('editClientModal').classList.remove('active');
    document.getElementById('editClientForm').reset();
}

// Закрытие всех модальных окон
function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

// Обработка добавления клиента
function handleAddClient(e) {
    e.preventDefault();
    
    // Получаем услугу (стандартную или пользовательскую)
    let service = document.getElementById('clientService').value;
    const customServiceInput = document.getElementById('customService');
    const customService = customServiceInput ? customServiceInput.value : '';
    
    // Проверяем, используется ли пользовательская услуга
    if (customServiceInput && customServiceInput.style.display !== 'none' && customService && customService.trim()) {
        service = customService.trim();
        // Добавляем пользовательскую услугу в список
        if (!customServices.includes(service)) {
            customServices.push(service);
        }
    }
    
    const clientData = {
        id: Date.now(),
        name: document.getElementById('clientName').value,
        phone: document.getElementById('clientPhone').value,
        telegram: document.getElementById('clientTelegram').value,
        service: service || 'Не указана',
        status: document.getElementById('clientStatus').value,
        source: document.getElementById('clientSource').value,
        comments: document.getElementById('clientComments').value,
        createdAt: new Date().toISOString()
    };
    
    // Добавляем клиента
    clients.push(clientData);
    
    saveData();
    updateServiceSelects();
    closeAllModals();
    e.target.reset();
    
    // Переключаемся на вкладку клиентов
    switchTab('clients');
    
    showNotification('Клиент добавлен!', 'success');
    
    // Автоматическая синхронизация с ботом
    setTimeout(() => {
        syncWithBot();
    }, 1000);
}

// Обработка редактирования клиента
function handleEditClient(e) {
    e.preventDefault();
    
    const clientId = parseInt(document.getElementById('editClientId').value);
    const clientIndex = clients.findIndex(c => c.id === clientId);
    
    if (clientIndex !== -1) {
        // Получаем услугу (стандартную или пользовательскую)
        let service = document.getElementById('editClientService').value;
        const customServiceInput = document.getElementById('editCustomService');
        const customService = customServiceInput ? customServiceInput.value : '';
        
        if (customServiceInput && customServiceInput.style.display !== 'none' && customService && customService.trim()) {
            service = customService.trim();
            // Добавляем пользовательскую услугу в список
            if (!customServices.includes(service)) {
                customServices.push(service);
            }
        }
        
        clients[clientIndex] = {
            ...clients[clientIndex],
            name: document.getElementById('editClientName').value,
            phone: document.getElementById('editClientPhone').value,
            telegram: document.getElementById('editClientTelegram').value,
            service: service,
            dateTime: document.getElementById('editAppointmentDateTime').value,
            price: parseInt(document.getElementById('editAppointmentPrice').value),
            status: document.getElementById('editClientStatus').value,
            source: document.getElementById('editClientSource').value,
            comments: document.getElementById('editClientComments').value,
            updatedAt: new Date().toISOString()
        };
        
        // Обновляем соответствующую запись
        const appointmentIndex = appointments.findIndex(a => a.clientId === clientId);
        if (appointmentIndex !== -1) {
            appointments[appointmentIndex] = {
                ...appointments[appointmentIndex],
                service: clients[clientIndex].service,
                dateTime: clients[clientIndex].dateTime,
                price: clients[clientIndex].price,
                updatedAt: new Date().toISOString()
            };
        }
        
        saveData();
        updateServiceSelects();
        closeAllModals();
        
        renderClients();
        renderAppointments();
        updateDashboard();
        
        showNotification('Клиент обновлен!', 'success');
        
        // Автоматическая синхронизация с ботом
        setTimeout(() => {
            syncWithBot();
        }, 1000);
    }
}

// Обработка добавления записи
function handleAddAppointment(e) {
    e.preventDefault();
    
    const appointmentData = {
        id: Date.now(),
        clientId: parseInt(document.getElementById('clientSelect').value),
        service: document.getElementById('serviceSelect').value,
        dateTime: document.getElementById('appointmentDateTime').value,
        price: parseInt(document.getElementById('appointmentPrice').value),
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    appointments.push(appointmentData);
    saveData();
    e.target.reset();
    
    switchTab('appointments');
    showNotification('Запись добавлена!', 'success');
}

// Отображение клиентов
function renderClients() {
    const container = document.getElementById('clientsList');
    
    if (clients.length === 0) {
        container.innerHTML = '<p style="text-align: center; opacity: 0.7; padding: 40px;">Нет клиентов</p>';
        return;
    }
    
    container.innerHTML = clients.map(client => {
        // Получаем статус клиента
        const statusLabels = {
            'new': '🆕 Новый',
            'regular': '⭐ Постоянный',
            'vip': '💎 VIP',
            'inactive': '😴 Неактивный'
        };
        
        // Получаем источник клиента
        const sourceLabels = {
            'telegram': '📱 Telegram',
            'instagram': '📸 Instagram',
            'recommendation': '👥 Рекомендация',
            'advertising': '📢 Реклама',
            'website': '🌐 Сайт',
            'other': '❓ Другое'
        };
        
        return `
            <div class="client-card">
                <div class="client-header">
                    <div class="client-name">
                        ${client.name}
                        <span class="client-status-badge" style="
                            background: ${client.status === 'vip' ? '#ffd700' : client.status === 'regular' ? '#28a745' : client.status === 'inactive' ? '#6c757d' : '#17a2b8'};
                            color: white;
                            padding: 4px 8px;
                            border-radius: 12px;
                            font-size: 11px;
                            font-weight: 500;
                            margin-left: 8px;
                        ">
                            ${statusLabels[client.status] || '🆕 Новый'}
                        </span>
                    </div>
                    <div class="client-actions">
                        <button class="btn-edit" onclick="editClient(${client.id})">✏️</button>
                        <button class="btn-delete" onclick="deleteClient(${client.id})">🗑️</button>
                    </div>
                </div>
                <div class="client-info">
                    <div class="info-item">
                        <div class="info-label">Телефон</div>
                        <div class="info-value">${client.phone || 'Не указан'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Telegram</div>
                        <div class="info-value">${client.telegram || 'Не указан'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Услуга</div>
                        <div class="info-value">${client.service}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Источник</div>
                        <div class="info-value">${sourceLabels[client.source] || '❓ Не указан'}</div>
                    </div>
                    ${client.comments ? `
                    <div class="info-item" style="grid-column: 1 / -1;">
                        <div class="info-label">Комментарии</div>
                        <div class="info-value" style="font-style: italic; color: #cccccc;">${client.comments}</div>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// Отображение записей
function renderAppointments() {
    const container = document.getElementById('appointmentsList');
    
    if (appointments.length === 0) {
        container.innerHTML = '<p style="text-align: center; opacity: 0.7; padding: 40px;">Нет записей</p>';
        return;
    }
    
    const sortedAppointments = appointments.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
    
    container.innerHTML = sortedAppointments.map(apt => {
        const client = clients.find(c => c.id === apt.clientId);
        const date = new Date(apt.dateTime);
        const isCompleted = apt.completed;
        
        return `
            <div class="appointment-card" style="border-left-color: ${isCompleted ? '#28a745' : '#ffc107'}">
                <div class="appointment-header">
                    <div class="appointment-service">${apt.service} ${isCompleted ? '✅' : '⏳'}</div>
                    <div class="appointment-actions">
                        <button class="btn-edit" onclick="toggleAppointment(${apt.id})">
                            ${isCompleted ? '↩️' : '✅'}
                        </button>
                        <button class="btn-delete" onclick="deleteAppointment(${apt.id})">🗑️</button>
                    </div>
                </div>
                <div class="appointment-info">
                    <div class="info-item">
                        <div class="info-label">Клиент</div>
                        <div class="info-value">${client ? client.name : 'Неизвестно'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Дата</div>
                        <div class="info-value">${date.toLocaleDateString('ru-RU')}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Время</div>
                        <div class="info-value">${date.toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'})}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Сумма</div>
                        <div class="info-value">${apt.price} ₽</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Редактирование клиента
function editClient(clientId) {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;
    
    document.getElementById('editClientId').value = client.id;
    document.getElementById('editClientName').value = client.name;
    document.getElementById('editClientPhone').value = client.phone || '';
    document.getElementById('editClientTelegram').value = client.telegram || '';
    document.getElementById('editClientService').value = client.service;
    document.getElementById('editAppointmentDateTime').value = client.dateTime;
    document.getElementById('editAppointmentPrice').value = client.price;
    document.getElementById('editClientStatus').value = client.status || 'new';
    document.getElementById('editClientSource').value = client.source || 'telegram';
    document.getElementById('editClientComments').value = client.comments || '';
    
    document.getElementById('editClientModal').classList.add('active');
}

// Удаление клиента
function deleteClient(clientId) {
    if (confirm('Вы уверены, что хотите удалить этого клиента?')) {
        clients = clients.filter(c => c.id !== clientId);
        appointments = appointments.filter(a => a.clientId !== clientId);
        
        saveData();
        renderClients();
        renderAppointments();
        updateDashboard();
        
        showNotification('Клиент удален!', 'success');
    }
}

// Удаление записи
function deleteAppointment(appointmentId) {
    if (confirm('Вы уверены, что хотите удалить эту запись?')) {
        appointments = appointments.filter(a => a.id !== appointmentId);
        
        saveData();
        renderAppointments();
        updateDashboard();
        
        showNotification('Запись удалена!', 'success');
    }
}

// Переключение статуса записи
function toggleAppointment(appointmentId) {
    const appointment = appointments.find(a => a.id === appointmentId);
    if (appointment) {
        appointment.completed = !appointment.completed;
        saveData();
        renderAppointments();
        updateDashboard();
        
        const status = appointment.completed ? 'выполнена' : 'не выполнена';
        showNotification(`Запись ${status}!`, 'success');
    }
}

// Фильтрация записей по дате
function filterAppointments() {
    const selectedDate = document.getElementById('appointmentDate').value;
    if (!selectedDate) {
        renderAppointments();
        return;
    }
    
    const filteredAppointments = appointments.filter(apt => 
        apt.dateTime.startsWith(selectedDate)
    );
    
    const container = document.getElementById('appointmentsList');
    
    if (filteredAppointments.length === 0) {
        container.innerHTML = '<p style="text-align: center; opacity: 0.7; padding: 40px;">Нет записей на эту дату</p>';
        return;
    }
    
    container.innerHTML = filteredAppointments.map(apt => {
        const client = clients.find(c => c.id === apt.clientId);
        const date = new Date(apt.dateTime);
        const isCompleted = apt.completed;
        
        return `
            <div class="appointment-card" style="border-left-color: ${isCompleted ? '#28a745' : '#ffc107'}">
                <div class="appointment-header">
                    <div class="appointment-service">${apt.service} ${isCompleted ? '✅' : '⏳'}</div>
                    <div class="appointment-actions">
                        <button class="btn-edit" onclick="toggleAppointment(${apt.id})">
                            ${isCompleted ? '↩️' : '✅'}
                        </button>
                        <button class="btn-delete" onclick="deleteAppointment(${apt.id})">🗑️</button>
                    </div>
                </div>
                <div class="appointment-info">
                    <div class="info-item">
                        <div class="info-label">Клиент</div>
                        <div class="info-value">${client ? client.name : 'Неизвестно'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Время</div>
                        <div class="info-value">${date.toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'})}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Сумма</div>
                        <div class="info-value">${apt.price} ₽</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Проверка предстоящих записей
function checkUpcomingAppointments() {
    const now = new Date();
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
    
    appointments.forEach(apt => {
        const aptDate = new Date(apt.dateTime);
        if (aptDate > now && aptDate <= oneHourFromNow && !apt.completed) {
            const client = clients.find(c => c.id === apt.clientId);
            if (client) {
                showNotification(`Напоминание: через час запись с ${client.name}`, 'warning');
            }
        }
    });
}

// Показ уведомлений
function showNotification(message, type = 'success') {
    // Удаляем предыдущие уведомления
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Добавляем иконку в зависимости от типа
    const icon = type === 'error' ? '❌' : type === 'warning' ? '⚠️' : '✅';
    notification.innerHTML = `${icon} ${message}`;
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Проверка напоминаний каждую минуту
setInterval(checkUpcomingAppointments, 60000);

// Инициализация при загрузке страницы
window.addEventListener('load', function() {
    // Проверяем, есть ли данные в localStorage
    if (!localStorage.getItem('businessUser')) {
        // Если нет, создаем базовые данные
        currentUser = {
            name: 'Пользователь',
            services: ['Маникюр', 'Страховое агентство', 'Аэродизайн', 'Тату салон']
        };
        saveData();
    }
});