// import { Reddit_Mono } from 'next/font/google';
import localFont from 'next/font/local';

// export const fontSans = Reddit_Mono({
//   preload: true,
//   weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
//   subsets: ['latin'],
// });

export const fontSans = localFont({
  src: [
    {
      path: './ms_sans_serif_bold.woff',
      weight: 'bold',
    },
    {
      path: './ms_sans_serif.woff',
      weight: 'normal',
    },
  ],
});
