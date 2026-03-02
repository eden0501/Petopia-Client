import { PostTypes } from "../constants/postTypes";
import type { PostInterface } from "../interfaces/post";
import type { UserInterface } from "../interfaces/user";

export const mockUsers: Record<string, UserInterface> = {
  user1: {
    username: "JohnDoe",
    email: "john@example.com",
    dateOfBirth: new Date("1990-05-15"),
    petsCount: 2,
    profilePicture: "https://i.pravatar.cc/150?u=user1",
  },
  user2: {
    username: "AnimalLover99",
    email: "rescue@example.com",
    dateOfBirth: new Date("1985-11-20"),
    petsCount: 5,
  },
  user3: {
    username: "CatPerson",
    email: "cats@example.com",
    dateOfBirth: new Date("1993-02-10"),
    petsCount: 3,
  },
  user4: {
    username: "PetHelper",
    email: "help@pets.com",
    dateOfBirth: new Date("1988-08-30"),
    petsCount: 1,
  },
};

export const mockPosts: PostInterface[] = [
  {
    title: "URGENT: Injured Dog Found Near Highway",
    content:
      "Found a limping dog near Route 40. Appears to have injured leg. Need immediate help with transport to vet!",
    authorId: "user1",
    author: mockUsers.user1,
    type: PostTypes.REPORT,
    createdAt: new Date("2026-01-02T10:30:00"),
    imageUrl:
      "https://images.unsplash.com/photo-1643786259916-a546902a83bd?q=80&w=1080",
    hashtags: ["urgent", "rescue", "doginjury"],
  },
  {
    title: "Donating Dog Crate & Food Bowls",
    content:
      "My pup has outgrown his crate. Large size crate (36) and stainless steel bowls available for pickup.",
    authorId: "user2",
    author: mockUsers.user2,
    type: PostTypes.DONATION,
    createdAt: new Date("2026-01-01T15:20:00"),
    imageUrl:
      "https://images.unsplash.com/photo-1765040446666-790856c80549?q=80&w=1080",
    hashtags: ["donation", "dogcrate", "freeequipment"],
  },
  {
    title: "How to Properly Trim Your Dog's Nails",
    content:
      "After 10 years of experience, here are my top tips: 1) Use a quality nail grinder or clipper 2) Have styptic powder ready.",
    authorId: "user2",
    author: mockUsers.user2,
    type: PostTypes.KNOWLEDGE,
    createdAt: new Date("2026-01-01T09:00:00"),
    imageUrl:
      "https://images.unsplash.com/photo-1759164955427-14ca448a839d?q=80&w=1080",
    hashtags: ["dogtips", "petcare", "grooming"],
  },
  {
    title: "Cat Hiding Under Car - Need Trap",
    content:
      "Stray cat has been hiding under a parked car on Elm Street for 2 days. Does anyone have a humane trap?",
    authorId: "user3",
    author: mockUsers.user3,
    type: PostTypes.REPORT,
    createdAt: new Date("2025-12-31T18:45:00"),
    imageUrl:
      "https://images.unsplash.com/photo-1702914954859-f037fc75b760?q=80&w=1080",
    hashtags: ["catrescue", "straycat", "needhelp"],
  },
  {
    title: "Understanding Cat Body Language",
    content:
      "Slow blinks = cat kisses! Tail up = happy greeting. Ears back = stressed or scared. 🐱",
    authorId: "user4",
    author: mockUsers.user4,
    type: PostTypes.OTHER,
    createdAt: new Date("2025-12-30T14:15:00"),
    hashtags: ["catsoftiktok", "cattips", "felinebehavior"],
  },
  {
    title: "Cat Carrier & Scratching Post Available",
    content:
      "Moving soon and need to rehome some items. Medium cat carrier and tall scratching post.",
    authorId: "user4",
    author: mockUsers.user4,
    type: PostTypes.DONATION,
    createdAt: new Date("2025-12-29T11:30:00"),
    hashtags: ["catequipment", "donation", "freestuff"],
  },
];
