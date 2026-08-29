import fs from 'fs';
import path from 'path';
import https from 'https';

const images = [
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

async function download(item) {
  const dir = path.dirname(item.dest);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (fs.existsSync(item.dest) && fs.statSync(item.dest).size > 0) {
    console.log(`Already exists: ${item.dest}`);
    return;
  }

  return new Promise((resolve) => {
    const file = fs.createWriteStream(item.dest);
    const req = https.get(item.url, { timeout: 8000 }, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            console.log(`Downloaded: ${item.dest}`);
            resolve(true);
          });
        });
      } else {
        console.warn(`Failed ${res.statusCode} for ${item.url}`);
        file.close();
        if (fs.existsSync(item.dest)) fs.unlinkSync(item.dest);
        resolve(false);
      }
    });

    req.on('timeout', () => {
      req.destroy();
      file.close();
      if (fs.existsSync(item.dest)) fs.unlinkSync(item.dest);
      console.warn(`Timeout for ${item.url}`);
      resolve(false);
    });

    req.on('error', (err) => {
      file.close();
      if (fs.existsSync(item.dest)) fs.unlinkSync(item.dest);
      console.warn(`Error for ${item.url}:`, err.message);
      resolve(false);
    });
  });
}

await Promise.all(images.map(download));
console.log('Finished secondary downloads!');
