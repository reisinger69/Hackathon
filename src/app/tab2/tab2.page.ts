import {Component} from '@angular/core';
import {HttpService} from "../HTTPService";
import {EChartsOption} from "echarts";
import {provideEcharts} from "ngx-echarts";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [
    provideEcharts(),
  ]
})

export class Tab2Page{

  oldImgClass = "";

  constructor(private http: HttpService) {
    console.log("Before: " + this.imgSource)
    let intervalDet = setInterval(() =>{
        //todo classification
        let getParts = http.getObjectDetectionResult();

        getParts.subscribe((response: any) => {
          let partId = response[0].id;
          let inspectionIdDet = response[0].inspections.filter((x: any) => x.name === "ObjectDetection")[0].id;
          let getInfoDetection = http.getInfo(partId, inspectionIdDet);

          let partIdClas = response[0].inspections.filter((x: any) => x.name === "Classification")[0].id;
          this.classificationGood = response[0].inspections.filter((x: any) => x.name === "Classification")[0].result == 1;
          let getInfoClassification = http.getInfo(partId, partIdClas);

          getInfoClassification.subscribe((response: any) => {
            this.imgClassification = "data:image/png;base64," + response.image;
            if (response.image !== this.oldImgClass){
              this.imgSource = this.imgClassification;
              this.oldImgClass = response.image;
            }
          });

          getInfoDetection.subscribe((response: any) => {
            console.log(response);
            let image = "data:image/png;base64," + response.image;
            let additionalData = response.additionalInfo;
            console.log(additionalData);
            this.imgObjectDetection = image;


            const blueCapRegex = /blueCap \(Count: (\d+),/;
            const greenCapRegex = /greenCap \(Count: (\d+),/;
            const missingCapRegex = /missingCap \(Count: (\d+),/;

            this.numberBlue = this.extractCount(additionalData[0].value, blueCapRegex);
            this.numberGreen = this.extractCount(additionalData[0].value, greenCapRegex);
            this.numberMissingCap = this.extractCount(additionalData[0].value, missingCapRegex);
            this.numberMissing = 20 - this.numberGreen-this.numberBlue-this.numberMissingCap;

            this.option = this.setOptions();
        })
        })
    }, 1000);

  }

  isDetection = false;

  classificationGood = false;

  imgClassification = "";
  imgObjectDetection: string = "";



  imgSource = "assets/loading.gif";
  numberGreen = 0;
  numberBlue = 0;
  numberMissingCap = 0;
  numberMissing= 0;


  option: EChartsOption  = this.setOptions();

  setOptions(){
    let options: EChartsOption = {
      title: {
        text: 'Auswertung der Kiste',
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        bottom: '20px'
      },
      series: [
        {
          name: 'Kiste',
          type: 'pie',
          radius: '50%',
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          data: [
            { value: this.numberGreen, name: 'Grüne Flaschen' },
            { value: this.numberBlue, name: 'Blaue Flaschen'},
            { value: this.numberMissingCap, name: 'Fehlende Deckel' },
            { value: this.numberMissing, name: 'Fehlende Flaschen' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    return options;
  }

  extractCount(str: string, regex: RegExp): number {
    console.log(str);
    const match = str.match(regex);
    return match ? parseInt(match[1], 10) : 0;
  }



  onToggleClicked() {
    console.log(this.isDetection)
    if (!this.isDetection){
      this.imgSource = this.imgObjectDetection;
    } else {
      this.imgSource = this.imgClassification;
    }
  }

}
