import { Component } from '@angular/core';
import {AnnouncementCollocation} from "../../entity/AnnouncementCollocation";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AnnouncementCollocationService} from "../../Services/announcement-collocation.service";
import {Router} from "@angular/router";
import { EquipmentType } from 'src/app/entity/EquipementType';

@Component({
  selector: 'app-addanncoll',
  templateUrl: './addanncoll.component.html',
  styleUrls: ['./addanncoll.component.css']
})
export class AddanncollComponent {
  newAnnouncementFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private collocationService: AnnouncementCollocationService, private route: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.newAnnouncementFormGroup = this.formBuilder.group({
      homeSize: ['', Validators.required],
      numPerso: ['', Validators.required],
      equipmentType: [EquipmentType.MEUBLE],
      address: [''],
      imageHouse: [''],
      pricePerPerson: ['', Validators.required],
      houseType: ['']
      // Ajoutez d'autres champs au besoin en fonction des propriétés de l'annonce de colocation
    });
  }

  handleSaveAnnouncement(): void {
    if (this.newAnnouncementFormGroup.valid) {
      const announcement: AnnouncementCollocation = this.newAnnouncementFormGroup.value as AnnouncementCollocation;

      // Appelez votre service pour enregistrer l'annonce
      this.collocationService.addAnnouncement(announcement).subscribe({
        next: data => {
          // Affichez un message de succès
          alert("L'annonce a été enregistrée avec succès!");
          // Naviguez vers "/all-announcement-collocation"
          this.route.navigateByUrl("/annColl");
        },
        error: err => {
          // Journalisez l'erreur dans la console
          console.error(err);
          // Gérez l'erreur selon vos besoins
          // Vous voudrez peut-être afficher un message d'erreur à l'utilisateur
        }
      });
    } else {
      // Si le formulaire n'est pas valide, journalisez une erreur ou gérez-la selon vos besoins
      console.error('Le formulaire n\'est pas valide');
      // Vous voudrez peut-être afficher un message d'erreur à l'utilisateur
    }
  }


}
