import { CommentType } from './../pages/Posts/components/ListComment';

export interface GameType {
    name: string;
    slug: string;
    title?: string;
    pcImageUrl: string;
    imageUrl: string;
    iconUrl?: string;
    brickIcon?: string;
    brickMini?: string;
    bannerUrl: string;

}

export interface SkillType {
    name: string;
    nickname: string;
    slug: string;
    gender: string;
    bannerUrl: string;
    avatarUrl: string;
    iconUrl: string;
    price: number;
    intro: string;
}

export interface PostType {
    _id: string;
    createdAt: string;
   user: {
    _id: string;
    avatar: {avatarUrl: string};
    displayName: string;
   };
   content: string;
   like: [string];
   comments : [CommentType]
   photo: {
    photoUrl: string;
    cloudinary_id: string;
    userId: string
   };
}

export interface GamesType {
    games: {
        results: GameType[];
      };
}

export type ErrorDataType = {
    success: boolean;
    message: string
    }