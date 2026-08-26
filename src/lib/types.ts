export interface Friend {
  id: string;
  name: string;
  emoji: string;
  imageUrl?: string;
  imagePosition?: string;
  imageScale?: number;
  imagePositionX?: number;
  imagePositionY?: number;
  passcode: string;
  message: string;
  messageStyle: "elegant" | "warm" | "playful" | "minimal";
  subtitle?: string;
}

export interface AppConfig {
  ownerName: string;
  title: string;
  subtitle: string;
  backgroundTheme: "dark" | "cosmic" | "sunset" | "ocean" | "forest";
  accentColor: string;
  publicMessage: string;
  publicMessageStyle: "elegant" | "warm" | "playful" | "minimal";
  splashTitle?: string;
  splashSubtitle?: string;
  cardSubtitle?: string;
  friends: Friend[];
}

export const DEFAULT_FRIENDS: Friend[] = [
  {
    id: "friend-1",
    name: "Sisil",
    emoji: "🌸",
    passcode: "1111",
    message: "Hi Sisil, The first time kita ketemu jujur pas lu muncul dari semak semak pas kita first gathering dan gua udah tau ni orang pasti unik haha. I really appreciate the way lu selalu step up buat kita dan menjadi sosok yang mau ngelead dan ngeprotect kita in a way dan juga selalu jadi moodbooster kita on an everyday basis. For more personal stuff, makasih ya udah mau ngenerima gua apa adanya sebagai temen lu, gua seneng lu gapernah ngejudge gua sama sekali apapun itu dan selalu menjadi orang yang understanding. Makasih juga udah manggil gua \"nang\" karena ever since my mom passed away nobody really calls me that anymore and it just make me feel happy and at home. Tetap jadi diri lu sendiri ya! do not ever care about what other thinks just be your kind and amazing self! Sukses selalu and may God bless u always",
    messageStyle: "elegant",
    imageUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXUAAAKdCAYAAADcAvm6AAAQAElEQVR4Aex9B6BdRbX2t2Z2Oe223JueEEghhN67FAUVBeXZUbFQ7eXZsD67/vZen4LYlWdFmiDYu6CCIE0gpOfm9tN2mf9b++aGgKAJBnJvMjtnnZk9e8qab+7+1tprzjkx8IdHwCPgEfAI7DAIeFLfYZbST8Qj4BHwCACe1P1fgUfAI7BtEfC9bVcEPKlvV/j94B4Bj4BHYNsi4El92+Lpe/MIeAQ8AtsVAU/q2xV+P/hDg4Dv1SOw8yLgSX3nXXs/c4+AR2AHRMCT+g64qH5KHgGPwM6LgCf1h2btfa8eAY+AR2C7IOBJfbvA7gf1CHgEPAIPDQKe1B8aXH2vHgGPgEdg2yKwhb15Ut9CoHw1j4BHwCMwFRDwpD4VVsnr6BHwCHgEthABT+pbCJSv5hHwCHgEpgICntSmwip5HT0CHgGPwBYi4El9C4Hy1TwCHgGPwFRAwJP6VFglr+MEAj71CHgE/g0CntT/DUD+skfAI+ARmEoIeFKfSqvldfUIeAQ8Av8GAU/q/wag+1725x4Bj4BHYDIj4El9Mq+O180j4BHwCGwlAp7UtxIwX90j4BHwCGxbBLZtb57Uty2evjePgEfAI7BdEfCkvl3h94N7BDwCHoFti4An9W2Lp+/NIzAVEfA670AIeFLfgRbTT8Uj4BHwCHhS938DHgGPgEdgB0LAk/oOtJhTeSped4+AR2DbIOBJfdvg6HvxCHgEPAKTAgFP6pNiGbwSHgGPgEdg2yDgSX0CR596BDwCHoEdAAFP6jvAIvopeAQ8Ah6BCQQ8qU8g4VOPgEfAI7BtEdguvXlS3y6w+0E9Ah4Bj8BDg4An9YcGV9+rR8Aj4BHYLgh4Ut8usPtBPQIPDwJ+lJ0PAU/qO9+a+xl7BDwCOzACntR34MX1U/MIeAR2PgQ8qe98a/7wztiP5hHwCDysCHhSf1jh9oN5BDwCHoGHFgFP6g8tvr53j4BHwCPwsCKwE5D6w4qnH8wj4BHwCGxXBDypb1f4/eAeAY+AR2DbIuBJfdvi6XvzCHgEdgIEJvMUPalP5tXxunkEPAIega1EwJP6VgLmq3sEPAIegcmMgCf1ybw6XjePwAMh4Ms9Ag+AgCf1BwDGF3sEPAIegamIgCf1qbhqXmePgEfAI/AACHhSfwBgfPG/Q8Bf9wh4BCYjAp7UJ+OqeJ08Ah4Bj8CDRMCT+oMEzjfzCHgEPAKTEYGpTOqTEU+vk0fAI+AR2K4IeFLfrvD7wT0CHgGPwLZFwJP6tsXT9+YR8AhMZQR2AN09qe8Ai+in4BHwCHgEJhDwpD6BhE89Ah4Bj8AOgIAn9R1gEf0UdiQE/Fw8Av8ZAp7U/zP8fGuPgEfAIzCpEPCkPqmWwyvjEfAIeAT+MwQ8qf9n+O2Irf2cPAIegSmMgCf1Kbx4XnWPgEfAI3BfBDyp3xcRf+4R8Ah4BKYwApOS1Kcwnl51j4BHwCOwXRHwpL5d4feDewQ8Ah6BbYuAJ/Vti6fvzSPgEZiUCOw8SnlS33nW2s/UI+AR2AkQ8KS+Eyyyn6JHwCOw8yDgSX3nWWs/0+2LgB/dI/CwIOBJ/WGB2Q/iEfAIeAQeHgQ8qT88OPtRPAIeAY/Aw4KAJ/WHBebJMYjXwiPgEdjxEfCkvuOvsZ+hR8AjsBMh4El9J1psP1WPgEdgx0fg4SX1HR9PP0OPgEfAI7BdEfCkvl3h94N7BDwCHoFti4An9W2Lp+/NI+AReHgR8KPdBwFP6vcBxJ96BDwCHoGpjIAn9am8el53j4BHwCNwHwQ8qd8HEH/qEdhaBHx9j8BkQsCT+mRaDa+LR8Aj4BH4DxHwpP4fAuibewQ8Ah6ByYSAJ/XJtBoPVhffziPgEfAIbETAk/pGIHziEfAIeAR2BAQ8qe8Iq+jn4BHwCHgENiKwjUh9Y28+8Qh4BDwCHoHtioAn9e0Kvx/cI+AR8AhsWwQ8qW9bPH1vHgGPwDZCwHfz4BDwpP7gcPOtPAIeAY/ApETAk/qkXBavlEfAI+AReHAIeFJ/cLj5VjsDAn6OHoEpiIAn9Sm4aF5lj4BHwCPwQAh4Un8gZHy5R8Aj4BGYggh4Up/Ui+aV8wh4BDwCW4eAJ/Wtw8vX9gh4BDwCkxoBT+qTenm8ch4Bj4BHYOsQ+HekvnW9+doeAY+AR8AjsF0R8KS+XeH3g3sEPAIegW2LgCf1bYun780j4BH4dwj46w8pAp7UH1J4feceAY+AR+DhRcCT+sOLtx/NI+AR8Ag8pAh4Un9I4fWdT04EvFYegR0XAU/qO+7a+pl5BDwCOyECntR3wkX3U/YIeAR2XAQ8qW+ftfWjegQ8Ah6BhwQBT+oPCay+U4+AR8AjsH0Q8KS+fXD3o3oEPAIegW2LwMbePKlvBMInHgGPgEdgR0DAk/qOsIp+Dh4Bj4BHYCMCntQ3AuETj4BH4D9FwLefDAh4Up8Mq+B18Ah4BDwC2wgBT+rbCEjfjUfAI+ARmAwIeFKfDKvgddhWCPh+PAI7PQKe1Hf6PwEPgEfAI7AjIeBJfUdaTT8Xj4BHYKdHwJP6Nv4T8N15BDwCHoHtiYAn9e2Jvh/bI+AR8AhsYwQ8qW9jQH13HgGPgEdg2yKwdb15Ut86vHxtj4BHwCMwqRHwpD6pl8cr5xHwCHgEtg4BT+pbh5ev7RHYGRHwc55CCHhSn0KL5VX1CHgEPAL/DgFP6v8OIX/dI+AR8AhMIQQ8qU+hxdqZVfVz9wh4BLYMAU/qW4aTr+UR8Ah4BKYEAp7Up8QyeSU9Ah4Bj8CWIeBJfutwAnw9j4BHwCMwBRDwpD4FFsmr6BHwCHgEthQBT+pbipSv5xHwCHgEti0CD0lvntQfElh9px4Bj4BHYPsg4El9++DuR/UIeAQ8Ag8JAp7UHxJYfacegamBgNdyx0PAk/qOt6Z+Rh4Bj8BOjIAn9",
  },
];

export const DEFAULT_CONFIG: AppConfig = {
  ownerName: "From Jaziel",
  title: "Special Message for Multi 1",
  subtitle: "A heartfelt message for us <3",
  backgroundTheme: "cosmic",
  accentColor: "#a78bfa",
  publicMessage: "Welcome to my special message app! I created this to share thoughtful notes with my favorite people.",
  publicMessageStyle: "elegant",
  splashTitle: "Special Message for Multi 1",
  splashSubtitle: "A heartfelt message for us <3",
  cardSubtitle: "Has a message for you",
  friends: DEFAULT_FRIENDS,
};

export function getImageStyle(friend: Friend): React.CSSProperties {
  const scale = friend.imageScale ?? 1;
  let defaultX = 50;
  let defaultY = 50;

  if (friend.imagePosition === 'top') defaultY = 0;
  if (friend.imagePosition === 'bottom') defaultY = 100;
  if (friend.imagePosition === 'left') defaultX = 0;
  if (friend.imagePosition === 'right') defaultX = 100;

  const x = friend.imagePositionX ?? defaultX;
  const y = friend.imagePositionY ?? defaultY;

  return {
    objectFit: "cover",
    objectPosition: `${x}% ${y}%`,
    transform: `scale(${scale})`,
    transformOrigin: `${x}% ${y}%`,
  };
}
