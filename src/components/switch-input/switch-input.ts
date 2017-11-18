import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import './switch-input.scss';

@Component({
    template: require('./switch-input.html'),
})
export class SwitchInputComponent extends Vue {
    isOn: boolean = true;
    @Prop() value: boolean;

    switched(isOn: boolean) {
        this.$emit('input', isOn);
    }
}
