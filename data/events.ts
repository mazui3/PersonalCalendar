
import { ImportantEvent } from '../types';

export const events: ImportantEvent[] = [
  {
    id: '1',
    name: 'Christmas',
    month: 12,
    day: 25,
    category: 'holiday',
    themeColor: 'red',
    icon: 'christmas',
    message: "Ho ho ho! I've already prepared the stockings. I hope you've been good this year!",
    memo: "Don't forget to buy the turkey! Also, check if the lights from last year still work. Pick up gifts for the family by Dec 20th."
  },
  {
    id: '2',
    name: 'Halloween',
    month: 10,
    day: 31,
    category: 'holiday',
    themeColor: 'orange',
    icon: 'halloween',
    message: "Boo! Did I scare you? Get those pumpkins ready, it's almost spooky time!",
    memo: "Costume idea: Mad Scientist. Buy 5kg of candy for the neighborhood kids. Carve pumpkins on the 30th."
  },
  {
    id: '3',
    name: "Sealphie's Birthday",
    month: 5,
    day: 25,
    category: 'birthday',
    themeColor: 'blue',
    icon: 'birthday',
    message: "Yay! It's almost time for cake and celebration. Don't forget the party hats!",
    memo: "Order the blue velvet cake. Reserve the aquarium for the party. Invite the whole pod!"
  },
  {
    id: '4',
    name: 'New Year',
    month: 1,
    day: 1,
    category: 'holiday',
    themeColor: 'indigo',
    icon: 'new-year',
    message: "A fresh start is just around the corner. What's your resolution going to be?",
    memo: "Resolution: Read 12 books. Plan the countdown party. Buy sparkling cider."
  },
  {
    id: '5',
    name: "Valentine's Day",
    month: 2,
    day: 14,
    category: 'holiday',
    themeColor: 'pink',
    icon: 'valentine',
    message: "Do you know the flower language for a yellow rose is friendship and good luck? Do not mistake the colour of your bouquet!",
    memo: "Book the Italian restaurant by Feb 1st. Get the special box of chocolates from the local artisan shop."
  },
  {
    id: '6',
    name: "Summer Vacation",
    month: 7,
    day: 15,
    category: 'travel',
    themeColor: 'yellow',
    icon: 'vacation',
    message: "Sun, sand, and sea! Don't forget the sunscreen. You've earned this break!",
    memo: "Renew passport. Pack the oversized sunglasses. Turn on the out-of-office email responder!"
  },
  {
    id: '7',
    name: "Project Deadline",
    month: 11,
    day: 15,
    category: 'work',
    themeColor: 'slate',
    icon: 'deadline',
    message: "The clock is ticking! Stay focused, you're almost at the finish line.",
    memo: "Submit the final project report. Double-check all citations. Present results to the board at 10 AM."
  }
];
