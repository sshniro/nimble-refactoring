import {Component, Input} from "@angular/core";
import {Address} from "../model/publish/address";
import {UBLModelUtils} from "../model/ubl-model-utils";
/**
 * Created by suat on 22-Sep-17.
 */

@Component({
    selector: 'address-view',
    templateUrl: './address-view.component.html'
})

export class AddressViewComponent {
    @Input() address: Address[];
    @Input() propName: string;
    @Input() presentationMode: string;
    @Input() multiValue: boolean = false;
    @Input() definition: string = null;


    addFirstValue(): void {
        this.address.push(new Address());
    }

    addNewValue():void {
        let value:Address = UBLModelUtils.createAddress();
        this.address.push(value);
    }

    removeValue(index:number):void {
        this.address.splice(index, 1);
    }

}
