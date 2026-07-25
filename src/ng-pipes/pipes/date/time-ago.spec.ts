import { TimeAgoPipe } from './time-ago';
import * as moment from 'moment';

describe('TimeAgoPipe', () => {
  const pipe = new TimeAgoPipe();
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

  it('should return just now for a few seconds ago', () => {
    expect(pipe.transform(new Date('2026-07-15T11:59:55Z'))).toEqual('just now');
  });

  it('should return just now for a minute ago', () => {
    expect(pipe.transform(new Date('2026-07-15T11:59:00Z'))).toEqual('just now');
  });

  it('should return 5 minutes ago', () => {
    expect(pipe.transform(new Date('2026-07-15T11:55:00Z'))).toEqual('5 minutes ago');
  });

  it('should return an hour ago', () => {
    expect(pipe.transform(new Date('2026-07-15T11:00:00Z'))).toEqual('an hour ago');
  });

  it('should return 5 hours ago', () => {
    expect(pipe.transform(new Date('2026-07-15T07:00:00Z'))).toEqual('5 hours ago');
  });

  it('should return yesterday', () => {
    expect(pipe.transform(new Date('2026-07-14T12:00:00Z'))).toEqual('yesterday');
  });

  it('should return 3 days ago', () => {
    expect(pipe.transform(new Date('2026-07-12T12:00:00Z'))).toEqual('3 days ago');
  });

  it('should return last week', () => {
    expect(pipe.transform(new Date('2026-07-05T12:00:00Z'))).toEqual('last week');
  });

  it('should return 2 weeks ago', () => {
    expect(pipe.transform(new Date('2026-07-01T12:00:00Z'))).toEqual('2 weeks ago');
  });

  it('should return last month', () => {
    expect(pipe.transform(new Date('2026-06-10T12:00:00Z'))).toEqual('last month');
  });

  it('should return 5 months ago', () => {
    expect(pipe.transform(new Date('2026-02-15T12:00:00Z'))).toEqual('5 months ago');
  });

  it('should return last year', () => {
    expect(pipe.transform(new Date('2025-07-15T12:00:00Z'))).toEqual('last year');
  });

  it('should return 5 years ago', () => {
    expect(pipe.transform(new Date('2021-07-15T12:00:00Z'))).toEqual('5 years ago');
  });

  it('should return in the future', () => {
    expect(pipe.transform(new Date('2026-07-15T12:00:20Z'))).toEqual('in the future');
  });

  it('should support moment.js just now', () => {
    expect(pipe.transform(moment(startingTime))).toEqual('just now');
  });

  it('should support moment.js last week', () => {
    expect(pipe.transform(moment('2026-07-05T12:00:00Z'))).toEqual('last week');
  });

  it('should return last week when parsing a string', () => {
    expect(pipe.transform('2026-07-05T12:00:00.000Z')).toEqual('last week');
  });

  it('should return in the future when parsing a string', () => {
    expect(pipe.transform('2026-07-15T12:00:20.000Z')).toEqual('in the future');
  });

  it('should throw invalid date for falsey input', () => {
    expect(pipe.transform(null)).toEqual('Invalid date');
  });

  it('should throw invalid date for incorrect date string', () => {
    expect(pipe.transform('2022-02-21T019Z')).toEqual('Invalid date');
  });
});
