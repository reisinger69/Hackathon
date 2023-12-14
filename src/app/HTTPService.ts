import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {DetectionInfo} from "./tab2/detectionInfo";
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  //private url = 'http://172.20.10.4:8080/fronius';
  private url = 'http://localhost:8080/api/ResultViewer';

  constructor(private http: HttpClient) {
  }

  public isImageProcessed() {
    //todo logic um zu überprüfen ob (neue) daten in der mongoDB sind;
    return false;
  }

  public getClassificationResult() {
    return this.http.get(this.url + "/GetParts/hackathon_2023");
  }

  public getObjectDetectionResult() {
    return this.http.get(this.url + "/GetParts/hackathon_2023");
  }

  public getInfo(partId: any, inspectionId: any){
    return this.http.get(this.url + "/GetInspectionData/hackathon_2023/" + partId + "/" + inspectionId);
  }
}
