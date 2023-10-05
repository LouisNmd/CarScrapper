import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

  private dayToString(day: number): string {
    switch (day) {
      case 1:
        return 'Lundi';
      case 2:
        return 'Mardi';
      case 3:
        return 'Mercredi';
      case 4:
        return 'Jeudi';
      case 5:
        return 'Vendredi';
      case 6:
        return 'Samedi';
      case 7:
        return 'Dimanche';
      default:
        throw new Error(`Date inconnue : ${day}`);
    }
  }

  private dateToString(date: number): string {
    return date < 10 ? `0${date}` : date.toString();
  }

  private monthToString(month: number): string {
    switch (month + 1) {
      case 1:
        return 'Janvier';
      case 2:
        return 'Février';
      case 3:
        return 'Mars';
      case 4:
        return 'Avril';
      case 5:
        return 'Mai';
      case 6:
        return 'Juin';
      case 7:
        return 'Juillet';
      case 8:
        return 'Août';
      case 9:
        return 'Septembre';
      case 10:
        return 'Octobre';
      case 11:
        return 'Novembre';
      case 12:
        return 'Décembre';
      default:
        throw new Error(`Mois inconnu : ${month + 1}`);
    }
  }

  private hoursToString(hours: number): string {
    return hours < 10 ? `0${hours}` : hours.toString();
  }

  private minutesToString(minutes: number): string {
    return minutes < 10 ? `0${minutes}` : minutes.toString();
  }

  public formatDate(date: Date): string {
    return `${this.dayToString(date.getDay())} ${this.dateToString(
      date.getDate()
    )} ${this.monthToString(date.getMonth())} ${date.getFullYear()}`;
  }

  public formatTime(time: Date): string {
    return `${this.hoursToString(time.getHours())}:${this.minutesToString(
      time.getMinutes()
    )}`;
  }
}
