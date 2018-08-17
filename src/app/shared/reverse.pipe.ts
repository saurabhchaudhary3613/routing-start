import { Pipe } from "@angular/core";


@Pipe({
    name: 'reverse'
})
export class ReversePipe {
    trensform(value: String) {
        return value.split('').reverse().join('');
    }
}