import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import './pager.scss';

@Component({
    template: require('./pager.html'),
})
export class PagerComponent extends Vue {
    @Prop() totalElements: number;
    @Prop() currentPos: number;
    @Prop() maxPerPage: number;

    changePosition(newPosition: number, event: any) {
        this.$emit('fromTo', {from: newPosition * this.maxPerPage, to: (newPosition + 1) * this.maxPerPage - 1});
    }
}
