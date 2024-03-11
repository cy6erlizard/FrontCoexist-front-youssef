import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AnnouncementCollocation } from '../../entity/AnnouncementCollocation';
import { AnnouncementCollocationService } from '../../Services/announcement-collocation.service';
import { EquipmentType } from '../../entity/EquipementType';


@Component({
  selector: 'app-updateanncoll',
  templateUrl: './updateanncoll.component.html',
  styleUrls: ['./updateanncoll.component.css']
})
export class UpdateanncollComponent implements OnInit {
  announcementId!: number;
  announcement!: AnnouncementCollocation;
  updateAnnouncementFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private collocationService: AnnouncementCollocationService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.announcementId = this.activatedRoute.snapshot.params['id'];
    this.initializeForm();
    this.loadAnnouncement();
  }

  initializeForm(): void {
    this.updateAnnouncementFormGroup = this.formBuilder.group({
      homeSize: ['', Validators.required],
      numPerso: ['', Validators.required],
      equipmentType: [EquipmentType.MEUBLE],
      address: [''],
      imageHouse: [''],
      pricePerPerson: ['', Validators.required],
      houseType: ['']
      // Add other fields as needed based on the properties of the collocation announcement
    });
  }

  loadAnnouncement(): void {
    this.collocationService.getAnnouncementById(this.announcementId).subscribe({
      next: (announcement) => {
        this.announcement = announcement;
        this.updateAnnouncementFormGroup.patchValue(announcement);
      },
      error: (error:Error) => {
        console.error('Error loading announcement:', error);
        // Handle error as needed
      }
    });
  }

  handleUpdateAnnouncement(): void {
    if (this.updateAnnouncementFormGroup.valid) {
      const updatedAnnouncement: AnnouncementCollocation = this.updateAnnouncementFormGroup.value as AnnouncementCollocation;
      updatedAnnouncement.annoncementCollocationId = this.announcementId;

      this.collocationService.updateAnnouncement(updatedAnnouncement).subscribe({
        next: () => {
          alert("L'annonce a été mise à jour avec succès!");
          this.route.navigateByUrl('/home/annColl');
        },
        error: (error) => {
          console.error('Error updating announcement:', error);
          // Handle error as needed
        }
      });
    } else {
      console.error('Le formulaire n\'est pas valide');
      // You may want to display an error message to the user
    }
  }
}
