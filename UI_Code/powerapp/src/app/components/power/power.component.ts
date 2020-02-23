import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-power',
    templateUrl: './power.component.html',
    styleUrls: ['./power.component.scss']
})
export class PowerComponent implements OnInit {
    selectedUserTab = 1;
    tabs = [
        {
            name: 'Meter1',
            key: 1,
            active: true
        },
        {
            name: 'Meter2',
            key: 2,
            active: false
        },
        {
            name: 'Meter3',
            key: 3,
            active: false
        },
        {
            name: 'Meter4',
            key: 4,
            active: false
        }
    ];

    single = [
        {
            "name": "Germany",
            "value": 8940000
        },
        {
            "name": "USA",
            "value": 5000000
        },
        {
            "name": "France",
            "value": 7200000
        }
    ];
    data: any = {};
    constructor(private apiService: ApiService) {

    }



    view: any[] = [500, 400];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Power';
    showYAxisLabel = true;
    yAxisLabel = 'Value';

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };
    powerData: any[] = [];
    energyData: any[] = [];

    onSelect(event) {
        console.log(event);
    }
    ngOnInit() {
        const self = this;
        self.apiService.getData().subscribe((_res) => {
            self.data = _res.message;
            self.getPowerData(self.data[0]);
            self.getEnergyData(self.data[1]);
            console.log('data', _res);
        })
    }
    getPowerData(data) {
        const self = this;
        Object.keys(data).forEach((key) => {
            if(key !='time'&& key != 'ipAddress' && key!='tStamp'&& key!='deviceId'&& key!='deviceName' && key!='parm') {
            const obj = {};
            obj['name'] = key;
            obj['value'] = data[key];
            self.powerData.push(obj);
            }
        })
    }
    getEnergyData(data) {
        const self = this;
        Object.keys(data).forEach((key) => {
            if(key !='time'&& key != 'ipAddress' && key!='tStamp'&& key!='deviceId'&& key!='deviceName' && key!='parm') {
            const obj = {};
            obj['name'] = key;
            obj['value'] = data[key];
            self.energyData.push(obj);
            }
        })
    }
    tabChange(selectedTab) {
        console.log('### tab change');
        this.selectedUserTab = selectedTab.key;
        for (let tab of this.tabs) {
            if (tab.key === selectedTab.key) {
                tab.active = true;
            } else {
                tab.active = false;
            }
        }
    }

}
