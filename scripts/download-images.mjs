import fs from 'fs';
import path from 'path';
import https from 'https';

const imagesToDownload = [
  { url: 'https://sampathrani.com/images/logo1.png', dest: 'public/images/logo.png' },
  { url: 'https://sampathrani.com/images/welcome.jpg', dest: 'public/images/welcome.jpg' },
  { url: 'https://sampathrani.com/images/abt2.jpg', dest: 'public/images/abt2.jpg' },
  { url: 'https://sampathrani.com/images/abt3.jpg', dest: 'public/images/abt3.jpg' },
  { url: 'https://sampathrani.com/images/book.png', dest: 'public/images/book.png' },
  { url: 'https://sampathrani.com/images/sampath_rani-768x451.png', dest: 'public/images/sampath_rani.png' },
  { url: 'https://sampathrani.com/images/spiritual.jpg', dest: 'public/images/spiritual.jpg' },
  { url: 'https://sampathrani.com/images/school-work.jpg', dest: 'public/images/school-work.jpg' },
  { url: 'https://sampathrani.com/images/2025/02/03/holistic.png', dest: 'public/images/programs/holistic.png' },
  { url: 'https://sampathrani.com/images/2025/02/03/loa.png', dest: 'public/images/programs/loa.png' },
  { url: 'https://sampathrani.com/images/2025/02/03/chakra.png', dest: 'public/images/programs/chakra.png' },
  { url: 'https://sampathrani.com/images/2025/02/03/connect.webp', dest: 'public/images/programs/connect.webp' },
  { url: 'https://sampathrani.com/images/2025/02/03/abudance.webp', dest: 'public/images/programs/abundance.webp' },
  { url: 'https://sampathrani.com/images/2025/02/03/kids.webp', dest: 'public/images/programs/kids.webp' },
  { url: 'https://sampathrani.com/images/2025/02/03/flower.webp', dest: 'public/images/programs/flower.webp' },
  { url: 'https://sampathrani.com/images/2025/10/11/gandhi.jpeg', dest: 'public/images/blog/gandhi.jpeg' },
  { url: 'https://sampathrani.com/images/2025/10/11/image1.jpeg', dest: 'public/images/blog/image1.jpeg' },
  { url: 'https://sampathrani.com/images/2025/08/31/img1_thumbnail.jpg', dest: 'public/images/blog/img1.jpg' },
  { url: 'https://sampathrani.com/images/2025/08/31/wlb2_thumbnail.jpg', dest: 'public/images/blog/wlb2.jpg' },
  { url: 'https://sampathrani.com/images/2025/03/09/whatsapp-image-2025-03-08-at-20.59.33.jpeg', dest: 'public/images/blog/womens_day.jpeg' },
  { url: 'https://sampathrani.com/images/blog/IMG-20200529-WA0016.jpg', dest: 'public/images/blog/adapting_change.jpg' },
  { url: 'https://sampathrani.com/images/blog/WhatsApp-Image-2020-06-27-at-3.30.10-PM.jpeg', dest: 'public/images/blog/transformation.jpeg' },
  { url: 'https://sampathrani.com/images/blog/WhatsApp-Image-2020-07-12-at-8.43.57-PM.jpeg', dest: 'public/images/blog/stay_aligned.jpeg' },
  { url: 'https://sampathrani.com/images/blog/WhatsApp-Image-2020-07-28-at-10.41.56-PM.jpeg', dest: 'public/images/blog/metaphysics.jpeg' }
];

async function download(url, dest) {
  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            console.log(`Downloaded: ${dest}`);
            resolve(true);
          });
        });
      } else {
        console.warn(`Failed ${response.statusCode} for ${url}`);
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        resolve(false);
      }
    }).on('error', (err) => {
      console.warn(`Error for ${url}:`, err.message);
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      resolve(false);
    });
  });
}

async function run() {
  for (const item of imagesToDownload) {
    await download(item.url, item.dest);
  }
  console.log('All downloads completed!');
}

run();
