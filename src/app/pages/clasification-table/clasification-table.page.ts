import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonSpinner
} from '@ionic/angular/standalone';
import { ClasificationService } from '../../services/clasification.service';
import { ILeague } from '../../models/league.model';
import { ISeason } from '../../models/season.model';
import { IClasification } from '../../models/clasification.model';

@Component({
  selector: 'app-clasification-table',
  templateUrl: './clasification-table.page.html',
  styleUrls: ['./clasification-table.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonSpinner,
    FormsModule
  ]
})
export class ClasificationTablePage implements OnInit {

  leagues: ILeague[] = [];
  seasons: ISeason[] = [];
  standings: IClasification[] = [];

  selectedLeagueId = '';
  selectedSeason = '';

  loadingLeagues = false;
  loadingSeasons = false;
  loadingTable = false;

  constructor(private clasificationService: ClasificationService) { }

  ngOnInit() {
    this.loadingLeagues = true;
    this.clasificationService.getFootballLeagues().subscribe(leagues => {
      this.leagues = leagues;
      this.loadingLeagues = false;
    });
  }

  onLeagueChange(idLeague: string) {
    this.selectedLeagueId = idLeague;
    this.selectedSeason = '';
    this.seasons = [];
    this.standings = [];

    if (!idLeague) {
      return;
    }

    this.loadingSeasons = true;
    this.clasificationService.getSeasons(idLeague).subscribe(seasons => {
      this.seasons = seasons;
      this.loadingSeasons = false;
    });
  }

  onSeasonChange(season: string) {
    this.selectedSeason = season;
    this.standings = [];

    if (!this.selectedLeagueId || !season) {
      return;
    }

    this.loadingTable = true;
    this.clasificationService.getTableClasification(this.selectedLeagueId, season).subscribe(standings => {
      this.standings = standings;
      this.loadingTable = false;
    });
  }

  getRowClass(description: string): string {
    if (!description) {
      return '';
    }
    const desc = description.toLowerCase();
    if (desc.includes('champions')) {
      return 'zone-champions';
    }
    if (desc.includes('europa') || desc.includes('libertadores') || desc.includes('sudamericana')) {
      return 'zone-europa';
    }
    if (desc.includes('relegation') || desc.includes('descenso')) {
      return 'zone-relegation';
    }
    return '';
  }

}
