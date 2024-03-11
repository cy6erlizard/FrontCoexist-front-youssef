import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AnnouncementCollocation} from "../entity/AnnouncementCollocation";
import {Observable,catchError,throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AnnouncementCollocationService {
  readonly Get_Announcement = 'http://localhost:8000/COEXIST/Announce/get_all_AnnoncementCollocations';
  readonly ADD_Announcement = 'http://localhost:8000/COEXIST/Announce/add-AnnoncementCollocation';
  readonly DeleteAnnouncement_Announcement = 'http://localhost:8000/COEXIST/Announce/deleteAnnoncementCollocation/';
  readonly Get_AnnouncementById ='http://localhost:8000/COEXIST/Announce/get_AnoouncmementById/'
  readonly UPDATE_Announcement = 'http://localhost:8000/COEXIST/Announce/updateAnnoncementCollocation/';

  constructor(private httpClient: HttpClient) {
  }
  getAnnouncementById(id: number): Observable<AnnouncementCollocation> {
    return this.httpClient.get<AnnouncementCollocation>(this.Get_AnnouncementById+id)
      
  }
  getAllAnnouncements() {
    return this.httpClient.get<AnnouncementCollocation>(this.Get_Announcement);
  }
  public addAnnouncement(announcementCollocation: AnnouncementCollocation): Observable<AnnouncementCollocation> {
    return this.httpClient.post<AnnouncementCollocation>(this.ADD_Announcement, announcementCollocation);
  }
  public deleteAnnouncement(id: number){
    return this.httpClient.delete(this.DeleteAnnouncement_Announcement+id);
  }
  public updateAnnouncement(announcementCollocation: AnnouncementCollocation): Observable<AnnouncementCollocation> {
    return this.httpClient.post<AnnouncementCollocation>(this.UPDATE_Announcement, announcementCollocation);
  }
}
