export default class Clock {
    constructor(timeElementId, dateElementId) {
        this.timeElement = document.getElementById(timeElementId);
        this.dateElement = document.getElementById(dateElementId);
        this.updateTimeAndDate(); 
        setInterval(() => this.updateTimeAndDate(), 60000); 
    }

    updateTimeAndDate() {
        const now = new Date();

       
        const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false // 24-часовой формат
        });
        const timeString = timeFormatter.format(now);

        
        const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const dateString = dateFormatter.format(now);

       
        this.timeElement.innerText = timeString;
        this.dateElement.innerText = dateString;
    }
}

