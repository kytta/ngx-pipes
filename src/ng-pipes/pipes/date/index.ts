import { NgModule } from '@angular/core';
import { TimeAgoPipe } from './time-ago';
import { TimeToPipe } from './time-to';

export const DATE_PIPES = [TimeAgoPipe, TimeToPipe];

/** @deprecated Pipes are now standalone; Import them directly. */
@NgModule({
  imports: DATE_PIPES,
  exports: DATE_PIPES,
})
export class NgDatePipesModule {}

export { TimeAgoPipe } from './time-ago';
export { TimeToPipe } from './time-to';
