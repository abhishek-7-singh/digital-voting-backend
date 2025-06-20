// import express from 'express';
// import cloudinary from '../utils/cloudinary.js';

// const router = express.Router();

// router.post('/', async (req, res) => {
//   console.log('..uploading');
//   try {
//     const files = req.body.data;
//     console.log(files.length);
//     const urls = [];
//     if (files) {
//       const fileList = Array.from(files);
//       for (const file of fileList) {
//         const uploadResponse = await cloudinary.uploader.upload(file, {
//           upload_preset: 'hamrovote',
//         });
//         urls.push({
//           secure_url: uploadResponse.secure_url,
//           public_id: uploadResponse.public_id,
//         });
//       }
//       console.log('..upload success');
//       res.json(urls);
//     } else {
//       res.status(500).json({ msg: 'Image not found' });
//     }
//   } catch (err) {
//     console.error('..uploading error', err);
//     res.status(500).json({ msg: 'Image upload failed', err });
//   }
// });

// export default router;

import express from 'express';
import cloudinary from '../utils/cloudinary.js';

const router = express.Router();

router.post('/', async (req, res) => {
  console.log('..uploading');
  try {
    const files = req.body.data;

    if (!files || !Array.isArray(files) || files.length === 0) {
      return res.status(400).json({ msg: 'No images found' });
    }

    const urls = [];

    for (const file of files) {
      const uploadResponse = await cloudinary.uploader.upload(file, {
        upload_preset: 'hamrovote', // Make sure this preset exists in your Cloudinary account!
        resource_type:'auto'
      });

      urls.push({
        secure_url: uploadResponse.secure_url,
        public_id: uploadResponse.public_id,
      });
    }

    console.log('..upload success');
    res.json(urls);
  } catch (err) {
    console.error('..uploading error', err);
    res.status(500).json({ msg: 'Image upload failed', error: err.message });
  }
});

export default router;
