import { Component, OnInit } from '@angular/core';
import { FavorisService } from '../../Services/favoris.service'; // Adjust the path
import { AnnouncementCollocation } from "../../entity/AnnouncementCollocation";

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css']
})
export class FavorisComponent implements OnInit {
  favoris: AnnouncementCollocation[] = [];
  isPopoverOpen: boolean = false;

  constructor(private favorisService: FavorisService) { }

  ngOnInit(): void {
    
    this.loadFavoris();
  }

  loadFavoris(): void {
    this.favorisService.getFavoris().subscribe({
      next: (favoris) => {
        this.favoris = favoris;
      },
      error: (error) => {
        console.error('Error loading favoris:', error);
      }
    });
  }

  removeFavoris(announcement: AnnouncementCollocation): void {
    this.favorisService.removeFavoris(announcement.annoncementCollocationId).subscribe({
      next: () => {
        this.favoris = this.favoris.filter(item => item.annoncementCollocationId !== announcement.annoncementCollocationId);
      },
      error: (error) => {
        console.error('Error removing favoris:', error);
      }
    });
  }

  getFavorisCount(): number {
    return this.favoris.length;
  }

  togglePopover(): void {
    this.isPopoverOpen = !this.isPopoverOpen;
  }
}
