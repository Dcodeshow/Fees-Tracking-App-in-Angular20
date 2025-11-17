import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appStatusColor]',
})
export class StatusColor {
  @Input() appStatusColor: string = '';
  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    this.setColor();
  }

  setColor() {
    const status = this.appStatusColor;

    // existing classes clear
    this.el.nativeElement.classList.remove('btn-primary', 'btn-warning', 'btn-danger');

    // apply new class
    if (status === 'Full Paid') {
      this.el.nativeElement.classList.add('btn-primary');
    } else if (status === 'Partial Paid') {
      this.el.nativeElement.classList.add('btn-warning');
    } else if (status === 'Not Paid') {
      this.el.nativeElement.classList.add('btn-danger');
    }
  }
}
