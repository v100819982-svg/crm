/**
 * CRM MiniApp - Mobile Business Management Platform
 * 
 * This application provides a comprehensive CRM solution for micro-businesses
 * with features for client management, task tracking, invoicing, and SMS campaigns.
 * 
 * @version 1.0.0
 * @author CRM MiniApp Team
 */

// ===== APPLICATION CORE =====
class CRMMiniApp {
    constructor() {
        this.currentSection = 'dashboard';
        this.currentProfession = 'manicurist'; // По умолчанию маникюрщица
        this.userData = this.getUserDataFromURL(); // Получаем данные пользователя из URL
        this.data = {
            clients: [],
            tasks: [],
            invoices: [],
            smsCampaigns: [],
            settings: {}
        };
        
        // Данные для разных профессий
        this.professions = {
            manicurist: {
                name: 'Анна Петрова',
                role: 'Мастер маникюра',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
                services: [
                    { name: 'Классический маникюр', description: 'Выберите уровень сложности и начните сегодня!', levels: [1,2,3,4,5,6] },
                    { name: 'Покрытие гель-лаком', description: 'Долговременное покрытие для красивых ногтей', levels: [1,2,3,4,5,6] },
                    { name: 'Дизайн ногтей', description: 'Уникальные дизайны для особых случаев', levels: [1,2,3,4,5,6] }
                ],
                progress: [
                    { name: 'Маникюр', percentage: 64, icon: 'check-circle' },
                    { name: 'Педикюр', percentage: 91, icon: 'trending-up' },
                    { name: 'Дизайн', percentage: 70, icon: 'palette' }
                ]
            },
            masseur: {
                name: 'Мария Сидорова',
                role: 'Массажист',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
                services: [
                    { name: 'Классический массаж', description: 'Расслабляющий массаж для снятия напряжения', levels: [1,2,3,4,5,6] },
                    { name: 'Спортивный массаж', description: 'Массаж для спортсменов и активных людей', levels: [1,2,3,4,5,6] },
                    { name: 'Антицеллюлитный массаж', description: 'Специализированный массаж для коррекции фигуры', levels: [1,2,3,4,5,6] }
                ],
                progress: [
                    { name: 'Классический', percentage: 78, icon: 'check-circle' },
                    { name: 'Спортивный', percentage: 65, icon: 'trending-up' },
                    { name: 'Антицеллюлитный', percentage: 82, icon: 'palette' }
                ]
            },
            hairdresser: {
                name: 'Елена Козлова',
                role: 'Парикмахер',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
                services: [
                    { name: 'Стрижка', description: 'Современные стрижки для любого типа волос', levels: [1,2,3,4,5,6] },
                    { name: 'Окрашивание', description: 'Профессиональное окрашивание волос', levels: [1,2,3,4,5,6] },
                    { name: 'Укладка', description: 'Стильные укладки для особых случаев', levels: [1,2,3,4,5,6] }
                ],
                progress: [
                    { name: 'Стрижка', percentage: 88, icon: 'check-circle' },
                    { name: 'Окрашивание', percentage: 72, icon: 'trending-up' },
                    { name: 'Укладка', percentage: 91, icon: 'palette' }
                ]
            },
            cosmetologist: {
                name: 'Ольга Иванова',
                role: 'Косметолог',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
                services: [
                    { name: 'Чистка лица', description: 'Профессиональная чистка и уход за кожей', levels: [1,2,3,4,5,6] },
                    { name: 'Пилинг', description: 'Глубокий пилинг для обновления кожи', levels: [1,2,3,4,5,6] },
                    { name: 'Массаж лица', description: 'Омолаживающий массаж лица', levels: [1,2,3,4,5,6] }
                ],
                progress: [
                    { name: 'Чистка', percentage: 85, icon: 'check-circle' },
                    { name: 'Пилинг', percentage: 68, icon: 'trending-up' },
                    { name: 'Массаж лица', percentage: 76, icon: 'palette' }
                ]
            },
            insurance_agent: {
                name: 'Дмитрий Смирнов',
                role: 'Страховой агент',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
                services: [
                    { name: 'Продажа полисов', description: 'Консультации и продажа страховых продуктов', levels: [1,2,3,4,5,6] },
                    { name: 'Консультации', description: 'Профессиональные консультации по страхованию', levels: [1,2,3,4,5,6] },
                    { name: 'Оформление документов', description: 'Подготовка и оформление страховых документов', levels: [1,2,3,4,5,6] }
                ],
                progress: [
                    { name: 'Продажи', percentage: 78, icon: 'check-circle' },
                    { name: 'Консультации', percentage: 85, icon: 'trending-up' },
                    { name: 'Документооборот', percentage: 72, icon: 'palette' }
                ]
            },
            business_consultant: {
                name: 'Александр Козлов',
                role: 'Бизнес-консультант',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
                services: [
                    { name: 'Анализ бизнеса', description: 'Комплексный анализ бизнес-процессов', levels: [1,2,3,4,5,6] },
                    { name: 'Стратегическое планирование', description: 'Разработка стратегии развития компании', levels: [1,2,3,4,5,6] },
                    { name: 'Оптимизация процессов', description: 'Улучшение операционных процессов', levels: [1,2,3,4,5,6] }
                ],
                progress: [
                    { name: 'Анализ', percentage: 88, icon: 'check-circle' },
                    { name: 'Планирование', percentage: 75, icon: 'trending-up' },
                    { name: 'Оптимизация', percentage: 82, icon: 'palette' }
                ]
            },
            tutor: {
                name: 'Елена Морозова',
                role: 'Репетитор',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
                services: [
                    { name: 'Индивидуальные уроки', description: 'Персональные занятия с учениками', levels: [1,2,3,4,5,6] },
                    { name: 'Подготовка к экзаменам', description: 'Специализированная подготовка к ЕГЭ и ОГЭ', levels: [1,2,3,4,5,6] },
                    { name: 'Домашние задания', description: 'Помощь с выполнением домашних заданий', levels: [1,2,3,4,5,6] }
                ],
                progress: [
                    { name: 'Индивидуальные уроки', percentage: 92, icon: 'check-circle' },
                    { name: 'Подготовка к экзаменам', percentage: 85, icon: 'trending-up' },
                    { name: 'Домашние задания', percentage: 78, icon: 'palette' }
                ]
            }
        };
        
        this.init();
    }

    /**
     * Получение данных пользователя из URL параметров
     */
    getUserDataFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('user_id');
        const industry = urlParams.get('industry');
        
        return {
            userId: userId,
            industry: industry,
            isFromBot: !!(userId && industry)
        };
    }

    /**
     * Initialize the application
     */
    async init() {
        try {
            // Show loading screen
            this.showLoadingScreen();
            
            // Определяем профессию на основе данных пользователя
            this.determineProfession();
            
            // Load data from localStorage
            await this.loadData();
            
            // Initialize UI components
            this.initializeUI();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Update dashboard
            this.updateDashboard();
            
            // Hide loading screen
            setTimeout(() => {
                this.hideLoadingScreen();
            }, 1000);
            
        } catch (error) {
            console.error('Error initializing app:', error);
            this.showToast('Ошибка инициализации приложения', 'error');
        }
    }

    /**
     * Определение профессии на основе сферы деятельности
     */
    determineProfession() {
        if (this.userData.isFromBot) {
            const industryMapping = {
                'beauty': 'manicurist', // По умолчанию маникюрщица для бьюти
                'insurance': 'insurance_agent',
                'consulting': 'business_consultant',
                'education': 'tutor'
            };
            
            this.currentProfession = industryMapping[this.userData.industry] || 'manicurist';
            
            // Обновляем данные профиля на основе информации от бота
            this.updateProfileFromBotData();
        }
    }

    /**
     * Обновление профиля на основе данных от бота
     */
    updateProfileFromBotData() {
        // Обновляем заголовок приложения
        const appTitle = document.querySelector('.app-title');
        if (appTitle && this.userData.isFromBot) {
            const industryNames = {
                'beauty': 'Бьюти-процедуры',
                'insurance': 'Страхование',
                'consulting': 'Консалтинг',
                'education': 'Образование'
            };
            
            const industryName = industryNames[this.userData.industry] || 'Бизнес';
            appTitle.textContent = `CRM MiniApp - ${industryName}`;
        }
        
        // Скрываем переключатель профессий для пользователей из бота
        const professionSwitcher = document.querySelector('.profession-switcher');
        if (professionSwitcher && this.userData.isFromBot) {
            professionSwitcher.style.display = 'none';
        }
    }

    /**
     * Show loading screen
     */
    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');
        }
    }

    /**
     * Hide loading screen
     */
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }

    /**
     * Load data from localStorage
     */
    async loadData() {
        try {
            const savedData = localStorage.getItem('crm-data');
            if (savedData) {
                this.data = { ...this.data, ...JSON.parse(savedData) };
            } else {
                // Initialize with sample data for demo
                this.initializeSampleData();
            }
        } catch (error) {
            console.error('Error loading data:', error);
            this.initializeSampleData();
        }
    }

    /**
     * Save data to localStorage
     */
    saveData() {
        try {
            localStorage.setItem('crm-data', JSON.stringify(this.data));
        } catch (error) {
            console.error('Error saving data:', error);
            this.showToast('Ошибка сохранения данных', 'error');
        }
    }

    /**
     * Initialize sample data for demo
     */
    initializeSampleData() {
        this.data.clients = [
            {
                id: '1',
                name: 'Иван Петров',
                phone: '+7 (999) 123-45-67',
                email: 'ivan@example.com',
                company: 'ООО "Технологии"',
                notes: 'Постоянный клиент, предпочитает утренние встречи',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: '2',
                name: 'Мария Сидорова',
                phone: '+7 (999) 234-56-78',
                email: 'maria@example.com',
                company: 'ИП Сидорова',
                notes: 'Заинтересована в долгосрочном сотрудничестве',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        ];

        this.data.tasks = [
            {
                id: '1',
                title: 'Подготовить презентацию',
                description: 'Создать презентацию для встречи с клиентом',
                clientId: '1',
                dueDate: new Date(Date.now() + 86400000).toISOString(),
                priority: 'high',
                status: 'pending',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: '2',
                title: 'Отправить коммерческое предложение',
                description: 'Подготовить и отправить КП Марии Сидоровой',
                clientId: '2',
                dueDate: new Date(Date.now() + 172800000).toISOString(),
                priority: 'medium',
                status: 'pending',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        ];

        this.data.invoices = [
            {
                id: '1',
                clientId: '1',
                amount: 50000,
                description: 'Разработка веб-сайта',
                dueDate: new Date(Date.now() + 259200000).toISOString(),
                status: 'pending',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        ];

        this.data.smsCampaigns = [
            {
                id: '1',
                title: 'Новогодняя акция',
                message: 'С Новым годом! Скидка 20% на все услуги до конца января.',
                recipients: ['1', '2'],
                status: 'sent',
                createdAt: new Date().toISOString()
            }
        ];

        this.saveData();
    }

    /**
     * Initialize UI components
     */
    initializeUI() {
        // Update all sections
        this.updateClientsList();
        this.updateTasksList();
        this.updateInvoicesList();
        this.updateSMSCampaignsList();
        this.updateRecentActivity();
        
        // Populate client selects in forms
        this.populateClientSelects();
    }

    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.navigateTo(section);
            });
        });

        // Add buttons
        document.getElementById('add-client-btn')?.addEventListener('click', () => {
            this.openModal('client-modal');
        });

        document.getElementById('add-task-btn')?.addEventListener('click', () => {
            this.openModal('task-modal');
        });

        document.getElementById('add-invoice-btn')?.addEventListener('click', () => {
            this.openModal('invoice-modal');
        });

        document.getElementById('create-sms-btn')?.addEventListener('click', () => {
            this.openModal('sms-modal');
        });

        // Form submissions
        document.getElementById('client-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleClientSubmit();
        });

        document.getElementById('task-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleTaskSubmit();
        });

        document.getElementById('invoice-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleInvoiceSubmit();
        });

        document.getElementById('sms-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSMSSubmit();
        });

        // Search functionality
        document.getElementById('client-search')?.addEventListener('input', (e) => {
            this.filterClients(e.target.value);
        });

        // Task filters
        document.querySelectorAll('.task-filters .filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterTasks(e.target.dataset.filter);
            });
        });

        // Invoice filters
        document.querySelectorAll('.invoice-filters .filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterInvoices(e.target.dataset.filter);
            });
        });

        // SMS character counter
        document.getElementById('sms-message')?.addEventListener('input', (e) => {
            this.updateCharCount(e.target);
        });

        // Select all clients checkbox
        document.getElementById('select-all-clients')?.addEventListener('change', (e) => {
            this.toggleAllClients(e.target.checked);
        });

        // Settings button
        document.getElementById('settings-btn')?.addEventListener('click', () => {
            this.showToast('Настройки будут доступны в следующей версии', 'info');
        });

        // Notification button
        document.getElementById('notification-btn')?.addEventListener('click', () => {
            this.showToast('Уведомления будут доступны в следующей версии', 'info');
        });

        // Profession switcher
        document.querySelectorAll('.profession-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const profession = e.currentTarget.dataset.profession;
                this.switchProfession(profession);
                
                // Update active state
                document.querySelectorAll('.profession-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
            });
        });
    }

    /**
     * Navigate to a specific section
     */
    navigateTo(section) {
        // Update current section
        this.currentSection = section;

        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`)?.classList.add('active');

        // Show/hide sections
        document.querySelectorAll('.section').forEach(sec => {
            sec.classList.remove('active');
        });
        document.getElementById(`${section}-section`)?.classList.add('active');
    }

    /**
     * Open modal
     */
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    /**
     * Close modal
     */
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset form if exists
            const form = modal.querySelector('form');
            if (form) {
                form.reset();
            }
        }
    }

    /**
     * Show toast notification
     */
    showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = this.getToastIcon(type);
        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-message">${message}</div>
            <button class="toast-close" onclick="this.parentElement.remove()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        `;

        toastContainer.appendChild(toast);

        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, 300);
        }, 5000);
    }

    /**
     * Get toast icon based on type
     */
    getToastIcon(type) {
        const icons = {
            success: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22,4 12,14.01 9,11.01"></polyline>
            </svg>`,
            error: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>`,
            warning: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>`,
            info: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>`
        };
        return icons[type] || icons.info;
    }

    /**
     * Update dashboard statistics
     */
    updateDashboard() {
        this.updateProfile();
        this.updatePopularServices();
        this.updateProgress();
        this.updateStatistics();
    }

    /**
     * Update profile section
     */
    updateProfile() {
        const profession = this.professions[this.currentProfession];
        
        // Update profile info
        document.getElementById('profile-name').textContent = profession.name;
        document.getElementById('profile-role').textContent = profession.role;
        document.getElementById('profile-image').src = profession.avatar;
        
        // Update profile stats (randomized for demo)
        document.getElementById('profile-clients').textContent = Math.floor(Math.random() * 5000 + 1000) + 'k';
        document.getElementById('profile-appointments').textContent = Math.floor(Math.random() * 50 + 10);
        document.getElementById('profile-rating').textContent = (Math.random() * 0.5 + 4.5).toFixed(1);
        
        // Update key metrics
        document.getElementById('completed-services').textContent = Math.floor(Math.random() * 50 + 10);
        document.getElementById('satisfaction-rate').textContent = Math.floor(Math.random() * 20 + 80) + '%';
    }

    /**
     * Update popular services section
     */
    updatePopularServices() {
        const profession = this.professions[this.currentProfession];
        const servicesContainer = document.querySelector('.popular-services');
        
        if (!servicesContainer) return;
        
        const servicesHTML = profession.services.map((service, index) => `
            <div class="service-card ${index === 0 ? 'featured' : ''}">
                <div class="service-header">
                    <div class="service-info">
                        <h4>${service.name}</h4>
                        <p>${service.description}</p>
                    </div>
                    <button class="expand-btn ${index !== 0 ? 'collapsed' : ''}">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="6,9 12,15 18,9"></polyline>
                        </svg>
                    </button>
                </div>
                ${index === 0 ? `
                    <div class="service-levels">
                        <p class="levels-label">Уровни:</p>
                        <div class="levels-container">
                            ${service.levels.map((level, levelIndex) => `
                                <div class="level-btn ${levelIndex < 4 ? 'completed' : ''}">${String(level).padStart(2, '0')}</div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `).join('');
        
        servicesContainer.innerHTML = `
            <div class="section-header">
                <h3>Популярные услуги</h3>
                <button class="see-all-btn">Смотреть все ></button>
            </div>
            ${servicesHTML}
        `;
    }

    /**
     * Update progress section
     */
    updateProgress() {
        const profession = this.professions[this.currentProfession];
        const progressContainer = document.querySelector('.progress-section');
        
        if (!progressContainer) return;
        
        const progressHTML = profession.progress.map((item, index) => `
            <div class="progress-card">
                <div class="progress-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        ${this.getProgressIcon(item.icon)}
                    </svg>
                </div>
                <div class="progress-content">
                    <h4>${item.name}</h4>
                    <div class="progress-percentage">${item.percentage}%</div>
                </div>
            </div>
        `).join('');
        
        progressContainer.innerHTML = `
            <div class="section-header">
                <h3>Прогресс</h3>
                <button class="details-btn">Детали ></button>
            </div>
            <div class="progress-cards">
                ${progressHTML}
            </div>
        `;
    }

    /**
     * Update statistics section
     */
    updateStatistics() {
        // Update chart data (randomized for demo)
        const chartData = Array.from({length: 6}, () => Math.floor(Math.random() * 400 + 100));
        const maxValue = Math.max(...chartData);
        const maxIndex = chartData.indexOf(maxValue);
        
        // Update chart bars
        const chartBars = document.querySelectorAll('.chart-bar');
        chartBars.forEach((bar, index) => {
            const value = chartData[index];
            const percentage = (value / 500) * 100;
            
            bar.querySelector('.bar-fill').style.height = percentage + '%';
            bar.querySelector('.bar-value').textContent = value;
            
            // Remove previous highest class
            bar.classList.remove('highest');
            if (index === maxIndex) {
                bar.classList.add('highest');
            }
        });
        
        // Update summary stats
        document.querySelector('.summary-stats .stat-number').textContent = Math.floor(Math.random() * 5000 + 5000) + 'k+';
        document.querySelectorAll('.summary-stats .stat-number')[1].textContent = Math.floor(Math.random() * 10 + 90) + '%';
        document.querySelectorAll('.summary-stats .stat-number')[2].textContent = Math.floor(Math.random() * 15 + 85) + '%';
    }

    /**
     * Get progress icon SVG path
     */
    getProgressIcon(iconType) {
        const icons = {
            'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22,4 12,14.01 9,11.01"></polyline>',
            'trending-up': '<path d="M23 6l-9.5 9.5-5-5L1 18"></path><path d="M17 6h6v6"></path>',
            'palette': '<circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>'
        };
        return icons[iconType] || icons['check-circle'];
    }

    /**
     * Switch profession
     */
    switchProfession(profession) {
        this.currentProfession = profession;
        this.updateDashboard();
        this.showToast(`Переключено на ${this.professions[profession].role.toLowerCase()}`, 'success');
    }

    /**
     * Update recent activity list
     */
    updateRecentActivity() {
        const recentList = document.getElementById('recent-list');
        if (!recentList) return;

        // Combine all activities and sort by date
        const activities = [
            ...this.data.clients.map(client => ({
                type: 'client',
                title: `Добавлен клиент: ${client.name}`,
                time: client.createdAt,
                icon: 'users'
            })),
            ...this.data.tasks.map(task => ({
                type: 'task',
                title: task.status === 'completed' ? `Выполнена задача: ${task.title}` : `Создана задача: ${task.title}`,
                time: task.updatedAt,
                icon: 'check-circle'
            })),
            ...this.data.invoices.map(invoice => ({
                type: 'invoice',
                title: invoice.status === 'paid' ? `Оплачен счет на ${invoice.amount} ₽` : `Выставлен счет на ${invoice.amount} ₽`,
                time: invoice.updatedAt,
                icon: 'credit-card'
            }))
        ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 5);

        recentList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        ${this.getActivityIcon(activity.icon)}
                    </svg>
                </div>
                <div class="activity-content">
                    <div class="activity-title">${activity.title}</div>
                    <div class="activity-time">${this.formatDate(activity.time)}</div>
                </div>
            </div>
        `).join('');
    }

    /**
     * Get activity icon SVG path
     */
    getActivityIcon(iconType) {
        const icons = {
            users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
            'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22,4 12,14.01 9,11.01"></polyline>',
            'credit-card': '<rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line>'
        };
        return icons[iconType] || icons.users;
    }

    /**
     * Format date for display
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            return 'Вчера';
        } else if (diffDays < 7) {
            return `${diffDays} дней назад`;
        } else {
            return date.toLocaleDateString('ru-RU');
        }
    }

    /**
     * Update clients list
     */
    updateClientsList() {
        const clientsList = document.getElementById('clients-list');
        if (!clientsList) return;

        if (this.data.clients.length === 0) {
            clientsList.innerHTML = `
                <div class="empty-state">
                    <div class="placeholder-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                    </div>
                    <h3>Нет клиентов</h3>
                    <p>Добавьте первого клиента, чтобы начать работу</p>
                </div>
            `;
            return;
        }

        clientsList.innerHTML = this.data.clients.map(client => `
            <div class="client-card">
                <div class="client-header">
                    <div class="client-info">
                        <h3>${client.name}</h3>
                        <p>${client.company || 'Без компании'}</p>
                    </div>
                    <div class="client-actions">
                        <button onclick="app.editClient('${client.id}')" title="Редактировать">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                        <button onclick="app.deleteClient('${client.id}')" title="Удалить">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3,6 5,6 21,6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="client-details">
                    <div class="detail-item">
                        <span class="detail-label">Телефон</span>
                        <span class="detail-value">${client.phone}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Email</span>
                        <span class="detail-value">${client.email || 'Не указан'}</span>
                    </div>
                    ${client.notes ? `
                        <div class="detail-item">
                            <span class="detail-label">Заметки</span>
                            <span class="detail-value">${client.notes}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    /**
     * Update tasks list
     */
    updateTasksList() {
        const tasksList = document.getElementById('tasks-list');
        if (!tasksList) return;

        if (this.data.tasks.length === 0) {
            tasksList.innerHTML = `
                <div class="empty-state">
                    <div class="placeholder-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 11l3 3L22 4"></path>
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                    </div>
                    <h3>Нет задач</h3>
                    <p>Создайте первую задачу, чтобы начать работу</p>
                </div>
            `;
            return;
        }

        tasksList.innerHTML = this.data.tasks.map(task => {
            const client = this.data.clients.find(c => c.id === task.clientId);
            return `
                <div class="task-item">
                    <div class="task-header">
                        <div>
                            <h3 class="task-title">${task.title}</h3>
                            <p class="task-description">${task.description || ''}</p>
                        </div>
                        <span class="task-status ${task.status}">
                            ${task.status === 'pending' ? 'В работе' : 'Выполнено'}
                        </span>
                    </div>
                    <div class="task-meta">
                        <div>
                            <span class="task-priority ${task.priority}">
                                ${task.priority === 'high' ? 'Высокий' : task.priority === 'medium' ? 'Средний' : 'Низкий'}
                            </span>
                            ${task.dueDate ? `<span class="task-due-date">Срок: ${this.formatDate(task.dueDate)}</span>` : ''}
                        </div>
                        <div class="task-actions">
                            ${task.status === 'pending' ? `
                                <button onclick="app.completeTask('${task.id}')" class="btn btn-primary">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                        <polyline points="22,4 12,14.01 9,11.01"></polyline>
                                    </svg>
                                    Выполнить
                                </button>
                            ` : ''}
                            <button onclick="app.editTask('${task.id}')" class="btn btn-secondary">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                                Редактировать
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * Update invoices list
     */
    updateInvoicesList() {
        const invoicesList = document.getElementById('invoices-list');
        if (!invoicesList) return;

        if (this.data.invoices.length === 0) {
            invoicesList.innerHTML = `
                <div class="empty-state">
                    <div class="placeholder-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                            <line x1="8" y1="21" x2="16" y2="21"></line>
                            <line x1="12" y1="17" x2="12" y2="21"></line>
                        </svg>
                    </div>
                    <h3>Нет счетов</h3>
                    <p>Выставьте первый счет, чтобы начать работу</p>
                </div>
            `;
            return;
        }

        invoicesList.innerHTML = this.data.invoices.map(invoice => {
            const client = this.data.clients.find(c => c.id === invoice.clientId);
            return `
                <div class="invoice-item">
                    <div class="invoice-header">
                        <div>
                            <h3 class="invoice-client">${client ? client.name : 'Неизвестный клиент'}</h3>
                            <p>${invoice.description || ''}</p>
                        </div>
                        <div>
                            <div class="invoice-amount">${invoice.amount.toLocaleString()} ₽</div>
                            <span class="invoice-status ${invoice.status}">
                                ${invoice.status === 'pending' ? 'Ожидает оплаты' : 'Оплачен'}
                            </span>
                        </div>
                    </div>
                    <div class="invoice-meta">
                        <span class="invoice-due-date">
                            Срок оплаты: ${invoice.dueDate ? this.formatDate(invoice.dueDate) : 'Не указан'}
                        </span>
                        <div class="invoice-actions">
                            ${invoice.status === 'pending' ? `
                                <button onclick="app.markInvoicePaid('${invoice.id}')" class="mark-paid">
                                    Отметить как оплаченный
                                </button>
                            ` : ''}
                            <button onclick="app.editInvoice('${invoice.id}')" class="edit">
                                Редактировать
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * Update SMS campaigns list
     */
    updateSMSCampaignsList() {
        const smsList = document.getElementById('sms-campaigns-list');
        if (!smsList) return;

        if (this.data.smsCampaigns.length === 0) {
            smsList.innerHTML = `
                <div class="empty-state">
                    <div class="placeholder-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </div>
                    <h3>Нет рассылок</h3>
                    <p>Создайте первую SMS рассылку для ваших клиентов</p>
                </div>
            `;
            return;
        }

        smsList.innerHTML = this.data.smsCampaigns.map(campaign => `
            <div class="sms-item">
                <div class="sms-header">
                    <h3>${campaign.title}</h3>
                    <span class="sms-status ${campaign.status}">
                        ${campaign.status === 'sent' ? 'Отправлена' : 'Черновик'}
                    </span>
                </div>
                <p class="sms-message">${campaign.message}</p>
                <div class="sms-meta">
                    <span>Получателей: ${campaign.recipients.length}</span>
                    <span>Создана: ${this.formatDate(campaign.createdAt)}</span>
                </div>
            </div>
        `).join('');
    }

    /**
     * Populate client selects in forms
     */
    populateClientSelects() {
        const selects = document.querySelectorAll('#task-client, #invoice-client');
        selects.forEach(select => {
            select.innerHTML = '<option value="">Выберите клиента</option>' +
                this.data.clients.map(client => 
                    `<option value="${client.id}">${client.name}</option>`
                ).join('');
        });

        // Populate SMS client checkboxes
        const checkboxesContainer = document.getElementById('clients-checkboxes');
        if (checkboxesContainer) {
            checkboxesContainer.innerHTML = this.data.clients.map(client => `
                <label class="checkbox-label">
                    <input type="checkbox" name="sms-clients" value="${client.id}">
                    <span>${client.name}</span>
                </label>
            `).join('');
        }
    }

    /**
     * Filter clients based on search query
     */
    filterClients(query) {
        const clientsList = document.getElementById('clients-list');
        if (!clientsList) return;

        const filteredClients = this.data.clients.filter(client =>
            client.name.toLowerCase().includes(query.toLowerCase()) ||
            client.company?.toLowerCase().includes(query.toLowerCase()) ||
            client.phone.includes(query) ||
            client.email?.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredClients.length === 0) {
            clientsList.innerHTML = `
                <div class="empty-state">
                    <h3>Клиенты не найдены</h3>
                    <p>Попробуйте изменить поисковый запрос</p>
                </div>
            `;
            return;
        }

        // Update the list with filtered results
        clientsList.innerHTML = filteredClients.map(client => `
            <div class="client-card">
                <div class="client-header">
                    <div class="client-info">
                        <h3>${client.name}</h3>
                        <p>${client.company || 'Без компании'}</p>
                    </div>
                    <div class="client-actions">
                        <button onclick="app.editClient('${client.id}')" title="Редактировать">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                        <button onclick="app.deleteClient('${client.id}')" title="Удалить">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3,6 5,6 21,6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="client-details">
                    <div class="detail-item">
                        <span class="detail-label">Телефон</span>
                        <span class="detail-value">${client.phone}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Email</span>
                        <span class="detail-value">${client.email || 'Не указан'}</span>
                    </div>
                    ${client.notes ? `
                        <div class="detail-item">
                            <span class="detail-label">Заметки</span>
                            <span class="detail-value">${client.notes}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    /**
     * Filter tasks based on status
     */
    filterTasks(filter) {
        // Update filter buttons
        document.querySelectorAll('.task-filters .filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`)?.classList.add('active');

        // Filter and update tasks list
        let filteredTasks = this.data.tasks;
        if (filter !== 'all') {
            filteredTasks = this.data.tasks.filter(task => task.status === filter);
        }

        // Update the display (simplified for demo)
        this.updateTasksList();
    }

    /**
     * Filter invoices based on status
     */
    filterInvoices(filter) {
        // Update filter buttons
        document.querySelectorAll('.invoice-filters .filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`)?.classList.add('active');

        // Filter and update invoices list
        let filteredInvoices = this.data.invoices;
        if (filter !== 'all') {
            filteredInvoices = this.data.invoices.filter(invoice => invoice.status === filter);
        }

        // Update the display (simplified for demo)
        this.updateInvoicesList();
    }

    /**
     * Update character count for SMS message
     */
    updateCharCount(textarea) {
        const charCount = document.querySelector('.char-count');
        if (charCount) {
            charCount.textContent = `${textarea.value.length}/160 символов`;
        }
    }

    /**
     * Toggle all clients selection for SMS
     */
    toggleAllClients(checked) {
        const checkboxes = document.querySelectorAll('input[name="sms-clients"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = checked;
        });
    }

    // ===== FORM HANDLERS =====

    /**
     * Handle client form submission
     */
    handleClientSubmit() {
        const form = document.getElementById('client-form');
        const formData = new FormData(form);
        
        const clientData = {
            id: Date.now().toString(),
            name: document.getElementById('client-name').value,
            phone: document.getElementById('client-phone').value,
            email: document.getElementById('client-email').value,
            company: document.getElementById('client-company').value,
            notes: document.getElementById('client-notes').value,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Add client to data
        this.data.clients.push(clientData);
        this.saveData();

        // Update UI
        this.updateClientsList();
        this.updateDashboard();
        this.updateRecentActivity();
        this.populateClientSelects();

        // Close modal and show success message
        this.closeModal('client-modal');
        this.showToast('Клиент успешно добавлен', 'success');
    }

    /**
     * Handle task form submission
     */
    handleTaskSubmit() {
        const taskData = {
            id: Date.now().toString(),
            title: document.getElementById('task-title').value,
            description: document.getElementById('task-description').value,
            clientId: document.getElementById('task-client').value,
            dueDate: document.getElementById('task-due-date').value ? new Date(document.getElementById('task-due-date').value).toISOString() : null,
            priority: document.getElementById('task-priority').value,
            status: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Add task to data
        this.data.tasks.push(taskData);
        this.saveData();

        // Update UI
        this.updateTasksList();
        this.updateDashboard();
        this.updateRecentActivity();

        // Close modal and show success message
        this.closeModal('task-modal');
        this.showToast('Задача успешно создана', 'success');
    }

    /**
     * Handle invoice form submission
     */
    handleInvoiceSubmit() {
        const invoiceData = {
            id: Date.now().toString(),
            clientId: document.getElementById('invoice-client').value,
            amount: parseFloat(document.getElementById('invoice-amount').value),
            description: document.getElementById('invoice-description').value,
            dueDate: document.getElementById('invoice-due-date').value ? new Date(document.getElementById('invoice-due-date').value).toISOString() : null,
            status: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Add invoice to data
        this.data.invoices.push(invoiceData);
        this.saveData();

        // Update UI
        this.updateInvoicesList();
        this.updateDashboard();
        this.updateRecentActivity();

        // Close modal and show success message
        this.closeModal('invoice-modal');
        this.showToast('Счет успешно создан', 'success');
    }

    /**
     * Handle SMS form submission
     */
    handleSMSSubmit() {
        const selectedClients = Array.from(document.querySelectorAll('input[name="sms-clients"]:checked'))
            .map(checkbox => checkbox.value);

        if (selectedClients.length === 0) {
            this.showToast('Выберите хотя бы одного получателя', 'warning');
            return;
        }

        const smsData = {
            id: Date.now().toString(),
            title: document.getElementById('sms-title').value,
            message: document.getElementById('sms-message').value,
            recipients: selectedClients,
            status: 'sent',
            createdAt: new Date().toISOString()
        };

        // Add SMS campaign to data
        this.data.smsCampaigns.push(smsData);
        this.saveData();

        // Update UI
        this.updateSMSCampaignsList();
        this.updateRecentActivity();

        // Close modal and show success message
        this.closeModal('sms-modal');
        this.showToast(`SMS рассылка отправлена ${selectedClients.length} получателям`, 'success');
    }

    // ===== CRUD OPERATIONS =====

    /**
     * Edit client
     */
    editClient(clientId) {
        const client = this.data.clients.find(c => c.id === clientId);
        if (!client) return;

        // Populate form with client data
        document.getElementById('client-name').value = client.name;
        document.getElementById('client-phone').value = client.phone;
        document.getElementById('client-email').value = client.email || '';
        document.getElementById('client-company').value = client.company || '';
        document.getElementById('client-notes').value = client.notes || '';

        // Update modal title
        document.getElementById('client-modal-title').textContent = 'Редактировать клиента';

        // Open modal
        this.openModal('client-modal');

        // Store editing state
        this.editingClientId = clientId;
    }

    /**
     * Delete client
     */
    deleteClient(clientId) {
        if (confirm('Вы уверены, что хотите удалить этого клиента?')) {
            this.data.clients = this.data.clients.filter(c => c.id !== clientId);
            this.saveData();

            this.updateClientsList();
            this.updateDashboard();
            this.updateRecentActivity();
            this.populateClientSelects();

            this.showToast('Клиент удален', 'success');
        }
    }

    /**
     * Complete task
     */
    completeTask(taskId) {
        const task = this.data.tasks.find(t => t.id === taskId);
        if (task) {
            task.status = 'completed';
            task.updatedAt = new Date().toISOString();
            this.saveData();

            this.updateTasksList();
            this.updateDashboard();
            this.updateRecentActivity();

            this.showToast('Задача выполнена', 'success');
        }
    }

    /**
     * Edit task
     */
    editTask(taskId) {
        const task = this.data.tasks.find(t => t.id === taskId);
        if (!task) return;

        // Populate form with task data
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-description').value = task.description || '';
        document.getElementById('task-client').value = task.clientId || '';
        document.getElementById('task-due-date').value = task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : '';
        document.getElementById('task-priority').value = task.priority;

        // Update modal title
        document.getElementById('task-modal-title').textContent = 'Редактировать задачу';

        // Open modal
        this.openModal('task-modal');

        // Store editing state
        this.editingTaskId = taskId;
    }

    /**
     * Mark invoice as paid
     */
    markInvoicePaid(invoiceId) {
        const invoice = this.data.invoices.find(i => i.id === invoiceId);
        if (invoice) {
            invoice.status = 'paid';
            invoice.updatedAt = new Date().toISOString();
            this.saveData();

            this.updateInvoicesList();
            this.updateDashboard();
            this.updateRecentActivity();

            this.showToast('Счет отмечен как оплаченный', 'success');
        }
    }

    /**
     * Edit invoice
     */
    editInvoice(invoiceId) {
        const invoice = this.data.invoices.find(i => i.id === invoiceId);
        if (!invoice) return;

        // Populate form with invoice data
        document.getElementById('invoice-client').value = invoice.clientId || '';
        document.getElementById('invoice-amount').value = invoice.amount;
        document.getElementById('invoice-description').value = invoice.description || '';
        document.getElementById('invoice-due-date').value = invoice.dueDate ? new Date(invoice.dueDate).toISOString().slice(0, 10) : '';

        // Update modal title
        document.getElementById('invoice-modal-title').textContent = 'Редактировать счет';

        // Open modal
        this.openModal('invoice-modal');

        // Store editing state
        this.editingInvoiceId = invoiceId;
    }
}

// ===== INITIALIZE APPLICATION =====
let app;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    app = new CRMMiniApp();
});

// Export for global access
window.app = app;
