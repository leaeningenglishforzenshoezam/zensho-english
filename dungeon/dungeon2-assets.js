/* Dungeon 2 artwork registry. Event images are ready for the story/event pass. */
(() => {
  const backgrounds = 'images/dungeons/';
  const bosses = 'images/bosses/';
  const events = 'images/events/';

  window.GOIMON_D2_ASSETS = Object.freeze({
    backgrounds: Object.freeze({
      exterior: backgrounds + 'station-exterior.jpg',
      concourse: backgrounds + 'station-concourse.jpg',
      cargo: backgrounds + 'station-cargo.jpg',
      gates: backgrounds + 'station-gates.jpg',
      act1: backgrounds + 'station-act1-lost-found.jpg',
      act2: backgrounds + 'station-act2-platform.jpg',
      act3: backgrounds + 'station-act3-carriage.jpg',
      dawn: backgrounds + 'station-dawn.jpg'
    }),
    bosses: Object.freeze({
      nakajima: {battle: bosses + 'nakajima.png', human: bosses + 'nakajima-sad.png'},
      rei: {battle: bosses + 'rei.png', human: bosses + 'rei-kind.png'},
      yoshi: {battle: bosses + 'yoshi-angry.png', human: bosses + 'yoshi-smile.png'}
    }),
    events: Object.freeze({
      conductorMeal: events + 'station-conductor-meal.jpg',
      emptyReservedSeat: events + 'station-empty-reserved-seat.jpg',
      uncuttableTicket: events + 'station-uncuttable-ticket.jpg',
      midnightTimetable: events + 'station-midnight-timetable.jpg',
      childTicket: events + 'station-child-ticket.jpg',
      childPostcard: events + 'station-child-postcard.jpg',
      unfinishedSong: events + 'station-unfinished-song.jpg',
      unclaimedUmbrellas: events + 'station-unclaimed-umbrellas.jpg',
      closureRecords: events + 'station-closure-records.jpg',
      lastDayPhoto: events + 'station-last-day-photo.jpg'
    })
  });
})();
