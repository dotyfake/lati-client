import { CommentType } from './../pages/Posts/components/ListComment';

export interface GameType {
    _id?: string;
    name: string;
    slug: string;
    title?: string;
    pcImageUrl: string;
    imageUrl: string;
    iconUrl?: string;
    brickIcon?: string;
    brickMini?: string;
    bannerUrl: string;
    mainIconUrl: string;

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
export interface FollowingUserType {
    _id: string;
    avatar: {avatarUrl: string};
    displayName: string;
}
export interface ChatType {
    chatId: string;
    receiver: {
        _id: string;
        displayName: string;
        avatar: {avatarUrl: string};
    };
    createdAt: string;
    updatedAt: string;
}
export interface MessageType {
    _id?:string;
    chatId: string;
    senderId: string;
    text: string;
    createdAt: string;
    updatedAt?: string;
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