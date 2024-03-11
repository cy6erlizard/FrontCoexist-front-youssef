import { Component } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AnnouncementCollocationService } from "../../Services/announcement-collocation.service";
import { AnnouncementCollocation } from "../../entity/AnnouncementCollocation";
import { FavorisService } from "../../Services/favoris.service";

@Component({
  selector: 'app-allanncoll',
  templateUrl: './allanncoll.component.html',
  styleUrls: ['./allanncoll.component.css']
})
export class AllanncollComponent {
  newAnnouncementFormGroup!: FormGroup;
  allAnnouncements: AnnouncementCollocation[] = [];
  favoritedAnnouncements: number[] = []; // Array to store IDs of favorited announcements

  constructor(
    private collocationService: AnnouncementCollocationService,
    private favorisService: FavorisService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.collocationService.getAllAnnouncements().subscribe((data) => {
      // @ts-ignore
      this.allAnnouncements = data;

      this.loadFavoritedAnnouncements(); // Load favorited announcements
    });
  }

  loadFavoritedAnnouncements() {
    const favorisStr: string | null = localStorage.getItem('favoris');
    if (favorisStr) {
      const favoris: AnnouncementCollocation[] = JSON.parse(favorisStr);
      this.favoritedAnnouncements = favoris.map(annonce => annonce.annoncementCollocationId);
    }
  }

  redirectToCreateAnnouncement() {
    this.route.navigate(['/addColl']);
  }

  handleDeleteAnnouncement(announcement: AnnouncementCollocation) {
    let conf = confirm("Are you sure?");
    if (!conf) return;

    this.collocationService.deleteAnnouncement(announcement.annoncementCollocationId).subscribe({
      next: (resp) => {
        const index = this.allAnnouncements.indexOf(announcement);
        if (index !== -1) {
          this.allAnnouncements.splice(index, 1);
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }

  addOrRemoveFavoris(announcement: AnnouncementCollocation) {
    const userId = 123; // Replace with actual user ID retrieval

    const annId = announcement.annoncementCollocationId;
    if (this.favoritedAnnouncements.includes(annId)) {
      // Remove from favoris
      this.favorisService.removeAnnouncementFromFavoris(userId, annId).subscribe(() => {
        const index = this.favoritedAnnouncements.indexOf(annId);
        if (index !== -1) {
          this.favoritedAnnouncements.splice(index, 1);
        }
      });
    } else {
      // Add to favoris
      this.favorisService.addAnnouncementToFavoris(userId, annId).subscribe(() => {
        this.favoritedAnnouncements.push(annId);
      });
    }
  }

  isAnnouncementFavorited(announcement: AnnouncementCollocation): boolean {
    return this.favoritedAnnouncements.includes(announcement.annoncementCollocationId);
  }
  redirectToUpdateAnnouncement(announcement: AnnouncementCollocation) {
    const id = announcement.annoncementCollocationId;
    this.route.navigate(['/updateColl', id]);
}
}


