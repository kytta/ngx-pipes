import { TimeToPipe } from './time-to';
import * as moment from 'moment';

describe('TimeToPipe', () => {
  const pipe = new TimeToPipe();
  const startingTime = '2026-07-15T12:00:00Z';

  beforeEach(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(startingTime));
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should return just now', () => {
    expect(pipe.transform(new Date(startingTime))).toEqual('just now');
  });

  it('should return just now for a few seconds ahead', () => {
    expect(pipe.transform(new Date('2026-07-15T12:00:05Z'))).toEqual('just now');
  });

  it('should return just now for a minute ahead', () => {
    expect(pipe.transform(new Date('2026-07-15T12:01:00Z'))).toEqual('just now');
  });

  it('should return in the past', () => {
    expect(pipe.transform(new Date('2026-07-15T11:59:40Z'))).toEqual('in the past');
  });

  it('should return in 5 minutes', () => {
    expect(pipe.transform(new Date('2026-07-15T12:05:00Z'))).toEqual('in 5 minutes');
  });

  it('should return in an hour', () => {
    expect(pipe.transform(new Date('2026-07-15T13:00:00Z'))).toEqual('in an hour');
  });

  it('should return in 5 hours', () => {
    expect(pipe.transform(new Date('2026-07-15T17:00:00Z'))).toEqual('in 5 hours');
  });

  it('should return tomorrow', () => {
    expect(pipe.transform(new Date('2026-07-16T12:00:00Z'))).toEqual('tomorrow');
  });

  it('should return in 3 days', () => {
    expect(pipe.transform(new Date('2026-07-18T12:00:00Z'))).toEqual('in 3 days');
  });

  it('should return next week', () => {
    expect(pipe.transform(new Date('2026-07-25T12:00:00Z'))).toEqual('next week');
  });

  it('should return in 2 weeks', () => {
    expect(pipe.transform(new Date('2026-07-30T12:00:00Z'))).toEqual('in 2 weeks');
  });

  it('should return next month', () => {
    expect(pipe.transform(new Date('2026-08-14T12:00:00Z'))).toEqual('next month');
  });

  it('should return in 5 months', () => {
    expect(pipe.transform(new Date('2026-12-12T12:00:00Z'))).toEqual('in 5 months');
  });

  it('should return next year', () => {
    expect(pipe.transform(new Date('2027-07-15T12:00:00Z'))).toEqual('next year');
  });

  it('should return in 5 years', () => {
    expect(pipe.transform(new Date('2031-07-15T12:00:00Z'))).toEqual('in 5 years');
  });

  it('should support moment.js just now', () => {
    expect(pipe.transform(moment(startingTime))).toEqual('just now');
  });

  it('should support moment.js next week', () => {
    expect(pipe.transform(moment('2026-07-25T12:00:00Z'))).toEqual('next week');
  });

  it('should return next week when parsing a string', () => {
    expect(pipe.transform('2026-07-25T12:00:00.000Z')).toEqual('next week');
  });

  it('should return in the past when parsing a string', () => {
    expect(pipe.transform('2026-07-15T11:59:40.000Z')).toEqual('in the past');
  });

  it('should throw invalid date for falsey input', () => {
    expect(pipe.transform(null)).toEqual('Invalid date');
  });

  it('should throw invalid date for incorrect date string', () => {
    expect(pipe.transform('2022-02-21T019Z')).toEqual('Invalid date');
  });
});
